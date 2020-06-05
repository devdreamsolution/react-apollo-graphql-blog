import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export const GET_POST = gql`
    query($_id: ID!) {
        post(_id: $_id) {
            _id
            title
            content
        }
    }
`;

// const withPost = Component => props => {
//     return (
//         <Query query={GET_POST} variables={{ _id }}>
//             {({ loading, data }) => {
//                 return (
//                     <Component postLoading={loading} post={data && data.post} {...props} />
//                 );
//             }}
//         </Query>
//     )
// }

// export default withPost;