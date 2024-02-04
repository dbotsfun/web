import { gql } from "@apollo/client";

export const GET_SESSION = gql`
  query getSession {
    me {
        user {
         username
         avatar
         id
        }
    }
}
`;
