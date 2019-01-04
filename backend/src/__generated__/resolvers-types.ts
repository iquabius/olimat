export type Maybe<T> = T | null;

export interface QuestionWhereInput {
  id: Maybe<string>;

  id_not: Maybe<string>;

  id_in: Maybe<string[]>;

  id_not_in: Maybe<string[]>;

  id_lt: Maybe<string>;

  id_lte: Maybe<string>;

  id_gt: Maybe<string>;

  id_gte: Maybe<string>;

  id_contains: Maybe<string>;

  id_not_contains: Maybe<string>;

  id_starts_with: Maybe<string>;

  id_not_starts_with: Maybe<string>;

  id_ends_with: Maybe<string>;

  id_not_ends_with: Maybe<string>;

  type: Maybe<QuestionType>;

  type_not: Maybe<QuestionType>;

  type_in: Maybe<QuestionType[]>;

  type_not_in: Maybe<QuestionType[]>;

  wording: Maybe<string>;

  wording_not: Maybe<string>;

  wording_in: Maybe<string[]>;

  wording_not_in: Maybe<string[]>;

  wording_lt: Maybe<string>;

  wording_lte: Maybe<string>;

  wording_gt: Maybe<string>;

  wording_gte: Maybe<string>;

  wording_contains: Maybe<string>;

  wording_not_contains: Maybe<string>;

  wording_starts_with: Maybe<string>;

  wording_not_starts_with: Maybe<string>;

  wording_ends_with: Maybe<string>;

  wording_not_ends_with: Maybe<string>;

  imageUrl: Maybe<string>;

  imageUrl_not: Maybe<string>;

  imageUrl_in: Maybe<string[]>;

  imageUrl_not_in: Maybe<string[]>;

  imageUrl_lt: Maybe<string>;

  imageUrl_lte: Maybe<string>;

  imageUrl_gt: Maybe<string>;

  imageUrl_gte: Maybe<string>;

  imageUrl_contains: Maybe<string>;

  imageUrl_not_contains: Maybe<string>;

  imageUrl_starts_with: Maybe<string>;

  imageUrl_not_starts_with: Maybe<string>;

  imageUrl_ends_with: Maybe<string>;

  imageUrl_not_ends_with: Maybe<string>;

  secondaryWording: Maybe<string>;

  secondaryWording_not: Maybe<string>;

  secondaryWording_in: Maybe<string[]>;

  secondaryWording_not_in: Maybe<string[]>;

  secondaryWording_lt: Maybe<string>;

  secondaryWording_lte: Maybe<string>;

  secondaryWording_gt: Maybe<string>;

  secondaryWording_gte: Maybe<string>;

  secondaryWording_contains: Maybe<string>;

  secondaryWording_not_contains: Maybe<string>;

  secondaryWording_starts_with: Maybe<string>;

  secondaryWording_not_starts_with: Maybe<string>;

  secondaryWording_ends_with: Maybe<string>;

  secondaryWording_not_ends_with: Maybe<string>;

  choices_every: Maybe<QuestionChoiceWhereInput>;

  choices_some: Maybe<QuestionChoiceWhereInput>;

  choices_none: Maybe<QuestionChoiceWhereInput>;

  AND: Maybe<QuestionWhereInput[]>;

  OR: Maybe<QuestionWhereInput[]>;

  NOT: Maybe<QuestionWhereInput[]>;
}

export interface QuestionChoiceWhereInput {
  id: Maybe<string>;

  id_not: Maybe<string>;

  id_in: Maybe<string[]>;

  id_not_in: Maybe<string[]>;

  id_lt: Maybe<string>;

  id_lte: Maybe<string>;

  id_gt: Maybe<string>;

  id_gte: Maybe<string>;

  id_contains: Maybe<string>;

  id_not_contains: Maybe<string>;

  id_starts_with: Maybe<string>;

  id_not_starts_with: Maybe<string>;

  id_ends_with: Maybe<string>;

  id_not_ends_with: Maybe<string>;

  text: Maybe<string>;

