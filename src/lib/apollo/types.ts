import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
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

/** Discord information about the user obtained through the access token. */
export type AuthUserInfoObject = {
  __typename?: 'AuthUserInfoObject';
  /** Avatar in Discord. */
  avatar?: Maybe<Scalars['String']['output']>;
  /**
   * Discriminator in Discord.
   * @deprecated This field is going to be removed in the future.
   */
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
  auth: AuthUserInfoObject;
  /** User platform information */
  user: UserObject;
};

/** User badge information */
export type BadgeObject = {
  __typename?: 'BadgeObject';
  /** Date when the badge was created */
  createdAt: Scalars['DateTime']['output'];
  /** Badge name */
  description: Scalars['String']['output'];
  /** Badge identifier */
  id: Scalars['ID']['output'];
  /** Date when the badge was last updated */
  updatedAt: Scalars['DateTime']['output'];
};

/** The source where the bot was imported from. */
export enum BotListSource {
  DiscordList = 'DISCORD_LIST'
}

/** A discord bot. */
export type BotObject = {
  __typename?: 'BotObject';
  /** Get the API information of the bot */
  apiInformation: BotStatsObject;
  avatar?: Maybe<Scalars['String']['output']>;
  certified: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  guildCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  importedFrom: BotListSource;
  inviteLink?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** Get the owners of the bot */
  owners: Array<UserObject>;
  prefix?: Maybe<Scalars['String']['output']>;
  /** Get the reviews of the bot */
  reviews: ReviewsConnection;
  shortDescription?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  supportServer?: Maybe<Scalars['String']['output']>;
  /** Get the tags of the bot */
  tags: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  /** Get the amount of votes the bot has */
  votes: Scalars['Int']['output'];
  website?: Maybe<Scalars['String']['output']>;
};


/** A discord bot. */
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
  Reviews = 'reviews',
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
  /** @deprecated This field is going to be removed in the future. */
  discriminator?: Maybe<Scalars['String']['output']>;
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

