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
  /** Get the API information of the bot */
  apiInformation: BotStatsObject;
  avatar?: Maybe<Scalars['String']['output']>;
  certified: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  guildCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
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

/** The input to get bots from the database */
export type GetBotFormInput = {
  /** Decide how to order the bots */
  orderBy?: InputMaybe<BotOrder>;
  /** People who own the bot */
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The bot status */
  status?: InputMaybe<BotStatus>;
  /** Tags to filter the bots by */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Input to get a key */
export type GetKeyInput = {
  /** Bot id */
  id: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Approve a bot */
  approveBot: BotObject;
  /** Create a bot */
  createBot: BotObject;
  deleteAccount: UserObject;
  /** Delete a bot */
  deleteBot: BotObject;
  deleteReply: ReplyObject;
  deleteReview: ReviewObject;
  deleteTag: TagObject;
  /** Refresh the access token. */
  refreshToken: AuthTokensObject;
  /** Approve a bot */
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
  /** Update a bot */
  updateBot: BotObject;
  /** Update the bot information */
  updateBotInformation: BotObject;
  updateReply: ReplyObject;
  updateReview: ReviewObject;
  /** Vote for a bot. */
  voteBot: VoteObject;
};


export type MutationApproveBotArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateBotArgs = {
  input: CreateBotInput;
};


export type MutationDeleteBotArgs = {
  id: Scalars['String']['input'];
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


export type MutationRejectBotArgs = {
  id: Scalars['String']['input'];
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


export type MutationUpdateBotArgs = {
  input: UpdateBotInput;
};


export type MutationUpdateBotInformationArgs = {
  input: UpdateBotInformationInput;
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
  /** Get the API information of a bot */
  applicationInfo: BotStatsObject;
  /** Get a bot by its ID */
  bot: BotObject;
  /** Get all bots in the database */
  bots: BotsConnection;
  /** Get the API key of a bot */
  getAPIKey: Scalars['String']['output'];
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
  /** Check if the user has voted for a bot. */
  voteCheck: Scalars['Boolean']['output'];
};


export type QueryApplicationInfoArgs = {
  id: Scalars['String']['input'];
};


export type QueryBotArgs = {
  id: Scalars['String']['input'];
};


export type QueryBotsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<GetBotFormInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetApiKeyArgs = {
  input: GetKeyInput;
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

export type UpdateBotInformationInput = {
  /** The bot's avatar */
  avatar?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the bot */
  id: Scalars['ID']['input'];
  /** The bot's name */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBotInput = {
  /** The bot avatar URL */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The GitHub repository URL */
  github?: InputMaybe<Scalars['String']['input']>;
  /** The amount of guilds the bot is in */
  guildCount?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the bot to update */
  id: Scalars['ID']['input'];
  /** The invite link to the bot. */
  inviteLink?: InputMaybe<Scalars['String']['input']>;
  /** The bot owners */
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The bot's prefix */
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

export type UserObject = {
  __typename?: 'UserObject';
  avatar?: Maybe<Scalars['String']['output']>;
  badges: Array<BadgeObject>;
  banner?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  bots: BotsConnection;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
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

export type VoteObject = {
  __typename?: 'VoteObject';
  /** The bot that was voted for. */
  bot: BotObject;
  botId: Scalars['String']['output'];
  expires: Scalars['BigInt']['output'];
  id: Scalars['Int']['output'];
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
  AuthUserInforObject: ResolverTypeWrapper<AuthUserInforObject>;
  AuthUserObject: ResolverTypeWrapper<AuthUserObject>;
  BadgeObject: ResolverTypeWrapper<BadgeObject>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  GetBotFormInput: GetBotFormInput;
  GetKeyInput: GetKeyInput;
  Mutation: ResolverTypeWrapper<{}>;
  OrderDirection: OrderDirection;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  ReplyObject: ResolverTypeWrapper<ReplyObject>;
  ReviewObject: ResolverTypeWrapper<ReviewObject>;
  ReviewObjectEdge: ResolverTypeWrapper<ReviewObjectEdge>;
  ReviewsConnection: ResolverTypeWrapper<ReviewsConnection>;
  TagObject: ResolverTypeWrapper<TagObject>;
  TagObjectEdge: ResolverTypeWrapper<TagObjectEdge>;
  TagsConnection: ResolverTypeWrapper<TagsConnection>;
  TokenInput: TokenInput;
  UpdateBotInformationInput: UpdateBotInformationInput;
  UpdateBotInput: UpdateBotInput;
  UserObject: ResolverTypeWrapper<UserObject>;
  VoteObject: ResolverTypeWrapper<VoteObject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthTokensObject: AuthTokensObject;
  String: Scalars['String']['output'];
  Float: Scalars['Float']['output'];
  AuthUserInforObject: AuthUserInforObject;
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
  DateTime: Scalars['DateTime']['output'];
  GetBotFormInput: GetBotFormInput;
  GetKeyInput: GetKeyInput;
  Mutation: {};
  PageInfo: PageInfo;
  Query: {};
  ReplyObject: ReplyObject;
  ReviewObject: ReviewObject;
  ReviewObjectEdge: ReviewObjectEdge;
  ReviewsConnection: ReviewsConnection;
  TagObject: TagObject;
  TagObjectEdge: TagObjectEdge;
  TagsConnection: TagsConnection;
  TokenInput: TokenInput;
  UpdateBotInformationInput: UpdateBotInformationInput;
  UpdateBotInput: UpdateBotInput;
  UserObject: UserObject;
  VoteObject: VoteObject;
};

export type AuthTokensObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthTokensObject'] = ResolversParentTypes['AuthTokensObject']> = {
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires_in?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  refresh_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthUserInforObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthUserInforObject'] = ResolversParentTypes['AuthUserInforObject']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discriminator?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public_flags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthUserObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthUserObject'] = ResolversParentTypes['AuthUserObject']> = {
  auth?: Resolver<ResolversTypes['AuthUserInforObject'], ParentType, ContextType>;
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
  discriminator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  deleteAccount?: Resolver<ResolversTypes['UserObject'], ParentType, ContextType>;
  deleteBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationDeleteBotArgs, 'id'>>;
  deleteReply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<MutationDeleteReplyArgs, 'id'>>;
  deleteReview?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  deleteTag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'name'>>;
  refreshToken?: Resolver<ResolversTypes['AuthTokensObject'], ParentType, ContextType>;
  rejectBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationRejectBotArgs, 'id' | 'reason'>>;
  renameTag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<MutationRenameTagArgs, 'name' | 'newName'>>;
  reply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<MutationReplyArgs, 'content' | 'reviewId'>>;
  resetAPIKey?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationResetApiKeyArgs, 'input'>>;
  review?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<MutationReviewArgs, 'botId' | 'content' | 'rating'>>;
  revokeToken?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<MutationTagArgs, 'name'>>;
  token?: Resolver<ResolversTypes['AuthTokensObject'], ParentType, ContextType, RequireFields<MutationTokenArgs, 'input'>>;
  updateBot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationUpdateBotArgs, 'input'>>;
  updateBotInformation?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<MutationUpdateBotInformationArgs, 'input'>>;
  updateReply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<MutationUpdateReplyArgs, 'content' | 'reviewId'>>;
  updateReview?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'botId' | 'content' | 'id' | 'rating'>>;
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
  applicationInfo?: Resolver<ResolversTypes['BotStatsObject'], ParentType, ContextType, RequireFields<QueryApplicationInfoArgs, 'id'>>;
  bot?: Resolver<ResolversTypes['BotObject'], ParentType, ContextType, RequireFields<QueryBotArgs, 'id'>>;
  bots?: Resolver<ResolversTypes['BotsConnection'], ParentType, ContextType, Partial<QueryBotsArgs>>;
  getAPIKey?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGetApiKeyArgs, 'input'>>;
  me?: Resolver<ResolversTypes['AuthUserObject'], ParentType, ContextType>;
  reply?: Resolver<ResolversTypes['ReplyObject'], ParentType, ContextType, RequireFields<QueryReplyArgs, 'id'>>;
  review?: Resolver<ResolversTypes['ReviewObject'], ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>;
  reviews?: Resolver<ResolversTypes['ReviewsConnection'], ParentType, ContextType, RequireFields<QueryReviewsArgs, 'botId'>>;
  tag?: Resolver<ResolversTypes['TagObject'], ParentType, ContextType, RequireFields<QueryTagArgs, 'name'>>;
  tags?: Resolver<ResolversTypes['TagsConnection'], ParentType, ContextType, Partial<QueryTagsArgs>>;
  user?: Resolver<ResolversTypes['UserObject'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  voteCheck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryVoteCheckArgs, 'id'>>;
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
  AuthUserInforObject?: AuthUserInforObjectResolvers<ContextType>;
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
  TagObject?: TagObjectResolvers<ContextType>;
  TagObjectEdge?: TagObjectEdgeResolvers<ContextType>;
  TagsConnection?: TagsConnectionResolvers<ContextType>;
  UserObject?: UserObjectResolvers<ContextType>;
  VoteObject?: VoteObjectResolvers<ContextType>;
};


export type VoteBotMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type VoteBotMutation = { __typename?: 'Mutation', voteBot: { __typename?: 'VoteObject', id: number, expires: any } };

export type CreateBotMutationVariables = Exact<{
  input: CreateBotInput;
}>;


export type CreateBotMutation = { __typename?: 'Mutation', createBot: { __typename?: 'BotObject', id: string, name: string, status: string } };

export type DeleteBotMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteBotMutation = { __typename?: 'Mutation', deleteBot: { __typename?: 'BotObject', name: string } };

export type DenyBotMutationVariables = Exact<{
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
}>;


export type DenyBotMutation = { __typename?: 'Mutation', rejectBot: { __typename?: 'BotObject', name: string } };

export type ApproveBotMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ApproveBotMutation = { __typename?: 'Mutation', approveBot: { __typename?: 'BotObject', name: string } };

export type TokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type TokenMutation = { __typename?: 'Mutation', token: { __typename?: 'AuthTokensObject', expires_in: number, access_token: string, refresh_token: string } };

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = { __typename?: 'Query', me: { __typename?: 'AuthUserObject', user: { __typename?: 'UserObject', username: string, avatar?: string | null, id: string } } };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: { __typename?: 'TagsConnection', nodes?: Array<{ __typename?: 'TagObject', name: string }> | null } };

export type BotsQueryVariables = Exact<{ [key: string]: never; }>;


export type BotsQuery = { __typename?: 'Query', bots: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number }> | null } };

export type ApiKeyQueryVariables = Exact<{
  input: GetKeyInput;
}>;


export type ApiKeyQuery = { __typename?: 'Query', getAPIKey: string };

export type BotQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type BotQuery = { __typename?: 'Query', bot: { __typename?: 'BotObject', id: string, avatar?: string | null, certified: boolean, name: string, status: string, description?: string | null, shortDescription?: string | null, prefix?: string | null, inviteLink?: string | null, supportServer?: string | null, website?: string | null, github?: string | null, guildCount: number, tags: Array<string>, votes: number, owners: Array<{ __typename?: 'UserObject', id: string, username: string }> } };

export type VoteCheckQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type VoteCheckQuery = { __typename?: 'Query', voteCheck: boolean };

export type FrontBotsQueryVariables = Exact<{ [key: string]: never; }>;


export type FrontBotsQuery = { __typename?: 'Query', voted: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number }> | null }, rated: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number }> | null }, recent: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number }> | null } };

