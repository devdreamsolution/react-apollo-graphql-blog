const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const axios = require('axios');
const Post = require('./models/post');
const User = require('./models/user');
const Comment = require('./models/comment');
const Category = require('./models/category');

const jwtPrivateKey = "Xn4X8vchcTHKcjFR";

const createToken = (user, secret, expiresIn) => {

    const { firstName, email } = user;

    return jwt.sign({
        firstName, email
    }, secret, { expiresIn })

}

const resolvers = {
    Query: {
        categories: () => Category.find({}),
        
        category: (parent, _id) => Category.findById(_id),

        posts: () => Post.find({}),
        
        publishPosts: () => Post.find({ publish: true }).sort({ updateDate: "desc" }),
        
        post: (parent, _id) => Post.findById(_id),

        getUserProfile: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null
            }
            const user = await User.findOne({ email: currentUser.email })
            return user;
        },
    
        getAllUsers: async (parent) => {
            const users = await User.find().sort({
                joinDate: "desc"
            });
        
            return users;
        },

        getUser: async (parent, params) => {
            const findUser = await User.findById(params.author_id);
            if (!findUser) return null;
            return findUser;
        },

        getAuthorPosts: async (parent, params) => {
            const findPosts = await Post.find({ author_id: params.author_id });
            return findPosts;
        },
    
        profilePage: async (root, { userName }, { User }) => {
            const profile = await User.findOne({ userName });
            return profile;
        }
    },
    Mutation: {
          addComment: async  (parent, params) => {
            const newComment = await new Comment({ author: params.author, content: params.content });
            var post = await Post.findOne({ _id: params.post_id });
              if (!post) {
                throw new Error('Post Not Found');
              }
              if (post.comments == undefined) {
                post.comments = newComment;
              } else {
                post.comments.push(newComment);
              }
            return Post.findByIdAndUpdate(params.post_id, { $set: { comments: post.comments } }, { new: true })
            .catch(err => new Error(err));

        },
        addCategory: (parent, category) => {
            const newCategory = new Category({ name:category.name, slug: category.slug, description: category.description });
            return newCategory.save();
        },
        updateCategory: (parent, params) => {
            return Category.findByIdAndUpdate(params._id, { $set: { name: params.name, slug: params.slug, description: params.description } }, { new: true })
            .catch(err => new Error(err));
        },
        deleteCategory: (parent, params) => {
            return Category.findByIdAndDelete( params._id )
            .catch(err => new Error(err));
        },
        addPost: (parent, post) => {
          const newPost = new Post({ author_id: post.author_id, title: post.title, content: post.content, like_count: 0, publish: post.publish, tags: post.tags, categories: post.categories, postImage: post.postImage, slug: post.slug});
            return newPost.save();
        },
        updatePost: (parent, params) => {
          return Post.findByIdAndUpdate(params._id, { $set: { title: params.title, content: params.content, updateDate: Date().toLocaleString(), publish: params.publish, tags: params.tags, categories: params.categories, postImage: params.postImage, slug: params.slug } }, { new: true })
            .catch(err => new Error(err));
        },
        postLike: (parent, params) => {
            return Post.findByIdAndUpdate(params._id, { $set: { like_count: params.like_count } }, { new: true })
            .catch(err => new Error(err));
        },
        deletePost: (parent, params) => {
            return Post.findByIdAndDelete( params._id )
            .catch(err => new Error(err));
        },

        // signupUser: (parent, user) => {
        //   const newUser = new User({ firstName: user.firstName, lastName: user.lastName, email: user.email, userName: user.userName, password: user.password });
        //   return { token: createToken(newUser.save(), jwtPrivateKey, "1hr") };
        // },
        signupUser: async (parent, user) => {

            const findUser = await User.findOne({ email: user.email, userName: user.userName });
      
            if (findUser) {
              throw new Error('User already exits');
            }
      
            const newUser = await new User({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              userName: user.userName,
              password: user.password,
              role: user.role
            }).save();
      
            return { user: newUser, token: createToken(newUser, jwtPrivateKey, "1hr") };
          },
      
        signinUser: async (parent, user) => {
            const findUser = await User.findOne({ userName: user.userName });
      
            if (!findUser) {
              throw new Error('User Not Found');
            }
            const isValidPassword = await bcrypt.compare(user.password, findUser.password);
      
            if (!isValidPassword) {
              throw new Error('inValid password');
            }
            return { user: findUser, token: createToken(findUser, jwtPrivateKey, "1hr") };
      
          },
      
          editProfile: async (parent, params) => {
            return await User.findByIdAndUpdate(params._id, { $set: { userName: params.userName, firstName: params.firstName, lastName: params.lastName, email: params.email, profileImage: params.profileImage, aboutme: params.aboutme } }, { new: true })
              .catch(err => new Error(err));
      
          },
      
          setProfileIMG: async (root, { email, profileImage }, { User }) => {
            const user = await User.findOneAndUpdate({ email }, { $set: { profileImage } }, { new: true });
      
            if (!user) {
              throw new Error('User Not Found');
            }
      
            return user;
      
          },
      
          changeEmail: async (root, { currentEmail, newEmail }, { User }) => {
      
            const user = await User.findOneAndUpdate({ email: currentEmail }, { $set: { email: newEmail } }, { new: true });
      
            if (!user) {
              throw new Error('User Not Found');
            }
      
            return user;
      
          },
      
          changePassword: (root, { email, password }, { User }) => {
      
            const saltRounds = 10;
      
            return bcrypt.hash(password, saltRounds).then(async function (hash) {
      
              const user = await User.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });
      
              if (!user) {
                throw new Error('User Not Found');
              }
      
              return user;
      
            });
      
          },
      
          passwordReset: async (root, { email }, { User }) => {
      
            const saltRounds = 10;
            const generatedPassword = generator.generate({ length: 10, numbers: true });
      
            return bcrypt.hash(generatedPassword, saltRounds).then(async function (hash) {
      
              const user = await User.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });
      
              if (!user) {
                throw new Error('User Not Found');
              } else {
      
                const data = {
                  email,
                  generatedPassword
                }
      
                /* eslint-disable */
                axios.post(`${config.siteURL}/password-reset`, data)
                  .then(function (response) {
                    // console.log('Email sent!');
                  })
                  .catch(function (error) {
                    // console.log(error);
                  });
                /* eslint-enable */
      
              }
      
              return user;
      
            });
      
      
      
          }
      
    }
};

module.exports = resolvers;

// setProfileIMG: async (root, { email, profileImage }, { User }) => {
//     const user = await User.findOneAndUpdate({ email }, { $set: { profileImage } }, { new: true });
