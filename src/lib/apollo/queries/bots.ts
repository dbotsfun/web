import { gql } from "@apollo/client";

export const GET_BOTS = gql`
  query getBots {
    bots {
      nodes {
        id
        name
        avatar
        certified
        shortDescription
        tags
        votes
      }
    }
}
`;

export const GET_PANEL_BOTS = gql`
  query getPanelBots($status: BotStatus!) {
    bots(filters: { status: $status }) {
      nodes {
        id
        name
        avatar
        certified
        shortDescription
        tags
        votes
      }
    }
}
`;

export const GET_FRONT_BOTS = gql`
  query getFrontBots {
    voted: bots(first: 4, filters: { orderBy: { direction: desc, field: votes } }) {
      nodes {
        id
        name
        avatar
        certified
        shortDescription
        tags
        votes
      }
    }
    rated: bots(first: 4, filters: { orderBy: { direction: desc, field: reviews } }) {
      nodes {
        id
        name
        avatar
        certified
        shortDescription
        tags
        votes
      }
    }
    recent: bots(first: 4, filters: { orderBy: { direction: desc, field: createdAt } }) {
      nodes {
        id
        name
        avatar
        certified
        shortDescription
        tags
        votes
      }
    }
}
`;

export const VOTE_CHECK = gql`
query voteCheck($id: String!) {
    voteCheck(id: $id)
}
`

export const GET_BOT = gql`
    query getBot($id: String!) {
        bot(id: $id) {
            id
            avatar
            certified
            name
            status
            description
            shortDescription
            prefix
            inviteLink
            supportServer
            website
            github
            guildCount
            tags
            votes
            owners {
              id
              username
            }
        }
}
`