  text_not: Maybe<string>;

  text_in: Maybe<string[]>;

  text_not_in: Maybe<string[]>;

  text_lt: Maybe<string>;

  text_lte: Maybe<string>;

  text_gt: Maybe<string>;

  text_gte: Maybe<string>;

  text_contains: Maybe<string>;

  text_not_contains: Maybe<string>;

  text_starts_with: Maybe<string>;

  text_not_starts_with: Maybe<string>;

  text_ends_with: Maybe<string>;

  text_not_ends_with: Maybe<string>;

  AND: Maybe<QuestionChoiceWhereInput[]>;

  OR: Maybe<QuestionChoiceWhereInput[]>;

  NOT: Maybe<QuestionChoiceWhereInput[]>;
}

export interface QuestionCreateInput {
  type: QuestionType;

  wording: string;

  imageUrl: Maybe<string>;

  secondaryWording: Maybe<string>;

  choices: Maybe<QuestionChoiceCreateManyInput>;
}

export interface QuestionChoiceCreateManyInput {
  create: Maybe<QuestionChoiceCreateInput[]>;

  connect: Maybe<QuestionChoiceWhereUniqueInput[]>;
}

export interface QuestionChoiceCreateInput {
  text: string;
}

export interface QuestionChoiceWhereUniqueInput {
  id: Maybe<string>;
}

export interface UpdateQuestionInput {
  id: string;

  patch: QuestionUpdateInput;
}

export interface QuestionUpdateInput {
  type: Maybe<QuestionType>;

  wording: Maybe<string>;

  imageUrl: Maybe<string>;

  secondaryWording: Maybe<string>;

  choices: Maybe<QuestionChoiceUpdateManyInput>;
}

export interface QuestionChoiceUpdateManyInput {
  create: Maybe<QuestionChoiceCreateInput[]>;

  update: Maybe<QuestionChoiceUpdateWithWhereUniqueNestedInput[]>;

  upsert: Maybe<QuestionChoiceUpsertWithWhereUniqueNestedInput[]>;

  delete: Maybe<QuestionChoiceWhereUniqueInput[]>;

  connect: Maybe<QuestionChoiceWhereUniqueInput[]>;

  disconnect: Maybe<QuestionChoiceWhereUniqueInput[]>;

  deleteMany: Maybe<QuestionChoiceScalarWhereInput[]>;

  updateMany: Maybe<QuestionChoiceUpdateManyWithWhereNestedInput[]>;
}

export interface QuestionChoiceUpdateWithWhereUniqueNestedInput {
  where: QuestionChoiceWhereUniqueInput;

  data: QuestionChoiceUpdateDataInput;
}

export interface QuestionChoiceUpdateDataInput {
  text: Maybe<string>;
}

export interface QuestionChoiceUpsertWithWhereUniqueNestedInput {
  where: QuestionChoiceWhereUniqueInput;

  update: QuestionChoiceUpdateDataInput;

  create: QuestionChoiceCreateInput;
}

export interface QuestionChoiceScalarWhereInput {
  id: Maybe<string>;

  id_not: Maybe<string>;

  id_in: Maybe<string[]>;

  id_not_in: Maybe<string[]>;

  id_lt: Maybe<string>;

  id_lte: Maybe<string>;

  id_gt: Maybe<string>;

  id_gte: Maybe<string>;

  id_contains: Maybe<string>;

  id_not_contains: Maybe<string>;

  id_starts_with: Maybe<string>;

  id_not_starts_with: Maybe<string>;

  id_ends_with: Maybe<string>;

  id_not_ends_with: Maybe<string>;

  text: Maybe<string>;

  text_not: Maybe<string>;

  text_in: Maybe<string[]>;

  text_not_in: Maybe<string[]>;

  text_lt: Maybe<string>;

  text_lte: Maybe<string>;

  text_gt: Maybe<string>;

  text_gte: Maybe<string>;

  text_contains: Maybe<string>;

  text_not_contains: Maybe<string>;

  text_starts_with: Maybe<string>;