/** The input to create a bot. */
export type CreateBotInput = {
  /** A description of the bot */
  description: Scalars['String']['input'];
  /** The GitHub repository URL */
  github?: InputMaybe<Scalars['String']['input']>;
  /** ID must be a valid snowflake. */
  id: Scalars['ID']['input'];
  /** The invite link to the bot. */
  inviteLink?: InputMaybe<Scalars['String']['input']>;
  /** List of owners that can manage the bot */
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The bot prefix */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** A short description of the bot */
  shortDescription: Scalars['String']['input'];
  /** The invite link to the support server */
  supportServer?: InputMaybe<Scalars['String']['input']>;
  /** The bot's tags */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The website URL */
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Input to create a key */
export type CreateKeyInput = {
  /** Bot id */
  id: Scalars['String']['input'];
};

/** The input to create a reply */
export type CreateReplyInput = {
  /** The content of the reply */
  content: Scalars['String']['input'];
  /** The ID of the review to reply to */
  reviewId: Scalars['Int']['input'];
};

export type CreateReviewInput = {
  botId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
};

/** The input to get bots from the database */
export type GetBotFormInput = {
  /** Decide how to order the bots */
  orderBy?: InputMaybe<BotOrder>;
  /** People who own the bot */
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The query to search for */
  query?: InputMaybe<Scalars['String']['input']>;
  /** The bot status */
  status?: InputMaybe<BotStatus>;
  /** Tags to filter the bots by */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Input for importing a bot from a bot list. */
export type ImpotBotInput = {
  /** ID must be a valid snowflake. */
  id: Scalars['ID']['input'];
  /** The source where the bot was imported from. */
  source: BotListSource;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Approve a bot */
  approveBot: BotObject;
  /** Create a bot */
  createBot: BotObject;
  /** Reply to a review */
  createReply: ReplyObject;
  createReview: ReviewObject;
  /** Create a new tag. */
  createTag: TagObject;
  /** Edit a reply */
  editReply: ReplyObject;
  editReview: ReviewObject;
  /** Edit your user. */
  editUser: UserObject;
  /** Import a bot */
  importBot: BotObject;
  /** Refresh the access token. */
  refreshToken: AuthTokensObject;
  /** Approve a bot */
  rejectBot: BotObject;
  /** Delete your account. */
  removeAccount: UserObject;
  /** Delete a bot */
  removeBot: BotObject;
  /** Remove a reply */
  removeReply: ReplyObject;
  removeReview: ReviewObject;
  /** Remove a tag. */
  removeTag: TagObject;
  /** Rename a tag. */
  renameTag: TagObject;
  /** Generate a new API key for a bot */
  resetAPIKey: Scalars['String']['output'];
  /** Log out and invalidate the access token. */
  revokeToken: Scalars['Boolean']['output'];
  /** Obtain access token to use the user account in the application. */
  token: AuthTokensObject;
  /** Update a bot */
  updateBot: BotObject;
  /** Update the bot information */
  updateBotInformation: BotObject;
  /** Vote for a bot. */
  voteBot: VoteObject;
};


export type MutationApproveBotArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateBotArgs = {
  input: CreateBotInput;
};


export type MutationCreateReplyArgs = {
  input: CreateReplyInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateTagArgs = {
  name: Scalars['String']['input'];
};


export type MutationEditReplyArgs = {
  input: CreateReplyInput;
};


export type MutationEditReviewArgs = {
  input: UpdateReviewInput;
};


export type MutationEditUserArgs = {
  input: UpdateUserInput;
};


export type MutationImportBotArgs = {
  input: ImpotBotInput;
};


export type MutationRejectBotArgs = {
  input: RejectBotInput;
};


export type MutationRemoveBotArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveReplyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveReviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTagArgs = {
  name: Scalars['String']['input'];
};


export type MutationRenameTagArgs = {
  input: RenameTagInput;
};


export type MutationResetApiKeyArgs = {
  input: CreateKeyInput;
};


export type MutationTokenArgs = {
  input: TokenInput;
};


export type MutationUpdateBotArgs = {
  input: UpdateBotInput;
};


export type MutationUpdateBotInformationArgs = {
  input: UpdateBotInformationInput;
};


export type MutationVoteBotArgs = {
  id: Scalars['ID']['input'];
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
  /** Get all bots in the database */
  bots: BotsConnection;
  /** Get the API information of a bot */
  getApplicationInfo: BotStatsObject;
  /** Get a bot by its ID */
  getBot: BotObject;
  /** Get a reply by its ID */
  getReply: ReplyObject;
  getReview: ReviewObject;
  /** Get a tag by its name. */
  getTag: TagObject;
  /** Log out and invalidate the access token. */
  me: AuthUserObject;
  reviews: ReviewsConnection;
  /** Get all tags. */
  tags: TagsConnection;
  user: UserObject;
  /** Check if the user has voted for a bot. */
  voteCheck: VoteCheckObject;
};


export type QueryBotsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<GetBotFormInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetApplicationInfoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetBotArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetReplyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetReviewArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetTagArgs = {
  name: Scalars['String']['input'];
};


export type QueryReviewsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  input: SnowFlakeInput;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
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
  id: Scalars['ID']['input'];
};

export type RejectBotInput = {
  /** ID must be a valid snowflake. */
  id: Scalars['ID']['input'];
  /** The reason for rejecting the bot */
  reason: Scalars['String']['input'];
};

/** The input to rename a tag. */
export type RenameTagInput = {
  /** The name of the tag to rename. */
  name: Scalars['String']['input'];
  /** The new name for the tag. */
  newName: Scalars['String']['input'];
};

/** A reply to a review. */
export type ReplyObject = {
  __typename?: 'ReplyObject';
  /** The content of the reply. */
  content: Scalars['String']['output'];
  /** The date and time that the reply was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The unique identifier of the reply */
  id: Scalars['Int']['output'];
  /** The review this reply is for */
  review: ReviewObject;
  /** The unique identifier of the review that the reply is associated with. */
  reviewId: Scalars['Int']['output'];
  /** The date and time that the reply was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  /** The user ID of the user who created the reply. */
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

export type SnowFlakeInput = {
  /** ID must be a valid snowflake. */
  id: Scalars['ID']['input'];
};

export type StatusChangedSubscriptionInput = {
  /** The status of the bot to filter by */
  status?: InputMaybe<BotStatus>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscribe to bot status changes */
  botStatusChanged: BotObject;
};


export type SubscriptionBotStatusChangedArgs = {
  filter?: InputMaybe<StatusChangedSubscriptionInput>;
};

export type TagObject = {
  __typename?: 'TagObject';
  bots: BotsConnection;
  /** The unique identifier of the tag */
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

export type UpdateBotInformationInput = {
  /** The bot's avatar */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** ID must be a valid snowflake. */
  id: Scalars['ID']['input'];
  /** The bot's name */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBotInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  /** The GitHub repository URL */
  github?: InputMaybe<Scalars['String']['input']>;
  /** The amount of guilds the bot is in */
  guildCount?: InputMaybe<Scalars['Int']['input']>;
  /** ID must be a valid snowflake. */
  id: Scalars['ID']['input'];
  /** The invite link to the bot. */
  inviteLink?: InputMaybe<Scalars['String']['input']>;
  /** List of owners that can manage the bot */
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The bot prefix */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** A short description of the bot */
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  /** The invite link to the support server */
  supportServer?: InputMaybe<Scalars['String']['input']>;
  /** The bot's tags */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The website URL */
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReviewInput = {
  botId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
};

/** The input to update a user. */
export type UpdateUserInput = {
  /** The banner of the user. */
  banner?: InputMaybe<Scalars['String']['input']>;
  /** User's biography. */
  bio?: InputMaybe<Scalars['String']['input']>;
};

/** The input to get a bot. */
export type UserGetBotInput = {
  /** Decide how to order the bots */
  orderBy?: InputMaybe<BotOrder>;
  /** The bot status */
  status?: InputMaybe<BotStatus>;
};

/** The user object */
export type UserObject = {
  __typename?: 'UserObject';
  /** The avatar of the user. Null if the user has not set an avatar. */
  avatar?: Maybe<Scalars['String']['output']>;
  badges: Array<BadgeObject>;
  /** The banner of the user. Null if the user has not set a banner. */
  banner?: Maybe<Scalars['String']['output']>;
  /** The bio of the user. Null if the user has not set a bio. */
  bio?: Maybe<Scalars['String']['output']>;
  bots: BotsConnection;
  /** The date the user was created at */
  createdAt: Scalars['DateTime']['output'];
  /** The unique identifier of the user */
  id: Scalars['ID']['output'];
  /** The permissions of the user */
  permissions?: Maybe<Scalars['Int']['output']>;
  reviews: Array<ReviewObject>;
  /** The date the user was last updated at */
  updatedAt: Scalars['DateTime']['output'];
  /** The username of the user */
  username: Scalars['String']['output'];
};


/** The user object */
export type UserObjectBotsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<UserGetBotInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type VoteCheckObject = {
  __typename?: 'VoteCheckObject';
  /** The bot that was voted for. */
  bot: BotObject;
  /** The ID of the bot that was voted for */
  botId: Scalars['String']['output'];
  /** The time the vote expires */
  expires: Scalars['BigInt']['output'];
  /** The ID of the vote */
  id: Scalars['Int']['output'];
  /** The ID of the user who voted for the bot */
  userId: Scalars['String']['output'];
  /** Whether the user has voted for the bot */
  voted: Scalars['Boolean']['output'];
};

export type VoteObject = {
  __typename?: 'VoteObject';
  /** The bot that was voted for. */
  bot: BotObject;
  /** The ID of the bot that was voted for */
  botId: Scalars['String']['output'];
  /** The time the vote expires */
  expires: Scalars['BigInt']['output'];
  /** The ID of the vote */
  id: Scalars['Int']['output'];
  /** The ID of the user who voted for the bot */
  userId: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthTokensObject: ResolverTypeWrapper<AuthTokensObject>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  AuthUserInfoObject: ResolverTypeWrapper<AuthUserInfoObject>;
  AuthUserObject: ResolverTypeWrapper<AuthUserObject>;
  BadgeObject: ResolverTypeWrapper<BadgeObject>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BotListSource: BotListSource;
  BotObject: ResolverTypeWrapper<BotObject>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  BotObjectEdge: ResolverTypeWrapper<BotObjectEdge>;
  BotOrder: BotOrder;
  BotOrderField: BotOrderField;
  BotStatsApplication: ResolverTypeWrapper<BotStatsApplication>;
  BotStatsBot: ResolverTypeWrapper<BotStatsBot>;
  BotStatsInstallParams: ResolverTypeWrapper<BotStatsInstallParams>;
  BotStatsObject: ResolverTypeWrapper<BotStatsObject>;
  BotStatus: BotStatus;
  BotsConnection: ResolverTypeWrapper<BotsConnection>;
  CreateBotInput: CreateBotInput;
  CreateKeyInput: CreateKeyInput;
  CreateReplyInput: CreateReplyInput;
  CreateReviewInput: CreateReviewInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  GetBotFormInput: GetBotFormInput;
  ImpotBotInput: ImpotBotInput;
  Mutation: ResolverTypeWrapper<{}>;
  OrderDirection: OrderDirection;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  RejectBotInput: RejectBotInput;
  RenameTagInput: RenameTagInput;
  ReplyObject: ResolverTypeWrapper<ReplyObject>;
  ReviewObject: ResolverTypeWrapper<ReviewObject>;
  ReviewObjectEdge: ResolverTypeWrapper<ReviewObjectEdge>;
  ReviewsConnection: ResolverTypeWrapper<ReviewsConnection>;
  SnowFlakeInput: SnowFlakeInput;
  StatusChangedSubscriptionInput: StatusChangedSubscriptionInput;
  Subscription: ResolverTypeWrapper<{}>;
  TagObject: ResolverTypeWrapper<TagObject>;
  TagObjectEdge: ResolverTypeWrapper<TagObjectEdge>;
  TagsConnection: ResolverTypeWrapper<TagsConnection>;
  TokenInput: TokenInput;
  UpdateBotInformationInput: UpdateBotInformationInput;
  UpdateBotInput: UpdateBotInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateUserInput: UpdateUserInput;
  UserGetBotInput: UserGetBotInput;
  UserObject: ResolverTypeWrapper<UserObject>;
  VoteCheckObject: ResolverTypeWrapper<VoteCheckObject>;
  VoteObject: ResolverTypeWrapper<VoteObject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthTokensObject: AuthTokensObject;
  String: Scalars['String']['output'];
  Float: Scalars['Float']['output'];
  AuthUserInfoObject: AuthUserInfoObject;
  AuthUserObject: AuthUserObject;
  BadgeObject: BadgeObject;
  ID: Scalars['ID']['output'];
  BigInt: Scalars['BigInt']['output'];
  BotObject: BotObject;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  BotObjectEdge: BotObjectEdge;
  BotOrder: BotOrder;
  BotStatsApplication: BotStatsApplication;
  BotStatsBot: BotStatsBot;
  BotStatsInstallParams: BotStatsInstallParams;
  BotStatsObject: BotStatsObject;
  BotsConnection: BotsConnection;
  CreateBotInput: CreateBotInput;
  CreateKeyInput: CreateKeyInput;
  CreateReplyInput: CreateReplyInput;
  CreateReviewInput: CreateReviewInput;
  DateTime: Scalars['DateTime']['output'];
  GetBotFormInput: GetBotFormInput;
  ImpotBotInput: ImpotBotInput;
  Mutation: {};
  PageInfo: PageInfo;
  Query: {};
  RejectBotInput: RejectBotInput;
  RenameTagInput: RenameTagInput;
  ReplyObject: ReplyObject;
  ReviewObject: ReviewObject;
  ReviewObjectEdge: ReviewObjectEdge;
  ReviewsConnection: ReviewsConnection;
  SnowFlakeInput: SnowFlakeInput;
  StatusChangedSubscriptionInput: StatusChangedSubscriptionInput;
  Subscription: {};
  TagObject: TagObject;
  TagObjectEdge: TagObjectEdge;
  TagsConnection: TagsConnection;
  TokenInput: TokenInput;
  UpdateBotInformationInput: UpdateBotInformationInput;
  UpdateBotInput: UpdateBotInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateUserInput: UpdateUserInput;
  UserGetBotInput: UserGetBotInput;
  UserObject: UserObject;
  VoteCheckObject: VoteCheckObject;
  VoteObject: VoteObject;
};

export type AuthTokensObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthTokensObject'] = ResolversParentTypes['AuthTokensObject']> = {
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires_in?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  refresh_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthUserInfoObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthUserInfoObject'] = ResolversParentTypes['AuthUserInfoObject']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discriminator?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public_flags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthUserObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthUserObject'] = ResolversParentTypes['AuthUserObject']> = {
  auth?: Resolver<ResolversTypes['AuthUserInfoObject'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BadgeObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['BadgeObject'] = ResolversParentTypes['BadgeObject']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BotObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['BotObject'] = ResolversParentTypes['BotObject']> = {
  apiInformation?: Resolver<ResolversTypes['BotStatsObject'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  certified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guildCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  importedFrom?: Resolver<ResolversTypes['BotListSource'], ParentType, ContextType>;
  inviteLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['UserObject']>, ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reviews?: Resolver<ResolversTypes['ReviewsConnection'], ParentType, ContextType, Partial<BotObjectReviewsArgs>>;
  shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  supportServer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BotObjectEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BotObjectEdge'] = ResolversParentTypes['BotObjectEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BotStatsApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BotStatsApplication'] = ResolversParentTypes['BotStatsApplication']> = {
  bot_public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bot_require_code_grant?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flags?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  guild_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hook?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  install_params?: Resolver<ResolversTypes['BotStatsInstallParams'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privacy_policy_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verify_key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BotStatsBotResolvers<ContextType = any, ParentType extends ResolversParentTypes['BotStatsBot'] = ResolversParentTypes['BotStatsBot']> = {
  approximate_guild_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar_decoration?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  discriminator?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  public_flags?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BotStatsInstallParamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BotStatsInstallParams'] = ResolversParentTypes['BotStatsInstallParams']> = {
  permissions?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scopes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BotStatsObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['BotStatsObject'] = ResolversParentTypes['BotStatsObject']> = {
  application?: Resolver<ResolversTypes['BotStatsApplication'], ParentType, ContextType>;
  bot?: Resolver<ResolversTypes['BotStatsBot'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BotsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BotsConnection'] = ResolversParentTypes['BotsConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['BotObjectEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['BotObject']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  approveBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationApproveBotArgs, 'id'>>;
  createBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationCreateBotArgs, 'input'>>;
  createReply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<MutationCreateReplyArgs, 'input'>>;
  createReview?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'input'>>;
  createTag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'name'>>;
  editReply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<MutationEditReplyArgs, 'input'>>;
  editReview?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<MutationEditReviewArgs, 'input'>>;
  editUser?: Resolver<ResolversTypes['UserObject'], ParentType, ContextType, RequireFields<MutationEditUserArgs, 'input'>>;
  importBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationImportBotArgs, 'input'>>;
  refreshToken?: Resolver<ResolversTypes['AuthTokensObject'], ParentType, ContextType>;
  rejectBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationRejectBotArgs, 'input'>>;
  removeAccount?: Resolver<ResolversTypes['UserObject'], ParentType, ContextType>;
  removeBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationRemoveBotArgs, 'id'>>;
  removeReply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<MutationRemoveReplyArgs, 'id'>>;
  removeReview?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<MutationRemoveReviewArgs, 'id'>>;
  removeTag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<MutationRemoveTagArgs, 'name'>>;
  renameTag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<MutationRenameTagArgs, 'input'>>;
  resetAPIKey?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationResetApiKeyArgs, 'input'>>;
  revokeToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['AuthTokensObject'], ParentType, ContextType, RequireFields<MutationTokenArgs, 'input'>>;
  updateBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationUpdateBotArgs, 'input'>>;
  updateBotInformation?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationUpdateBotInformationArgs, 'input'>>;
  voteBot?: Resolver<ResolversTypes['VoteObject'], ParentType, ContextType, RequireFields<MutationVoteBotArgs, 'id'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bots?: Resolver<ResolversTypes['BotsConnection'], ParentType, ContextType, Partial<QueryBotsArgs>>;
  getApplicationInfo?: Resolver<ResolversTypes['BotStatsObject'], ParentType, ContextType, RequireFields<QueryGetApplicationInfoArgs, 'id'>>;
  getBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<QueryGetBotArgs, 'id'>>;
  getReply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<QueryGetReplyArgs, 'id'>>;
  getReview?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<QueryGetReviewArgs, 'id'>>;
  getTag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<QueryGetTagArgs, 'name'>>;
  me?: Resolver<ResolversTypes['AuthUserObject'], ParentType, ContextType>;
  reviews?: Resolver<ResolversTypes['ReviewsConnection'], ParentType, ContextType, RequireFields<QueryReviewsArgs, 'input'>>;
  tags?: Resolver<ResolversTypes['TagsConnection'], ParentType, ContextType, Partial<QueryTagsArgs>>;
  user?: Resolver<ResolversTypes['UserObject'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  voteCheck?: Resolver<ResolversTypes['VoteCheckObject'], ParentType, ContextType, RequireFields<QueryVoteCheckArgs, 'id'>>;
};

export type ReplyObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReplyObject'] = ResolversParentTypes['ReplyObject']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  review?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType>;
  reviewId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewObject'] = ResolversParentTypes['ReviewObject']> = {
  botId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replies?: Resolver<Array<ResolversTypes['ReplyObject']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserObject'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewObjectEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewObjectEdge'] = ResolversParentTypes['ReviewObjectEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewsConnection'] = ResolversParentTypes['ReviewsConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['ReviewObjectEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['ReviewObject']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  botStatusChanged?: SubscriptionResolver<ResolversTypes['BotObject'], "botStatusChanged", ParentType, ContextType, Partial<SubscriptionBotStatusChangedArgs>>;
};

export type TagObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagObject'] = ResolversParentTypes['TagObject']> = {
  bots?: Resolver<ResolversTypes['BotsConnection'], ParentType, ContextType, Partial<TagObjectBotsArgs>>;
  name?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagObjectEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagObjectEdge'] = ResolversParentTypes['TagObjectEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagsConnection'] = ResolversParentTypes['TagsConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['TagObjectEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['TagObject']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserObject'] = ResolversParentTypes['UserObject']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  badges?: Resolver<Array<ResolversTypes['BadgeObject']>, ParentType, ContextType>;
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bots?: Resolver<ResolversTypes['BotsConnection'], ParentType, ContextType, Partial<UserObjectBotsArgs>>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['ReviewObject']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteCheckObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoteCheckObject'] = ResolversParentTypes['VoteCheckObject']> = {
  bot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType>;
  botId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoteObject'] = ResolversParentTypes['VoteObject']> = {
  bot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType>;
  botId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthTokensObject?: AuthTokensObjectResolvers<ContextType>;
  AuthUserInfoObject?: AuthUserInfoObjectResolvers<ContextType>;
  AuthUserObject?: AuthUserObjectResolvers<ContextType>;
  BadgeObject?: BadgeObjectResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  BotObject?: BotObjectResolvers<ContextType>;
  BotObjectEdge?: BotObjectEdgeResolvers<ContextType>;
  BotStatsApplication?: BotStatsApplicationResolvers<ContextType>;
  BotStatsBot?: BotStatsBotResolvers<ContextType>;
  BotStatsInstallParams?: BotStatsInstallParamsResolvers<ContextType>;
  BotStatsObject?: BotStatsObjectResolvers<ContextType>;
  BotsConnection?: BotsConnectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReplyObject?: ReplyObjectResolvers<ContextType>;
  ReviewObject?: ReviewObjectResolvers<ContextType>;
  ReviewObjectEdge?: ReviewObjectEdgeResolvers<ContextType>;
  ReviewsConnection?: ReviewsConnectionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TagObject?: TagObjectResolvers<ContextType>;
  TagObjectEdge?: TagObjectEdgeResolvers<ContextType>;
  TagsConnection?: TagsConnectionResolvers<ContextType>;
  UserObject?: UserObjectResolvers<ContextType>;
  VoteCheckObject?: VoteCheckObjectResolvers<ContextType>;
  VoteObject?: VoteObjectResolvers<ContextType>;
};


export type VoteBotMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VoteBotMutation = { __typename?: 'Mutation', voteBot: { __typename?: 'VoteObject', id: number, expires: any } };

export type CreateBotMutationVariables = Exact<{
  input: CreateBotInput;
}>;


export type CreateBotMutation = { __typename?: 'Mutation', createBot: { __typename?: 'BotObject', id: string, name: string, status: string } };

export type RemoveBotMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveBotMutation = { __typename?: 'Mutation', removeBot: { __typename?: 'BotObject', name: string } };

export type DenyBotMutationVariables = Exact<{
  input: RejectBotInput;
}>;


export type DenyBotMutation = { __typename?: 'Mutation', rejectBot: { __typename?: 'BotObject', name: string, id: string } };

export type ApproveBotMutationVariables = Exact<{
  approveBotId: Scalars['ID']['input'];
}>;


export type ApproveBotMutation = { __typename?: 'Mutation', approveBot: { __typename?: 'BotObject', id: string, name: string } };

export type ImportBotMutationVariables = Exact<{
  input: ImpotBotInput;
}>;


export type ImportBotMutation = { __typename?: 'Mutation', importBot: { __typename?: 'BotObject', id: string, name: string, status: string } };

export type TokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type TokenMutation = { __typename?: 'Mutation', token: { __typename?: 'AuthTokensObject', expires_in: number, access_token: string, refresh_token: string } };

export type RevokeTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RevokeTokenMutation = { __typename?: 'Mutation', revokeToken: boolean };

export type EditUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'UserObject', bio?: string | null, banner?: string | null, id: string } };

export type ResetApiKeyMutationVariables = Exact<{
  input: CreateKeyInput;
}>;


export type ResetApiKeyMutation = { __typename?: 'Mutation', resetAPIKey: string };

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = { __typename?: 'Query', me: { __typename?: 'AuthUserObject', user: { __typename?: 'UserObject', username: string, avatar?: string | null, id: string } } };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: { __typename?: 'TagsConnection', nodes?: Array<{ __typename?: 'TagObject', name: string, bots: { __typename?: 'BotsConnection', totalCount: number } }> | null } };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserObject', avatar?: string | null, bio?: string | null, id: string, username: string, banner?: string | null, badges: Array<{ __typename?: 'BadgeObject', description: string, id: string }> } };

export type UserBotsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type UserBotsQuery = { __typename?: 'Query', user: { __typename?: 'UserObject', bots: { __typename?: 'BotsConnection', totalCount: number, nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number, guildCount: number }> | null } } };

export type BotsQueryVariables = Exact<{ [key: string]: never; }>;


export type BotsQuery = { __typename?: 'Query', bots: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number, guildCount: number }> | null } };

export type ExploreBotsQueryVariables = Exact<{
  filters?: InputMaybe<GetBotFormInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ExploreBotsQuery = { __typename?: 'Query', bots: { __typename?: 'BotsConnection', totalCount: number, nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number, guildCount: number }> | null } };

export type BotCountQueryVariables = Exact<{ [key: string]: never; }>;


export type BotCountQuery = { __typename?: 'Query', bots: { __typename?: 'BotsConnection', totalCount: number } };

export type PanelBotCountQueryVariables = Exact<{ [key: string]: never; }>;


export type PanelBotCountQuery = { __typename?: 'Query', approved: { __typename?: 'BotsConnection', totalCount: number }, pending: { __typename?: 'BotsConnection', totalCount: number }, denied: { __typename?: 'BotsConnection', totalCount: number } };

export type BotQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BotQuery = { __typename?: 'Query', getBot: { __typename?: 'BotObject', id: string, avatar?: string | null, certified: boolean, name: string, status: string, description?: string | null, shortDescription?: string | null, prefix?: string | null, inviteLink?: string | null, supportServer?: string | null, website?: string | null, github?: string | null, guildCount: number, tags: Array<string>, votes: number, owners: Array<{ __typename?: 'UserObject', id: string, username: string }> } };

export type VoteCheckQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VoteCheckQuery = { __typename?: 'Query', voteCheck: { __typename?: 'VoteCheckObject', voted: boolean, expires: any } };

export type FrontBotsQueryVariables = Exact<{ [key: string]: never; }>;


export type FrontBotsQuery = { __typename?: 'Query', voted: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number, guildCount: number }> | null }, rated: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number, guildCount: number }> | null }, recent: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number, guildCount: number }> | null } };

