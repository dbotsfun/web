import { gql } from "@apollo/client";

export const VOTE_BOT = gql`
    mutation voteBot($id: String!) {
        voteBot(id: $id) {
            id
            expires
    }
}
`;

export const CREATE_BOT = gql`
  mutation createBot(
    $id: ID!
    $description: String!
    $shortDescription: String!
    $tags: [String!]!
    $prefix: String
    $inviteLink: String
    $github: String
    $supportServer: String
    $website: String
  ) {
    createBot(
      input: {
        id: $id
        description: $description
        shortDescription: $shortDescription
        tags: $tags
        prefix: $prefix
        inviteLink: $inviteLink
        github: $github
        supportServer: $supportServer
        website: $website
      }
    ) {
      name
      id
      status
    }
  }
`;

export const DELETE_BOT = gql`
  mutation deleteBot($id: String!) {
    deleteBot(id: $id) {
      name
    }
  }
`;

export const REJECT_BOT = gql`
  mutation rejectBot($id: String!, $reason: String!) {
    rejectBot(id: $id, reason: $reason) {
      name
    }
  }
`;

export const APPROVE_BOT = gql`
  mutation approveBot($id: String!) {
    approveBot(id: $id) {
      name
    }
  }
`;