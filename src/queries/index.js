import { gql } from 'apollo-boost';

////////////////////////////////////////////// CATEGORY QUERIES/////////////////////////////////////////////////

export const ADD_CATEGORY = gql`
    mutation($name: String!, $slug: String!, $description: String!) {
        addCategory(name: $name, slug: $slug, description: $description) {
            name
        }
    }
`;

export const GET_CATEGORIES = gql`
    query {
        categories {
            _id
            name
            slug
            description
        }
    }
`;

export const GET_CATEGORY = gql`
    query($_id: ID!) {
        category(_id: $_id) {
            _id
            name
            slug
            description
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation($_id: ID!, $name: String!, $slug: String, $description: String){
        updateCategory(_id: $_id, name: $name, slug: $slug, description: $description) {
            _id
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation($_id: ID!){
        deleteCategory(_id: $_id) {
            _id
        }
    }
`;

////////////////////////////////////////////// COMMENT QUERIES/////////////////////////////////////////////////

export const ADD_COMMENT = gql`
    mutation($author: ID!, $content: String!, $post_id: ID!) {
        addComment(author: $author, content: $content, post_id: $post_id) {
            author_id
            content
        }
    }
`;

////////////////////////////////////////////// POST QUERIES/////////////////////////////////////////////////

export const GET_POSTS = gql`
    query {
        posts {
            _id
            title
            content
        }
    }
`;

export const GET_PUBLISH_POSTS = gql`
    query {
        publishPosts {
            _id
            title
            content
            author_id
            updateDate
            postImage
        }
    }
`;

export const GET_AUTHOR_POSTS = gql`
    query($author_id: ID!) {
        getAuthorPosts(author_id: $author_id) {
            _id
            title
            content
        }
    }
`;

export const GET_POST = gql`
    query($_id: ID!) {
        post(_id: $_id) {
            _id
            author_id
            title
            content
            like_count
            comments {
                _id
                author
                content
                createDate
            }
            tags
            categories
            postImage
            slug
        }
    }
`;

export const ADD_POST = gql`
    mutation($author_id: String!, $title: String!, $content: String!, $publish: Boolean!, $tags: [String], $categories: [String], $postImage: String, $slug: String!) {
        addPost(author_id: $author_id, title: $title, content: $content, publish: $publish, tags: $tags, categories: $categories, postImage: $postImage, slug: $slug) {
            title
            content
        }
    }
`;

export const POST_LIKE = gql`
    mutation($_id: ID!, $like_count: Int!){
        postLike(_id: $_id, like_count: $like_count) {
            _id
            title
            content
        }
    }
`;

export const UPDATE_POST = gql`
    mutation($_id: ID!, $title: String!, $content: String!, $publish: Boolean!, $tags: [String], $categories: [String], $postImage: String, $slug: String!){
        updatePost(_id: $_id, title: $title, content: $content, publish: $publish, tags: $tags, categories: $categories, postImage: $postImage, slug: $slug) {
            _id
            title
            content
        }
    }
`;

export const DELETE_POST = gql`
    mutation($_id: ID!){
        deletePost(_id: $_id) {
            _id
        }
    }
`;

////////////////////////////////////////////// USER QUERIES/////////////////////////////////////////////////

export const SIGNUP_USER = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $userName: String!, $password: String!, $role: String){
        signupUser(firstName: $firstName, lastName: $lastName, email: $email, userName: $userName, password: $password, role: $role){ 
            user { _id }
            token 
        }
    }
`;


export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            firstName
            lastName
            joinDate
            userName
            email
            profileImage
        }
    }
`;

export const GET_USER = gql`
    query($author_id: String!) {
        getUser(author_id: $author_id){
            firstName
            lastName
            joinDate
            userName
            email
            profileImage
            role
            aboutme
        }
    }
`;

// export const EDIT_PROFILE = gql`
//     mutation($email: String!, $bio: String!){
//         editProfile(email: $email, bio: $bio){
//             bio
//         }
//     }
// `;

export const EDIT_PROFILE = gql`
    mutation($_id: String!, $profileImage: String, $userName: String, $firstName: String, $lastName: String, $email: String, $aboutme: String){
        editProfile(_id: $_id, profileImage: $profileImage, userName: $userName, firstName: $firstName, lastName: $lastName, email: $email, aboutme: $aboutme){
            profileImage
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($userName: String!, $password: String!){
        signinUser(userName: $userName, password: $password){ 
            user {
                _id
            }
            token 
        }
    }
`;


export const CHANGE_EMAIL = gql`
    mutation($currentEmail: String!, $newEmail: String!){
        changeEmail(currentEmail: $currentEmail, newEmail: $newEmail){
            email
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation($email: String!, $password: String!){
        changePassword(email: $email, password: $password){
            email
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation($email: String!){
        passwordReset(email: $email){
            email
        }
    }
`;

export const GET_USER_PROFILE = gql`
    query {
        getUserProfile {
            bio
            profileImage
        }
    }
`;

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            firstName
            lastName
            bio
            profileImage
            userName
            email
            _id
            role
        }
    }
`;

export const PROFILE_PAGE = gql`
    query($userName: String!) {
        profilePage(userName: $userName) {
            firstName
            lastName
            bio
            profileImage
        }
    }
`;