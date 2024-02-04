import { gql } from "@apollo/client";

export const TOKEN = gql`
  mutation Token($token: String!) {
  token(input: { token: $token }) {
    expires_in
    access_token
    refresh_token
  }
}
`;