  text_not_starts_with: Maybe<string>;

  text_ends_with: Maybe<string>;

  text_not_ends_with: Maybe<string>;

  AND: Maybe<QuestionChoiceScalarWhereInput[]>;

  OR: Maybe<QuestionChoiceScalarWhereInput[]>;

  NOT: Maybe<QuestionChoiceScalarWhereInput[]>;
}

export interface QuestionChoiceUpdateManyWithWhereNestedInput {
  where: QuestionChoiceScalarWhereInput;

  data: QuestionChoiceUpdateManyDataInput;
}

export interface QuestionChoiceUpdateManyDataInput {
  text: Maybe<string>;
}

export enum QuestionType {
  MultipleChoice = 'MULTIPLE_CHOICE',
  OpenEnded = 'OPEN_ENDED',
}

export enum QuestionOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  WordingAsc = 'wording_ASC',
  WordingDesc = 'wording_DESC',
  ImageUrlAsc = 'imageUrl_ASC',
  ImageUrlDesc = 'imageUrl_DESC',
  SecondaryWordingAsc = 'secondaryWording_ASC',
  SecondaryWordingDesc = 'secondaryWording_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type DateTime = any;

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface Node {
  id: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  city: Maybe<City>;

  cities: City[];

  olympiad: Maybe<Olympiad>;

  olympiads: Olympiad[];

  olympiadsConnection: OlympiadConnection;

  question: Maybe<Question>;

  questions: Question[];

  questionsConnection: QuestionConnection;

  schools: School[];

  school: Maybe<School>;

  tests: Test[];

  test: Maybe<Test>;

  me: Maybe<User>;
}

export interface City {
  id: string;

  name: string;
}

export interface Olympiad {
  id: string;

  name: string;

  isPublished: Maybe<boolean>;

  year: DateTime;

  createdBy: User;

  createdAt: DateTime;

  updatedAt: DateTime;
}

export interface User extends Node {
  id: string;

  email: string;

  name: string;

  tests: Test[];
}

export interface Test {
  id: string;

  title: string;

  description: Maybe<string>;

  author: User;

  questions: Maybe<Question[]>;

  createdAt: DateTime;

  updatedAt: DateTime;
}

export interface Question extends Node {
  id: string;
  /** O tipo da questão, _múltipla escolha_ ou _discursiva_. */
  type: QuestionType;
  /** Enunciado da questão. */
  wording: string;

  imageUrl: Maybe<string>;

  imageFullUrl: Maybe<string>;
  /** Enunciado secundário, depois da imagem. */
  secondaryWording: Maybe<string>;
  /** Alternativas da questão. */
  choices: QuestionChoice[];
}

export interface QuestionChoice {
  id: string;

  text: string;
}

export interface OlympiadConnection {
  pageInfo: PageInfo;

  edges: (Maybe<OlympiadEdge>)[];

  aggregate: AggregateOlympiad;
}

export interface PageInfo {
  hasNextPage: boolean;

  hasPreviousPage: boolean;

  startCursor: Maybe<string>;

  endCursor: Maybe<string>;
}

export interface OlympiadEdge {
  node: Olympiad;

  cursor: string;
}

export interface AggregateOlympiad {
  count: number;
}

export interface QuestionConnection {
  pageInfo: PageInfo;

  edges: (Maybe<QuestionEdge>)[];

  aggregate: AggregateQuestion;
}

export interface QuestionEdge {
  node: Question;

  cursor: string;
}

export interface AggregateQuestion {
  count: number;
}

export interface School {
  id: string;

  name: string;

  email: string;

  phone: Maybe<string>;

  olympiadCood: User;

  pedagogyCoord: Maybe<string>;

  director: Maybe<string>;

  city: City;

  address: Maybe<string>;
}

export interface Mutation {
  signup: AuthPayload;

  login: AuthPayload;

  createCity: City;

  deleteCity: City;

  updateCity: City;

  createTest: Test;

  deleteTest: Test;

  createOlympiad: Olympiad;