export type PanelBotsQueryVariables = Exact<{
  status: BotStatus;
}>;


export type PanelBotsQuery = { __typename?: 'Query', bots: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, status: string, owners: Array<{ __typename?: 'UserObject', id: string, username: string, avatar?: string | null }> }> | null } };


export const VoteBotDocument = gql`
    mutation VoteBot($id: ID!) {
  voteBot(id: $id) {
    id
    expires
  }
}
    `;
export type VoteBotMutationFn = Apollo.MutationFunction<VoteBotMutation, VoteBotMutationVariables>;

/**
 * __useVoteBotMutation__
 *
 * To run a mutation, you first call `useVoteBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteBotMutation, { data, loading, error }] = useVoteBotMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoteBotMutation(baseOptions?: Apollo.MutationHookOptions<VoteBotMutation, VoteBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteBotMutation, VoteBotMutationVariables>(VoteBotDocument, options);
      }
export type VoteBotMutationHookResult = ReturnType<typeof useVoteBotMutation>;
export type VoteBotMutationResult = Apollo.MutationResult<VoteBotMutation>;
export type VoteBotMutationOptions = Apollo.BaseMutationOptions<VoteBotMutation, VoteBotMutationVariables>;
export const CreateBotDocument = gql`
    mutation CreateBot($input: CreateBotInput!) {
  createBot(input: $input) {
    id
    name
    status
  }
}
    `;
export type CreateBotMutationFn = Apollo.MutationFunction<CreateBotMutation, CreateBotMutationVariables>;

/**
 * __useCreateBotMutation__
 *
 * To run a mutation, you first call `useCreateBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBotMutation, { data, loading, error }] = useCreateBotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBotMutation(baseOptions?: Apollo.MutationHookOptions<CreateBotMutation, CreateBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBotMutation, CreateBotMutationVariables>(CreateBotDocument, options);
      }
export type CreateBotMutationHookResult = ReturnType<typeof useCreateBotMutation>;
export type CreateBotMutationResult = Apollo.MutationResult<CreateBotMutation>;
export type CreateBotMutationOptions = Apollo.BaseMutationOptions<CreateBotMutation, CreateBotMutationVariables>;
export const RemoveBotDocument = gql`
    mutation RemoveBot($id: ID!) {
  removeBot(id: $id) {
    name
  }
}
    `;
export type RemoveBotMutationFn = Apollo.MutationFunction<RemoveBotMutation, RemoveBotMutationVariables>;

/**
 * __useRemoveBotMutation__
 *
 * To run a mutation, you first call `useRemoveBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBotMutation, { data, loading, error }] = useRemoveBotMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBotMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBotMutation, RemoveBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBotMutation, RemoveBotMutationVariables>(RemoveBotDocument, options);
      }
export type RemoveBotMutationHookResult = ReturnType<typeof useRemoveBotMutation>;
export type RemoveBotMutationResult = Apollo.MutationResult<RemoveBotMutation>;
export type RemoveBotMutationOptions = Apollo.BaseMutationOptions<RemoveBotMutation, RemoveBotMutationVariables>;
export const DenyBotDocument = gql`
    mutation DenyBot($input: RejectBotInput!) {
  rejectBot(input: $input) {
    name
    id
  }
}
    `;
export type DenyBotMutationFn = Apollo.MutationFunction<DenyBotMutation, DenyBotMutationVariables>;

/**
 * __useDenyBotMutation__
 *
 * To run a mutation, you first call `useDenyBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyBotMutation, { data, loading, error }] = useDenyBotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDenyBotMutation(baseOptions?: Apollo.MutationHookOptions<DenyBotMutation, DenyBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DenyBotMutation, DenyBotMutationVariables>(DenyBotDocument, options);
      }
export type DenyBotMutationHookResult = ReturnType<typeof useDenyBotMutation>;
export type DenyBotMutationResult = Apollo.MutationResult<DenyBotMutation>;
export type DenyBotMutationOptions = Apollo.BaseMutationOptions<DenyBotMutation, DenyBotMutationVariables>;
export const ApproveBotDocument = gql`
    mutation ApproveBot($approveBotId: ID!) {
  approveBot(id: $approveBotId) {
    id
    name
  }
}
    `;
export type ApproveBotMutationFn = Apollo.MutationFunction<ApproveBotMutation, ApproveBotMutationVariables>;

/**
 * __useApproveBotMutation__
 *
 * To run a mutation, you first call `useApproveBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveBotMutation, { data, loading, error }] = useApproveBotMutation({
 *   variables: {
 *      approveBotId: // value for 'approveBotId'
 *   },
 * });
 */