export type PanelBotsQueryVariables = Exact<{
  status: BotStatus;
}>;


export type PanelBotsQuery = { __typename?: 'Query', bots: { __typename?: 'BotsConnection', nodes?: Array<{ __typename?: 'BotObject', id: string, name: string, avatar?: string | null, certified: boolean, shortDescription?: string | null, tags: Array<string>, votes: number }> | null } };


export const VoteBotDocument = gql`
    mutation VoteBot($id: String!) {
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
export const DeleteBotDocument = gql`
    mutation DeleteBot($id: String!) {
  deleteBot(id: $id) {
    name
  }
}
    `;
export type DeleteBotMutationFn = Apollo.MutationFunction<DeleteBotMutation, DeleteBotMutationVariables>;

/**
 * __useDeleteBotMutation__
 *
 * To run a mutation, you first call `useDeleteBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBotMutation, { data, loading, error }] = useDeleteBotMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBotMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBotMutation, DeleteBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBotMutation, DeleteBotMutationVariables>(DeleteBotDocument, options);
      }
export type DeleteBotMutationHookResult = ReturnType<typeof useDeleteBotMutation>;
export type DeleteBotMutationResult = Apollo.MutationResult<DeleteBotMutation>;
export type DeleteBotMutationOptions = Apollo.BaseMutationOptions<DeleteBotMutation, DeleteBotMutationVariables>;
export const DenyBotDocument = gql`
    mutation DenyBot($id: String!, $reason: String!) {
  rejectBot(id: $id, reason: $reason) {
    name
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
 *      id: // value for 'id'
 *      reason: // value for 'reason'
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
    mutation ApproveBot($id: String!) {
  approveBot(id: $id) {
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
 *      id: // value for 'id'
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
export const ApiKeyDocument = gql`
    query ApiKey($input: GetKeyInput!) {
  getAPIKey(input: $input)
}
    `;

/**
 * __useApiKeyQuery__
 *
 * To run a query within a React component, call `useApiKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiKeyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApiKeyQuery(baseOptions: Apollo.QueryHookOptions<ApiKeyQuery, ApiKeyQueryVariables> & ({ variables: ApiKeyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiKeyQuery, ApiKeyQueryVariables>(ApiKeyDocument, options);
      }
export function useApiKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiKeyQuery, ApiKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiKeyQuery, ApiKeyQueryVariables>(ApiKeyDocument, options);
        }
export function useApiKeySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ApiKeyQuery, ApiKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApiKeyQuery, ApiKeyQueryVariables>(ApiKeyDocument, options);
        }
export type ApiKeyQueryHookResult = ReturnType<typeof useApiKeyQuery>;
export type ApiKeyLazyQueryHookResult = ReturnType<typeof useApiKeyLazyQuery>;
export type ApiKeySuspenseQueryHookResult = ReturnType<typeof useApiKeySuspenseQuery>;
export type ApiKeyQueryResult = Apollo.QueryResult<ApiKeyQuery, ApiKeyQueryVariables>;
export const BotDocument = gql`
    query Bot($id: String!) {
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
    query VoteCheck($id: String!) {
  voteCheck(id: $id)
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
      certified
      shortDescription
      tags
      votes
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