  createQuestion: QuestionPayload;

  deleteQuestion: QuestionPayload;

  updateQuestion: QuestionPayload;

  createSchool: School;

  deleteOlympiad: Olympiad;

  deleteSchool: School;
}

export interface AuthPayload {
  token: string;

  user: User;
}

export interface QuestionPayload {
  question: Maybe<Question>;
}

// ====================================================
// Arguments
// ====================================================

export interface CityQueryArgs {
  id: string;
}
export interface OlympiadQueryArgs {
  id: string;
}
export interface OlympiadsConnectionQueryArgs {
  first: Maybe<number>;

  after: Maybe<string>;
}
export interface QuestionQueryArgs {
  id: string;
}
export interface QuestionsConnectionQueryArgs {
  where: Maybe<QuestionWhereInput>;

  orderBy: Maybe<QuestionOrderByInput>;

  skip: Maybe<number>;

  after: Maybe<string>;

  before: Maybe<string>;

  first: Maybe<number>;

  last: Maybe<number>;
}
export interface SchoolQueryArgs {
  id: string;
}
export interface TestQueryArgs {
  id: string;
}
export interface QuestionsTestArgs {
  where: Maybe<QuestionWhereInput>;

  orderBy: Maybe<QuestionOrderByInput>;

  skip: Maybe<number>;

  after: Maybe<string>;

  before: Maybe<string>;

  first: Maybe<number>;

  last: Maybe<number>;
}
export interface SignupMutationArgs {
  email: string;

  password: string;

  name: string;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
}
export interface CreateCityMutationArgs {
  name: string;
}
export interface DeleteCityMutationArgs {
  id: string;
}
export interface UpdateCityMutationArgs {
  id: string;

  name: string;
}
export interface CreateTestMutationArgs {
  title: string;

  description: string;
}
export interface DeleteTestMutationArgs {
  id: string;
}
export interface CreateOlympiadMutationArgs {
  name: string;

  year: DateTime;
}
export interface CreateQuestionMutationArgs {
  input: QuestionCreateInput;
}
export interface DeleteQuestionMutationArgs {
  id: string;
}
export interface UpdateQuestionMutationArgs {
  input: UpdateQuestionInput;
}
export interface CreateSchoolMutationArgs {
  name: string;

  email: string;

  phone: Maybe<string>;

  pedagogyCoord: Maybe<string>;

  director: Maybe<string>;

  city: string;

  address: Maybe<string>;
}
export interface DeleteOlympiadMutationArgs {
  id: string;
}
export interface DeleteSchoolMutationArgs {
  id: string;
}

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

import {
  City,
  Olympiad,
  OlympiadConnection,
  Question,
  QuestionConnection,
  School,
  Test,
  User,
} from './prisma-client';