export function useApproveBotMutation(baseOptions?: Apollo.MutationHookOptions<ApproveBotMutation, ApproveBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveBotMutation, ApproveBotMutationVariables>(ApproveBotDocument, options);
      }
export type ApproveBotMutationHookResult = ReturnType<typeof useApproveBotMutation>;
export type ApproveBotMutationResult = Apollo.MutationResult<ApproveBotMutation>;
export type ApproveBotMutationOptions = Apollo.BaseMutationOptions<ApproveBotMutation, ApproveBotMutationVariables>;
export const ImportBotDocument = gql`
    mutation ImportBot($input: ImpotBotInput!) {
  importBot(input: $input) {
    id
    name
    status
  }
}
    `;
export type ImportBotMutationFn = Apollo.MutationFunction<ImportBotMutation, ImportBotMutationVariables>;

/**
 * __useImportBotMutation__
 *
 * To run a mutation, you first call `useImportBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importBotMutation, { data, loading, error }] = useImportBotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImportBotMutation(baseOptions?: Apollo.MutationHookOptions<ImportBotMutation, ImportBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportBotMutation, ImportBotMutationVariables>(ImportBotDocument, options);
      }
export type ImportBotMutationHookResult = ReturnType<typeof useImportBotMutation>;
export type ImportBotMutationResult = Apollo.MutationResult<ImportBotMutation>;
export type ImportBotMutationOptions = Apollo.BaseMutationOptions<ImportBotMutation, ImportBotMutationVariables>;
export const TokenDocument = gql`
    mutation Token($token: String!) {
  token(input: {token: $token}) {
    expires_in
    access_token
    refresh_token
  }
}
    `;
export type TokenMutationFn = Apollo.MutationFunction<TokenMutation, TokenMutationVariables>;

/**
 * __useTokenMutation__
 *
 * To run a mutation, you first call `useTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenMutation, { data, loading, error }] = useTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useTokenMutation(baseOptions?: Apollo.MutationHookOptions<TokenMutation, TokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenMutation, TokenMutationVariables>(TokenDocument, options);
      }
export type TokenMutationHookResult = ReturnType<typeof useTokenMutation>;
export type TokenMutationResult = Apollo.MutationResult<TokenMutation>;
export type TokenMutationOptions = Apollo.BaseMutationOptions<TokenMutation, TokenMutationVariables>;
export const RevokeTokenDocument = gql`
    mutation RevokeToken {
  revokeToken
}
    `;
export type RevokeTokenMutationFn = Apollo.MutationFunction<RevokeTokenMutation, RevokeTokenMutationVariables>;

/**
 * __useRevokeTokenMutation__
 *
 * To run a mutation, you first call `useRevokeTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeTokenMutation, { data, loading, error }] = useRevokeTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRevokeTokenMutation(baseOptions?: Apollo.MutationHookOptions<RevokeTokenMutation, RevokeTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeTokenMutation, RevokeTokenMutationVariables>(RevokeTokenDocument, options);
      }
export type RevokeTokenMutationHookResult = ReturnType<typeof useRevokeTokenMutation>;
export type RevokeTokenMutationResult = Apollo.MutationResult<RevokeTokenMutation>;
export type RevokeTokenMutationOptions = Apollo.BaseMutationOptions<RevokeTokenMutation, RevokeTokenMutationVariables>;
export const EditUserDocument = gql`
    mutation EditUser($input: UpdateUserInput!) {
  editUser(input: $input) {
    bio
    banner
    id
  }
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const ResetApiKeyDocument = gql`
    mutation ResetApiKey($input: CreateKeyInput!) {
  resetAPIKey(input: $input)
}
    `;
export type ResetApiKeyMutationFn = Apollo.MutationFunction<ResetApiKeyMutation, ResetApiKeyMutationVariables>;

/**
 * __useResetApiKeyMutation__
 *
 * To run a mutation, you first call `useResetApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetApiKeyMutation, { data, loading, error }] = useResetApiKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<ResetApiKeyMutation, ResetApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetApiKeyMutation, ResetApiKeyMutationVariables>(ResetApiKeyDocument, options);
      }
export type ResetApiKeyMutationHookResult = ReturnType<typeof useResetApiKeyMutation>;
export type ResetApiKeyMutationResult = Apollo.MutationResult<ResetApiKeyMutation>;
export type ResetApiKeyMutationOptions = Apollo.BaseMutationOptions<ResetApiKeyMutation, ResetApiKeyMutationVariables>;
export const SessionDocument = gql`
    query Session {
  me {
    user {
      username
      avatar
      id
    }
  }
}
    `;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionQuery(baseOptions?: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export function useSessionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionSuspenseQueryHookResult = ReturnType<typeof useSessionSuspenseQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  tags {
    nodes {
      name
      bots {
        totalCount
      }
    }
  }
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export function useTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsSuspenseQueryHookResult = ReturnType<typeof useTagsSuspenseQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const UserDocument = gql`
    query User($userId: ID!) {
  user(id: $userId) {
    avatar
    badges {
      description
      id
    }
    bio
    id
    username
    banner
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserBotsDocument = gql`
    query UserBots($userId: ID!) {
  user(id: $userId) {
    bots {
      totalCount
      nodes {
        id
        name
        avatar
        certified
        shortDescription
        tags
        votes
        guildCount
      }
    }
  }
}
    `;

/**
 * __useUserBotsQuery__
 *
 * To run a query within a React component, call `useUserBotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBotsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserBotsQuery(baseOptions: Apollo.QueryHookOptions<UserBotsQuery, UserBotsQueryVariables> & ({ variables: UserBotsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBotsQuery, UserBotsQueryVariables>(UserBotsDocument, options);
      }
export function useUserBotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBotsQuery, UserBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBotsQuery, UserBotsQueryVariables>(UserBotsDocument, options);
        }
export function useUserBotsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserBotsQuery, UserBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserBotsQuery, UserBotsQueryVariables>(UserBotsDocument, options);
        }
export type UserBotsQueryHookResult = ReturnType<typeof useUserBotsQuery>;
export type UserBotsLazyQueryHookResult = ReturnType<typeof useUserBotsLazyQuery>;
export type UserBotsSuspenseQueryHookResult = ReturnType<typeof useUserBotsSuspenseQuery>;
export type UserBotsQueryResult = Apollo.QueryResult<UserBotsQuery, UserBotsQueryVariables>;
export const BotsDocument = gql`
    query Bots {
  bots {
    nodes {
      id
      name
      avatar
      certified
      shortDescription
      tags
      votes
      guildCount
    }
  }
}
    `;

/**
 * __useBotsQuery__
 *
 * To run a query within a React component, call `useBotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBotsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBotsQuery(baseOptions?: Apollo.QueryHookOptions<BotsQuery, BotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BotsQuery, BotsQueryVariables>(BotsDocument, options);
      }
export function useBotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BotsQuery, BotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BotsQuery, BotsQueryVariables>(BotsDocument, options);
        }
export function useBotsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BotsQuery, BotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BotsQuery, BotsQueryVariables>(BotsDocument, options);
        }
export type BotsQueryHookResult = ReturnType<typeof useBotsQuery>;
export type BotsLazyQueryHookResult = ReturnType<typeof useBotsLazyQuery>;
export type BotsSuspenseQueryHookResult = ReturnType<typeof useBotsSuspenseQuery>;
export type BotsQueryResult = Apollo.QueryResult<BotsQuery, BotsQueryVariables>;
export const ExploreBotsDocument = gql`
    query ExploreBots($filters: GetBotFormInput, $first: Int) {
  bots(filters: $filters, first: $first) {
    nodes {
      id
      name
      avatar
      certified
      shortDescription
      tags
      votes
      guildCount
    }
    totalCount
  }
}
    `;

/**
 * __useExploreBotsQuery__
 *
 * To run a query within a React component, call `useExploreBotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreBotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreBotsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useExploreBotsQuery(baseOptions?: Apollo.QueryHookOptions<ExploreBotsQuery, ExploreBotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExploreBotsQuery, ExploreBotsQueryVariables>(ExploreBotsDocument, options);
      }
export function useExploreBotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExploreBotsQuery, ExploreBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExploreBotsQuery, ExploreBotsQueryVariables>(ExploreBotsDocument, options);
        }
export function useExploreBotsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExploreBotsQuery, ExploreBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExploreBotsQuery, ExploreBotsQueryVariables>(ExploreBotsDocument, options);
        }
export type ExploreBotsQueryHookResult = ReturnType<typeof useExploreBotsQuery>;
export type ExploreBotsLazyQueryHookResult = ReturnType<typeof useExploreBotsLazyQuery>;
export type ExploreBotsSuspenseQueryHookResult = ReturnType<typeof useExploreBotsSuspenseQuery>;
export type ExploreBotsQueryResult = Apollo.QueryResult<ExploreBotsQuery, ExploreBotsQueryVariables>;
export const BotCountDocument = gql`
    query BotCount {
  bots(filters: {}) {
    totalCount
  }
}
    `;

/**
 * __useBotCountQuery__
 *
 * To run a query within a React component, call `useBotCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useBotCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBotCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useBotCountQuery(baseOptions?: Apollo.QueryHookOptions<BotCountQuery, BotCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BotCountQuery, BotCountQueryVariables>(BotCountDocument, options);
      }
export function useBotCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BotCountQuery, BotCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BotCountQuery, BotCountQueryVariables>(BotCountDocument, options);
        }
export function useBotCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BotCountQuery, BotCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BotCountQuery, BotCountQueryVariables>(BotCountDocument, options);
        }
export type BotCountQueryHookResult = ReturnType<typeof useBotCountQuery>;
export type BotCountLazyQueryHookResult = ReturnType<typeof useBotCountLazyQuery>;
export type BotCountSuspenseQueryHookResult = ReturnType<typeof useBotCountSuspenseQuery>;
export type BotCountQueryResult = Apollo.QueryResult<BotCountQuery, BotCountQueryVariables>;
export const PanelBotCountDocument = gql`
    query PanelBotCount {
  approved: bots(filters: {status: Approved}) {
    totalCount
  }
  pending: bots(filters: {status: Pending}) {
    totalCount
  }
  denied: bots(filters: {status: Denied}) {
    totalCount
  }
}
    `;

/**
 * __usePanelBotCountQuery__
 *
 * To run a query within a React component, call `usePanelBotCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePanelBotCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePanelBotCountQuery({
 *   variables: {
 *   },
 * });
 */
