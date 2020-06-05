const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Post {
        _id: ID!
        author_id: String!
        title: String!
        content: String!
        like_count: Int
        comments: [Comment]
        createDate: String
        updateDate: String
        tags: [String]
        categories: [String]
        postImage: String
        slug: String
    },

    type Comment {
        _id: ID!
        author: ID!
        content: String!
        createDate: String
    }

    type Tag {
        _id: ID!
        name: String!
        createDate: String
    }

    type Category {
        _id: ID!
        name: String!
        slug: String
        description: String
        createDate: String
    }

    type User {
        _id: ID
        firstName: String! 
        lastName: String!
        password: String!
        aboutme: String
        profileImage: String
        email: String!
        userName: String!
        joinDate: String
        role: String
    }

    type Token {
        token: String!
    }

    type Login {
        user: User
        token: String!
    }

    type Query {
        categories: [Category]
        
        category(_id: ID!): Category
        
        posts: [Post]
        
        publishPosts: [Post]

        getAuthorPosts(author_id: ID!): [Post]

        post(_id: ID!): Post

        getCurrentUser: User

        getUserProfile: User

        getAllUsers: [User]

        profilePage(userName: String!): User

        getUser(author_id: String!): User
    },

    type Mutation {

        addCategory(name: String!, slug: String, description: String): Category,
        
        updateCategory(_id: ID!, name: String!, slug: String, description: String): Category,

        deleteCategory(_id: ID!): Category,
        
        addComment(author: ID!, content: String!, post_id: ID!): Post,

        addPost(author_id: String!, title: String!, content: String!, publish: Boolean!, tags: [String], categories: [String], postImage: String, slug: String!): Post,

        updatePost(_id: ID!, title: String!, content: String!, publish: Boolean!, tags: [String], categories: [String], postImage: String, slug: String!): Post,
        
        postLike(_id: ID!, like_count: Int!): Post,

        deletePost(_id: ID!): Post,
        
        signupUser(firstName: String!, lastName: String!, email: String!, userName: String!, password: String!, role: String): Login

        signinUser(userName: String!, password: String!): Login

        editProfile(_id: String!, profileImage: String, userName: String, firstName: String, lastName: String, email: String, aboutme: String): User

        setProfileIMG(email: String!, profileImage: String!): User
        
        changeEmail(currentEmail: String!, newEmail: String!): User

        changePassword(email: String!, password: String!): User

        passwordReset(email: String!): User
    }

`;

module.exports = typeDefs;