import { OliContext } from '../utils';

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<Result, Parent = {}, Context = {}, Args = {}> =
  | ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo,
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = {}> {
    city?: CityResolver<Maybe<City>, TypeParent, Context>;

    cities?: CitiesResolver<City[], TypeParent, Context>;

    olympiad?: OlympiadResolver<Maybe<Olympiad>, TypeParent, Context>;

    olympiads?: OlympiadsResolver<Olympiad[], TypeParent, Context>;

    olympiadsConnection?: OlympiadsConnectionResolver<OlympiadConnection, TypeParent, Context>;

    question?: QuestionResolver<Maybe<Question>, TypeParent, Context>;

    questions?: QuestionsResolver<Question[], TypeParent, Context>;

    questionsConnection?: QuestionsConnectionResolver<QuestionConnection, TypeParent, Context>;

    schools?: SchoolsResolver<School[], TypeParent, Context>;

    school?: SchoolResolver<Maybe<School>, TypeParent, Context>;

    tests?: TestsResolver<Test[], TypeParent, Context>;

    test?: TestResolver<Maybe<Test>, TypeParent, Context>;

    me?: MeResolver<Maybe<User>, TypeParent, Context>;
  }

  export type CityResolver<R = Maybe<City>, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    CityArgs
  >;
  export interface CityArgs {
    id: string;
  }

  export type CitiesResolver<R = City[], Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OlympiadResolver<R = Maybe<Olympiad>, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    OlympiadArgs
  >;
  export interface OlympiadArgs {
    id: string;
  }

  export type OlympiadsResolver<R = Olympiad[], Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OlympiadsConnectionResolver<
    R = OlympiadConnection,
    Parent = {},
    Context = OliContext
  > = Resolver<R, Parent, Context, OlympiadsConnectionArgs>;
  export interface OlympiadsConnectionArgs {
    first: Maybe<number>;

    after: Maybe<string>;
  }

  export type QuestionResolver<R = Maybe<Question>, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    QuestionArgs
  >;
  export interface QuestionArgs {
    id: string;
  }

  export type QuestionsResolver<R = Question[], Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type QuestionsConnectionResolver<
    R = QuestionConnection,
    Parent = {},
    Context = OliContext
  > = Resolver<R, Parent, Context, QuestionsConnectionArgs>;
  export interface QuestionsConnectionArgs {
    where: Maybe<QuestionWhereInput>;

    orderBy: Maybe<QuestionOrderByInput>;

    skip: Maybe<number>;

    after: Maybe<string>;

    before: Maybe<string>;

    first: Maybe<number>;

    last: Maybe<number>;
  }

  export type SchoolsResolver<R = School[], Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SchoolResolver<R = Maybe<School>, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    SchoolArgs
  >;
  export interface SchoolArgs {
    id: string;
  }

  export type TestsResolver<R = Test[], Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TestResolver<R = Maybe<Test>, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    TestArgs
  >;
  export interface TestArgs {
    id: string;
  }

  export type MeResolver<R = Maybe<User>, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace CityResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = City> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = City, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = City, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace OlympiadResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = Olympiad> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    isPublished?: IsPublishedResolver<Maybe<boolean>, TypeParent, Context>;

    year?: YearResolver<DateTime, TypeParent, Context>;

    createdBy?: CreatedByResolver<User, TypeParent, Context>;

    createdAt?: CreatedAtResolver<DateTime, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<DateTime, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Olympiad, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = Olympiad, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type IsPublishedResolver<
    R = Maybe<boolean>,
    Parent = Olympiad,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type YearResolver<R = DateTime, Parent = Olympiad, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CreatedByResolver<R = User, Parent = Olympiad, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CreatedAtResolver<R = DateTime, Parent = Olympiad, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UpdatedAtResolver<R = DateTime, Parent = Olympiad, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UserResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    tests?: TestsResolver<Test[], TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = User, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type EmailResolver<R = string, Parent = User, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = User, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TestsResolver<R = Test[], Parent = User, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace TestResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = Test> {
    id?: IdResolver<string, TypeParent, Context>;

    title?: TitleResolver<string, TypeParent, Context>;

    description?: DescriptionResolver<Maybe<string>, TypeParent, Context>;

    author?: AuthorResolver<User, TypeParent, Context>;

    questions?: QuestionsResolver<Maybe<Question[]>, TypeParent, Context>;

    createdAt?: CreatedAtResolver<DateTime, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<DateTime, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Test, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TitleResolver<R = string, Parent = Test, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DescriptionResolver<
    R = Maybe<string>,
    Parent = Test,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type AuthorResolver<R = User, Parent = Test, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type QuestionsResolver<
    R = Maybe<Question[]>,
    Parent = Test,
    Context = OliContext
  > = Resolver<R, Parent, Context, QuestionsArgs>;
  export interface QuestionsArgs {
    where: Maybe<QuestionWhereInput>;

    orderBy: Maybe<QuestionOrderByInput>;

    skip: Maybe<number>;

    after: Maybe<string>;

    before: Maybe<string>;

    first: Maybe<number>;

    last: Maybe<number>;
  }

  export type CreatedAtResolver<R = DateTime, Parent = Test, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UpdatedAtResolver<R = DateTime, Parent = Test, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace QuestionResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = Question> {
    id?: IdResolver<string, TypeParent, Context>;
    /** O tipo da questão, _múltipla escolha_ ou _discursiva_. */
    type?: TypeResolver<QuestionType, TypeParent, Context>;
    /** Enunciado da questão. */
    wording?: WordingResolver<string, TypeParent, Context>;

    imageUrl?: ImageUrlResolver<Maybe<string>, TypeParent, Context>;

    imageFullUrl?: ImageFullUrlResolver<Maybe<string>, TypeParent, Context>;
    /** Enunciado secundário, depois da imagem. */
    secondaryWording?: SecondaryWordingResolver<Maybe<string>, TypeParent, Context>;
    /** Alternativas da questão. */
    choices?: ChoicesResolver<QuestionChoice[], TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Question, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TypeResolver<R = QuestionType, Parent = Question, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type WordingResolver<R = string, Parent = Question, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ImageUrlResolver<
    R = Maybe<string>,
    Parent = Question,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type ImageFullUrlResolver<
    R = Maybe<string>,
    Parent = Question,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type SecondaryWordingResolver<
    R = Maybe<string>,
    Parent = Question,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type ChoicesResolver<
    R = QuestionChoice[],
    Parent = Question,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
}

export namespace QuestionChoiceResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = QuestionChoice> {
    id?: IdResolver<string, TypeParent, Context>;

    text?: TextResolver<string, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = QuestionChoice, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TextResolver<R = string, Parent = QuestionChoice, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace OlympiadConnectionResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = OlympiadConnection> {
    pageInfo?: PageInfoResolver<PageInfo, TypeParent, Context>;

    edges?: EdgesResolver<(Maybe<OlympiadEdge>)[], TypeParent, Context>;

    aggregate?: AggregateResolver<AggregateOlympiad, TypeParent, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = OlympiadConnection,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (Maybe<OlympiadEdge>)[],
    Parent = OlympiadConnection,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateOlympiad,
    Parent = OlympiadConnection,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
}

export namespace PageInfoResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = PageInfo> {
    hasNextPage?: HasNextPageResolver<boolean, TypeParent, Context>;

    hasPreviousPage?: HasPreviousPageResolver<boolean, TypeParent, Context>;

    startCursor?: StartCursorResolver<Maybe<string>, TypeParent, Context>;

    endCursor?: EndCursorResolver<Maybe<string>, TypeParent, Context>;
  }

  export type HasNextPageResolver<R = boolean, Parent = PageInfo, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type HasPreviousPageResolver<
    R = boolean,
    Parent = PageInfo,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type StartCursorResolver<
    R = Maybe<string>,
    Parent = PageInfo,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type EndCursorResolver<
    R = Maybe<string>,
    Parent = PageInfo,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
}

export namespace OlympiadEdgeResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = OlympiadEdge> {
    node?: NodeResolver<Olympiad, TypeParent, Context>;

    cursor?: CursorResolver<string, TypeParent, Context>;
  }

  export type NodeResolver<R = Olympiad, Parent = OlympiadEdge, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CursorResolver<R = string, Parent = OlympiadEdge, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace AggregateOlympiadResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = AggregateOlympiad> {
    count?: CountResolver<number, TypeParent, Context>;
  }

  export type CountResolver<
    R = number,
    Parent = AggregateOlympiad,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
}