export function usePanelBotCountQuery(baseOptions?: Apollo.QueryHookOptions<PanelBotCountQuery, PanelBotCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PanelBotCountQuery, PanelBotCountQueryVariables>(PanelBotCountDocument, options);
      }
export function usePanelBotCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PanelBotCountQuery, PanelBotCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PanelBotCountQuery, PanelBotCountQueryVariables>(PanelBotCountDocument, options);
        }
export function usePanelBotCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PanelBotCountQuery, PanelBotCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PanelBotCountQuery, PanelBotCountQueryVariables>(PanelBotCountDocument, options);
        }
export type PanelBotCountQueryHookResult = ReturnType<typeof usePanelBotCountQuery>;
export type PanelBotCountLazyQueryHookResult = ReturnType<typeof usePanelBotCountLazyQuery>;
export type PanelBotCountSuspenseQueryHookResult = ReturnType<typeof usePanelBotCountSuspenseQuery>;
export type PanelBotCountQueryResult = Apollo.QueryResult<PanelBotCountQuery, PanelBotCountQueryVariables>;
export const BotDocument = gql`
    query Bot($id: ID!) {
  getBot(id: $id) {
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
    `;

/**
 * __useBotQuery__
 *
 * To run a query within a React component, call `useBotQuery` and pass it any options that fit your needs.
 * When your component renders, `useBotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBotQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBotQuery(baseOptions: Apollo.QueryHookOptions<BotQuery, BotQueryVariables> & ({ variables: BotQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BotQuery, BotQueryVariables>(BotDocument, options);
      }
export function useBotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BotQuery, BotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BotQuery, BotQueryVariables>(BotDocument, options);
        }
export function useBotSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BotQuery, BotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BotQuery, BotQueryVariables>(BotDocument, options);
        }
export type BotQueryHookResult = ReturnType<typeof useBotQuery>;
export type BotLazyQueryHookResult = ReturnType<typeof useBotLazyQuery>;
export type BotSuspenseQueryHookResult = ReturnType<typeof useBotSuspenseQuery>;
export type BotQueryResult = Apollo.QueryResult<BotQuery, BotQueryVariables>;
export const VoteCheckDocument = gql`
    query VoteCheck($id: ID!) {
  voteCheck(id: $id) {
    voted
    expires
  }
}
    `;

/**
 * __useVoteCheckQuery__
 *
 * To run a query within a React component, call `useVoteCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useVoteCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoteCheckQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoteCheckQuery(baseOptions: Apollo.QueryHookOptions<VoteCheckQuery, VoteCheckQueryVariables> & ({ variables: VoteCheckQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VoteCheckQuery, VoteCheckQueryVariables>(VoteCheckDocument, options);
      }
export function useVoteCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VoteCheckQuery, VoteCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VoteCheckQuery, VoteCheckQueryVariables>(VoteCheckDocument, options);
        }
export function useVoteCheckSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VoteCheckQuery, VoteCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VoteCheckQuery, VoteCheckQueryVariables>(VoteCheckDocument, options);
        }
export type VoteCheckQueryHookResult = ReturnType<typeof useVoteCheckQuery>;
export type VoteCheckLazyQueryHookResult = ReturnType<typeof useVoteCheckLazyQuery>;
export type VoteCheckSuspenseQueryHookResult = ReturnType<typeof useVoteCheckSuspenseQuery>;
export type VoteCheckQueryResult = Apollo.QueryResult<VoteCheckQuery, VoteCheckQueryVariables>;
export const FrontBotsDocument = gql`
    query FrontBots {
  voted: bots(first: 4, filters: {orderBy: {direction: desc, field: votes}}) {
    nodes {
      id
      name
      avatar
      certified
      shortDescription
      tags
      votes
      guildCount
    }
  }
  rated: bots(first: 4, filters: {orderBy: {direction: desc, field: reviews}}) {
    nodes {
      id
      name
      avatar
      certified
      shortDescription
      tags
      votes
      guildCount
    }
  }
  recent: bots(first: 4, filters: {orderBy: {direction: desc, field: createdAt}}) {
    nodes {
      id
      name
      avatar
      certified
      shortDescription
      tags
      votes
      guildCount
    }
  }
}
    `;

/**
 * __useFrontBotsQuery__
 *
 * To run a query within a React component, call `useFrontBotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFrontBotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFrontBotsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFrontBotsQuery(baseOptions?: Apollo.QueryHookOptions<FrontBotsQuery, FrontBotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FrontBotsQuery, FrontBotsQueryVariables>(FrontBotsDocument, options);
      }
export function useFrontBotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FrontBotsQuery, FrontBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FrontBotsQuery, FrontBotsQueryVariables>(FrontBotsDocument, options);
        }
export function useFrontBotsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FrontBotsQuery, FrontBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FrontBotsQuery, FrontBotsQueryVariables>(FrontBotsDocument, options);
        }
export type FrontBotsQueryHookResult = ReturnType<typeof useFrontBotsQuery>;
export type FrontBotsLazyQueryHookResult = ReturnType<typeof useFrontBotsLazyQuery>;
export type FrontBotsSuspenseQueryHookResult = ReturnType<typeof useFrontBotsSuspenseQuery>;
export type FrontBotsQueryResult = Apollo.QueryResult<FrontBotsQuery, FrontBotsQueryVariables>;
export const PanelBotsDocument = gql`
    query PanelBots($status: BotStatus!) {
  bots(filters: {status: $status}) {
    nodes {
      id
      name
      avatar
      status
      owners {
        id
        username
        avatar
      }
    }
  }
}
    `;

/**
 * __usePanelBotsQuery__
 *
 * To run a query within a React component, call `usePanelBotsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePanelBotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePanelBotsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function usePanelBotsQuery(baseOptions: Apollo.QueryHookOptions<PanelBotsQuery, PanelBotsQueryVariables> & ({ variables: PanelBotsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PanelBotsQuery, PanelBotsQueryVariables>(PanelBotsDocument, options);
      }
export function usePanelBotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PanelBotsQuery, PanelBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PanelBotsQuery, PanelBotsQueryVariables>(PanelBotsDocument, options);
        }
export function usePanelBotsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PanelBotsQuery, PanelBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PanelBotsQuery, PanelBotsQueryVariables>(PanelBotsDocument, options);
        }
export type PanelBotsQueryHookResult = ReturnType<typeof usePanelBotsQuery>;
export type PanelBotsLazyQueryHookResult = ReturnType<typeof usePanelBotsLazyQuery>;
export type PanelBotsSuspenseQueryHookResult = ReturnType<typeof usePanelBotsSuspenseQuery>;
export type PanelBotsQueryResult = Apollo.QueryResult<PanelBotsQuery, PanelBotsQueryVariables>;