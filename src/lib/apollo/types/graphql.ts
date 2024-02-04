/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Application access tokens. */
export type AuthTokensObject = {
  __typename?: 'AuthTokensObject';
  /** Access token for the user's use in the application. */
  access_token: Scalars['String']['output'];
  /** Time in milliseconds when the access token will expire. */
  expires_in: Scalars['Float']['output'];
  /** Refresh token to obtain a new token to access the application. */
  refresh_token: Scalars['String']['output'];
};

export type AuthUserInforObject = {
  __typename?: 'AuthUserInforObject';
  /** Avatar in Discord. */
  avatar?: Maybe<Scalars['String']['output']>;
  /** Discriminator in Discord. */
  discriminator?: Maybe<Scalars['String']['output']>;
  /** User ID in Discord. */
  id: Scalars['String']['output'];
  /** Public flags in Discord. */
  public_flags?: Maybe<Scalars['String']['output']>;
  /** Username in Discord. */
  username?: Maybe<Scalars['String']['output']>;
};

/** Discord information about the user obtained through the access token. */
export type AuthUserObject = {
  __typename?: 'AuthUserObject';
  /** User discord information */
  auth: AuthUserInforObject;
  /** User platform information */
  user: UserObject;
};

export type BadgeObject = {
  __typename?: 'BadgeObject';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BotObject = {
  __typename?: 'BotObject';
  apiInformation: BotStatsObject;
  apiKey?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  certified: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  guildCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  inviteLink?: Maybe<Scalars['String']['output']>;
  likes: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  owners: Array<UserObject>;
  prefix?: Maybe<Scalars['String']['output']>;
  reviews: ReviewsConnection;
  shortDescription?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  supportServer?: Maybe<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  votes: Scalars['Int']['output'];
  website?: Maybe<Scalars['String']['output']>;
};


export type BotObjectReviewsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type BotObjectEdge = {
  __typename?: 'BotObjectEdge';
  cursor: Scalars['String']['output'];
  node: BotObject;
};

export type BotOrder = {
  direction: OrderDirection;
  field: BotOrderField;
};

/** Fields available to order the bots by. */
export enum BotOrderField {
  CreatedAt = 'createdAt',
  GuildCount = 'guildCount',
  Likes = 'likes',
  UpdatedAt = 'updatedAt',
  Votes = 'votes'
}

export type BotStatsApplication = {
  __typename?: 'BotStatsApplication';
  bot_public: Scalars['Boolean']['output'];
  bot_require_code_grant: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  flags: Scalars['Int']['output'];
  guild_id: Scalars['String']['output'];
  hook: Scalars['Boolean']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['String']['output'];
  install_params: BotStatsInstallParams;
  name: Scalars['String']['output'];
  privacy_policy_url: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  verify_key: Scalars['String']['output'];
};

export type BotStatsBot = {
  __typename?: 'BotStatsBot';
  approximate_guild_count?: Maybe<Scalars['Int']['output']>;
  avatar: Scalars['String']['output'];
  avatar_decoration?: Maybe<Scalars['String']['output']>;
  bot?: Maybe<Scalars['Boolean']['output']>;
  discriminator: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  public_flags: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type BotStatsInstallParams = {
  __typename?: 'BotStatsInstallParams';
  permissions: Scalars['String']['output'];
  scopes: Array<Scalars['String']['output']>;
};

export type BotStatsObject = {
  __typename?: 'BotStatsObject';
  application: BotStatsApplication;
  bot: BotStatsBot;
};

/** The status of the bot. */
export enum BotStatus {
  Approved = 'Approved',
  Denied = 'Denied',
  Pending = 'Pending'
}

export type BotsConnection = {
  __typename?: 'BotsConnection';
  edges?: Maybe<Array<BotObjectEdge>>;
  nodes?: Maybe<Array<BotObject>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CreateBotInput = {
  description: Scalars['String']['input'];
  github?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  inviteLink?: InputMaybe<Scalars['String']['input']>;
  /** List of owners that can manage the bot */
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  shortDescription: Scalars['String']['input'];
  supportServer?: InputMaybe<Scalars['String']['input']>;
  tags: Array<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Input to create a key */
export type CreateKeyInput = {
  /** Bot id */
  id: Scalars['String']['input'];
};

/** Form to get bots */
export type GetBotFormInput = {
  /** Decide how to order the bots */
  orderBy?: InputMaybe<BotOrder>;
  /** People who own the bot */
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The bot status */
  status?: InputMaybe<BotStatus>;
  /** Every tag the bot should have */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Input to get a key */
export type GetKeyInput = {
  /** Bot id */
  id: Scalars['String']['input'];
};

export type LikeObject = {
  __typename?: 'LikeObject';
  bot: BotObject;
  botId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type LikeObjectEdge = {
  __typename?: 'LikeObjectEdge';
  cursor: Scalars['String']['output'];
  node: LikeObject;
};

export type LikesConnection = {
  __typename?: 'LikesConnection';
  edges?: Maybe<Array<LikeObjectEdge>>;
  nodes?: Maybe<Array<LikeObject>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveBot: BotObject;
  createBot: BotObject;
  deleteAccount: UserObject;
  deleteBot: BotObject;
  deleteReply: ReplyObject;
  deleteReview: ReviewObject;
  deleteTag: TagObject;
  likeBot: LikeObject;
  /** Refresh the access token. */
  refreshToken: AuthTokensObject;
  rejectBot: BotObject;
  renameTag: TagObject;
  reply: ReplyObject;
  /** Generate a new API key for a bot */
  resetAPIKey: Scalars['String']['output'];
  review: ReviewObject;
  /** Log out and invalidate the access token. */
  revokeToken: Scalars['Boolean']['output'];
  /** Create a new tag. */
  tag: TagObject;
  /** Obtain access token to use the user account in the application. */
  token: AuthTokensObject;
  unlikeBot: LikeObject;
  updateBot: BotObject;
  updateBotInformation: BotObject;
  updateReply: ReplyObject;
  updateReview: ReviewObject;
  voteBot: VoteObject;
};


export type MutationApproveBotArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateBotArgs = {
  data: CreateBotInput;
};


export type MutationDeleteBotArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReplyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTagArgs = {
  name: Scalars['String']['input'];
};


export type MutationLikeBotArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRejectBotArgs = {
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRenameTagArgs = {
  name: Scalars['String']['input'];
  newName: Scalars['String']['input'];
};


export type MutationReplyArgs = {
  content: Scalars['String']['input'];
  reviewId: Scalars['Int']['input'];
};


export type MutationResetApiKeyArgs = {
  input: CreateKeyInput;
};


export type MutationReviewArgs = {
  botId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};


export type MutationTagArgs = {
  name: Scalars['String']['input'];
};


export type MutationTokenArgs = {
  input: TokenInput;
};


export type MutationUnlikeBotArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBotArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  guildCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  inviteLink?: InputMaybe<Scalars['String']['input']>;
  owners: Array<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  supportServer?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  website?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBotInformationArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateReplyArgs = {
  content: Scalars['String']['input'];
  reviewId: Scalars['Int']['input'];
};


export type MutationUpdateReviewArgs = {
  botId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
};


export type MutationVoteBotArgs = {
  id: Scalars['String']['input'];
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a bot by its ID */
  bot: BotObject;
  bots: BotsConnection;
  /** Get the API key of a bot */
  getAPIKey: Scalars['String']['output'];
  getApplicationInfo: BotStatsObject;
  /** Log out and invalidate the access token. */
  me: AuthUserObject;
  reply: ReplyObject;
  review: ReviewObject;
  reviews: ReviewsConnection;
  /** Get a tag by its name. */
  tag: TagObject;
  /** Get all tags. */
  tags: TagsConnection;
  user: UserObject;
  voteCheck: Scalars['Boolean']['output'];
};


export type QueryBotArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBotsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: GetBotFormInput;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetApiKeyArgs = {
  input: GetKeyInput;
};


export type QueryGetApplicationInfoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReplyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReviewArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReviewsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  botId: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTagArgs = {
  name: Scalars['String']['input'];
};


export type QueryTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVoteCheckArgs = {
  id: Scalars['String']['input'];
};

export type ReplyObject = {
  __typename?: 'ReplyObject';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  review: ReviewObject;
  reviewId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type ReviewObject = {
  __typename?: 'ReviewObject';
  botId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  replies: Array<ReplyObject>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserObject;
  userId: Scalars['String']['output'];
};

export type ReviewObjectEdge = {
  __typename?: 'ReviewObjectEdge';
  cursor: Scalars['String']['output'];
  node: ReviewObject;
};

export type ReviewsConnection = {
  __typename?: 'ReviewsConnection';
  edges?: Maybe<Array<ReviewObjectEdge>>;
  nodes?: Maybe<Array<ReviewObject>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TagObject = {
  __typename?: 'TagObject';
  bots: BotsConnection;
  name: Scalars['ID']['output'];
};


export type TagObjectBotsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type TagObjectEdge = {
  __typename?: 'TagObjectEdge';
  cursor: Scalars['String']['output'];
  node: TagObject;
};

export type TagsConnection = {
  __typename?: 'TagsConnection';
  edges?: Maybe<Array<TagObjectEdge>>;
  nodes?: Maybe<Array<TagObject>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Token input for authentication */
export type TokenInput = {
  /** Discord OAuth token */
  token: Scalars['String']['input'];
};

export type UserObject = {
  __typename?: 'UserObject';
  avatar?: Maybe<Scalars['String']['output']>;
  badges: Array<BadgeObject>;
  banner?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  bots: BotsConnection;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  likes: LikesConnection;
  permissions?: Maybe<Scalars['Int']['output']>;
  reviews: Array<ReviewObject>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};


export type UserObjectBotsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BotOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<BotStatus>>;
};


export type UserObjectLikesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type VoteObject = {
  __typename?: 'VoteObject';
  bot: BotObject;
  botId: Scalars['String']['output'];
  expires: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', me: { __typename?: 'AuthUserObject', user: { __typename?: 'UserObject', username: string, avatar?: string | null, id: string } } };


export const GetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetSessionQuery, GetSessionQueryVariables>;