export namespace QuestionConnectionResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = QuestionConnection> {
    pageInfo?: PageInfoResolver<PageInfo, TypeParent, Context>;

    edges?: EdgesResolver<(Maybe<QuestionEdge>)[], TypeParent, Context>;

    aggregate?: AggregateResolver<AggregateQuestion, TypeParent, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = QuestionConnection,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (Maybe<QuestionEdge>)[],
    Parent = QuestionConnection,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type AggregateResolver<
    R = AggregateQuestion,
    Parent = QuestionConnection,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
}

export namespace QuestionEdgeResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = QuestionEdge> {
    node?: NodeResolver<Question, TypeParent, Context>;

    cursor?: CursorResolver<string, TypeParent, Context>;
  }

  export type NodeResolver<R = Question, Parent = QuestionEdge, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CursorResolver<R = string, Parent = QuestionEdge, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace AggregateQuestionResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = AggregateQuestion> {
    count?: CountResolver<number, TypeParent, Context>;
  }

  export type CountResolver<
    R = number,
    Parent = AggregateQuestion,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
}

export namespace SchoolResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = School> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    phone?: PhoneResolver<Maybe<string>, TypeParent, Context>;

    olympiadCood?: OlympiadCoodResolver<User, TypeParent, Context>;

    pedagogyCoord?: PedagogyCoordResolver<Maybe<string>, TypeParent, Context>;

    director?: DirectorResolver<Maybe<string>, TypeParent, Context>;

    city?: CityResolver<City, TypeParent, Context>;

    address?: AddressResolver<Maybe<string>, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type EmailResolver<R = string, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PhoneResolver<R = Maybe<string>, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OlympiadCoodResolver<R = User, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PedagogyCoordResolver<
    R = Maybe<string>,
    Parent = School,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
  export type DirectorResolver<R = Maybe<string>, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CityResolver<R = City, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AddressResolver<R = Maybe<string>, Parent = School, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = {}> {
    signup?: SignupResolver<AuthPayload, TypeParent, Context>;

    login?: LoginResolver<AuthPayload, TypeParent, Context>;

    createCity?: CreateCityResolver<City, TypeParent, Context>;

    deleteCity?: DeleteCityResolver<City, TypeParent, Context>;

    updateCity?: UpdateCityResolver<City, TypeParent, Context>;

    createTest?: CreateTestResolver<Test, TypeParent, Context>;

    deleteTest?: DeleteTestResolver<Test, TypeParent, Context>;

    createOlympiad?: CreateOlympiadResolver<Olympiad, TypeParent, Context>;

    createQuestion?: CreateQuestionResolver<QuestionPayload, TypeParent, Context>;

    deleteQuestion?: DeleteQuestionResolver<QuestionPayload, TypeParent, Context>;

    updateQuestion?: UpdateQuestionResolver<QuestionPayload, TypeParent, Context>;

    createSchool?: CreateSchoolResolver<School, TypeParent, Context>;

    deleteOlympiad?: DeleteOlympiadResolver<Olympiad, TypeParent, Context>;

    deleteSchool?: DeleteSchoolResolver<School, TypeParent, Context>;
  }

  export type SignupResolver<R = AuthPayload, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    SignupArgs
  >;
  export interface SignupArgs {
    email: string;

    password: string;

    name: string;
  }

  export type LoginResolver<R = AuthPayload, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    LoginArgs
  >;
  export interface LoginArgs {
    email: string;

    password: string;
  }

  export type CreateCityResolver<R = City, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    CreateCityArgs
  >;
  export interface CreateCityArgs {
    name: string;
  }

  export type DeleteCityResolver<R = City, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    DeleteCityArgs
  >;
  export interface DeleteCityArgs {
    id: string;
  }

  export type UpdateCityResolver<R = City, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    UpdateCityArgs
  >;
  export interface UpdateCityArgs {
    id: string;

    name: string;
  }

  export type CreateTestResolver<R = Test, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    CreateTestArgs
  >;
  export interface CreateTestArgs {
    title: string;

    description: string;
  }

  export type DeleteTestResolver<R = Test, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    DeleteTestArgs
  >;
  export interface DeleteTestArgs {
    id: string;
  }

  export type CreateOlympiadResolver<R = Olympiad, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    CreateOlympiadArgs
  >;
  export interface CreateOlympiadArgs {
    name: string;

    year: DateTime;
  }

  export type CreateQuestionResolver<
    R = QuestionPayload,
    Parent = {},
    Context = OliContext
  > = Resolver<R, Parent, Context, CreateQuestionArgs>;
  export interface CreateQuestionArgs {
    input: QuestionCreateInput;
  }

  export type DeleteQuestionResolver<
    R = QuestionPayload,
    Parent = {},
    Context = OliContext
  > = Resolver<R, Parent, Context, DeleteQuestionArgs>;
  export interface DeleteQuestionArgs {
    id: string;
  }

  export type UpdateQuestionResolver<
    R = QuestionPayload,
    Parent = {},
    Context = OliContext
  > = Resolver<R, Parent, Context, UpdateQuestionArgs>;
  export interface UpdateQuestionArgs {
    input: UpdateQuestionInput;
  }

  export type CreateSchoolResolver<R = School, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    CreateSchoolArgs
  >;
  export interface CreateSchoolArgs {
    name: string;

    email: string;

    phone: Maybe<string>;

    pedagogyCoord: Maybe<string>;

    director: Maybe<string>;

    city: string;

    address: Maybe<string>;
  }

  export type DeleteOlympiadResolver<R = Olympiad, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    DeleteOlympiadArgs
  >;
  export interface DeleteOlympiadArgs {
    id: string;
  }

  export type DeleteSchoolResolver<R = School, Parent = {}, Context = OliContext> = Resolver<
    R,
    Parent,
    Context,
    DeleteSchoolArgs
  >;
  export interface DeleteSchoolArgs {
    id: string;
  }
}

export namespace AuthPayloadResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = AuthPayload> {
    token?: TokenResolver<string, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;
  }

  export type TokenResolver<R = string, Parent = AuthPayload, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UserResolver<R = User, Parent = AuthPayload, Context = OliContext> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace QuestionPayloadResolvers {
  export interface Resolvers<Context = OliContext, TypeParent = QuestionPayload> {
    question?: QuestionResolver<Maybe<Question>, TypeParent, Context>;
  }

  export type QuestionResolver<
    R = Maybe<Question>,
    Parent = QuestionPayload,
    Context = OliContext
  > = Resolver<R, Parent, Context>;
}

export namespace NodeResolvers {
  export interface Resolvers {
    __resolveType: ResolveType;
  }
  export type ResolveType<
    R = 'User' | 'Question',
    Parent = User | Question,
    Context = OliContext
  > = TypeResolveFn<R, Parent, Context>;
}

export type CacheControlDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  CacheControlDirectiveArgs,
  OliContext
>;
export interface CacheControlDirectiveArgs {
  maxAge: Maybe<number>;

  scope: Maybe<CacheControlScope>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  OliContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  OliContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  OliContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason: string;
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<DateTime, any> {
  name: 'DateTime';
}
export interface UploadScalarConfig extends GraphQLScalarTypeConfig<Upload, any> {
  name: 'Upload';
}

export interface IResolvers {
  Query?: QueryResolvers.Resolvers;
  City?: CityResolvers.Resolvers;
  Olympiad?: OlympiadResolvers.Resolvers;
  User?: UserResolvers.Resolvers;
  Test?: TestResolvers.Resolvers;
  Question?: QuestionResolvers.Resolvers;
  QuestionChoice?: QuestionChoiceResolvers.Resolvers;
  OlympiadConnection?: OlympiadConnectionResolvers.Resolvers;
  PageInfo?: PageInfoResolvers.Resolvers;
  OlympiadEdge?: OlympiadEdgeResolvers.Resolvers;
  AggregateOlympiad?: AggregateOlympiadResolvers.Resolvers;
  QuestionConnection?: QuestionConnectionResolvers.Resolvers;
  QuestionEdge?: QuestionEdgeResolvers.Resolvers;
  AggregateQuestion?: AggregateQuestionResolvers.Resolvers;
  School?: SchoolResolvers.Resolvers;
  Mutation?: MutationResolvers.Resolvers;
  AuthPayload?: AuthPayloadResolvers.Resolvers;
  QuestionPayload?: QuestionPayloadResolvers.Resolvers;
  Node?: NodeResolvers.Resolvers;
  DateTime?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  cacheControl?: CacheControlDirectiveResolver<Result>;
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}