export const typeDefs = /* GraphQL */ `type AggregateCity {
  count: Int!
}

type AggregateOlympiad {
  count: Int!
}

type AggregateQuestion {
  count: Int!
}

type AggregateQuestionChoice {
  count: Int!
}

type AggregateSchool {
  count: Int!
}

type AggregateTest {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type City {
  id: ID!
  name: String!
}

type CityConnection {
  pageInfo: PageInfo!
  edges: [CityEdge]!
  aggregate: AggregateCity!
}

input CityCreateInput {
  name: String!
}

input CityCreateOneInput {
  create: CityCreateInput
  connect: CityWhereUniqueInput
}

type CityEdge {
  node: City!
  cursor: String!
}

enum CityOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CityPreviousValues {
  id: ID!
  name: String!
}

type CitySubscriptionPayload {
  mutation: MutationType!
  node: City
  updatedFields: [String!]
  previousValues: CityPreviousValues
}

input CitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CityWhereInput
  AND: [CitySubscriptionWhereInput!]
  OR: [CitySubscriptionWhereInput!]
  NOT: [CitySubscriptionWhereInput!]
}

input CityUpdateDataInput {
  name: String
}

input CityUpdateInput {
  name: String
}

input CityUpdateManyMutationInput {
  name: String
}

input CityUpdateOneRequiredInput {
  create: CityCreateInput
  update: CityUpdateDataInput
  upsert: CityUpsertNestedInput
  connect: CityWhereUniqueInput
}

input CityUpsertNestedInput {
  update: CityUpdateDataInput!
  create: CityCreateInput!
}

input CityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [CityWhereInput!]
  OR: [CityWhereInput!]
  NOT: [CityWhereInput!]
}

input CityWhereUniqueInput {
  id: ID
  name: String
}

scalar DateTime

scalar Long

type Mutation {
  createCity(data: CityCreateInput!): City!
  updateCity(data: CityUpdateInput!, where: CityWhereUniqueInput!): City
  updateManyCities(data: CityUpdateManyMutationInput!, where: CityWhereInput): BatchPayload!
  upsertCity(where: CityWhereUniqueInput!, create: CityCreateInput!, update: CityUpdateInput!): City!
  deleteCity(where: CityWhereUniqueInput!): City
  deleteManyCities(where: CityWhereInput): BatchPayload!
  createOlympiad(data: OlympiadCreateInput!): Olympiad!
  updateOlympiad(data: OlympiadUpdateInput!, where: OlympiadWhereUniqueInput!): Olympiad
  updateManyOlympiads(data: OlympiadUpdateManyMutationInput!, where: OlympiadWhereInput): BatchPayload!
  upsertOlympiad(where: OlympiadWhereUniqueInput!, create: OlympiadCreateInput!, update: OlympiadUpdateInput!): Olympiad!
  deleteOlympiad(where: OlympiadWhereUniqueInput!): Olympiad
  deleteManyOlympiads(where: OlympiadWhereInput): BatchPayload!
  createQuestion(data: QuestionCreateInput!): Question!
  updateQuestion(data: QuestionUpdateInput!, where: QuestionWhereUniqueInput!): Question
  updateManyQuestions(data: QuestionUpdateManyMutationInput!, where: QuestionWhereInput): BatchPayload!
  upsertQuestion(where: QuestionWhereUniqueInput!, create: QuestionCreateInput!, update: QuestionUpdateInput!): Question!
  deleteQuestion(where: QuestionWhereUniqueInput!): Question
  deleteManyQuestions(where: QuestionWhereInput): BatchPayload!
  createQuestionChoice(data: QuestionChoiceCreateInput!): QuestionChoice!
  updateQuestionChoice(data: QuestionChoiceUpdateInput!, where: QuestionChoiceWhereUniqueInput!): QuestionChoice
  updateManyQuestionChoices(data: QuestionChoiceUpdateManyMutationInput!, where: QuestionChoiceWhereInput): BatchPayload!
  upsertQuestionChoice(where: QuestionChoiceWhereUniqueInput!, create: QuestionChoiceCreateInput!, update: QuestionChoiceUpdateInput!): QuestionChoice!
  deleteQuestionChoice(where: QuestionChoiceWhereUniqueInput!): QuestionChoice
  deleteManyQuestionChoices(where: QuestionChoiceWhereInput): BatchPayload!
  createSchool(data: SchoolCreateInput!): School!
  updateSchool(data: SchoolUpdateInput!, where: SchoolWhereUniqueInput!): School
  updateManySchools(data: SchoolUpdateManyMutationInput!, where: SchoolWhereInput): BatchPayload!
  upsertSchool(where: SchoolWhereUniqueInput!, create: SchoolCreateInput!, update: SchoolUpdateInput!): School!
  deleteSchool(where: SchoolWhereUniqueInput!): School
  deleteManySchools(where: SchoolWhereInput): BatchPayload!
  createTest(data: TestCreateInput!): Test!
  updateTest(data: TestUpdateInput!, where: TestWhereUniqueInput!): Test
  updateManyTests(data: TestUpdateManyMutationInput!, where: TestWhereInput): BatchPayload!
  upsertTest(where: TestWhereUniqueInput!, create: TestCreateInput!, update: TestUpdateInput!): Test!
  deleteTest(where: TestWhereUniqueInput!): Test
  deleteManyTests(where: TestWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Olympiad {
  id: ID!
  name: String!
  isPublished: Boolean
  year: DateTime!
  createdBy: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OlympiadConnection {
  pageInfo: PageInfo!
  edges: [OlympiadEdge]!
  aggregate: AggregateOlympiad!
}

input OlympiadCreateInput {
  name: String!
  isPublished: Boolean
  year: DateTime!
  createdBy: UserCreateOneInput!
}

type OlympiadEdge {
  node: Olympiad!
  cursor: String!
}

enum OlympiadOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  isPublished_ASC
  isPublished_DESC
  year_ASC
  year_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OlympiadPreviousValues {
  id: ID!
  name: String!
  isPublished: Boolean
  year: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OlympiadSubscriptionPayload {
  mutation: MutationType!
  node: Olympiad
  updatedFields: [String!]
  previousValues: OlympiadPreviousValues
}

input OlympiadSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OlympiadWhereInput
  AND: [OlympiadSubscriptionWhereInput!]
  OR: [OlympiadSubscriptionWhereInput!]
  NOT: [OlympiadSubscriptionWhereInput!]
}

input OlympiadUpdateInput {
  name: String
  isPublished: Boolean
  year: DateTime
  createdBy: UserUpdateOneRequiredInput
}

input OlympiadUpdateManyMutationInput {
  name: String
  isPublished: Boolean
  year: DateTime
}

input OlympiadWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  isPublished: Boolean
  isPublished_not: Boolean
  year: DateTime
  year_not: DateTime
  year_in: [DateTime!]
  year_not_in: [DateTime!]
  year_lt: DateTime
  year_lte: DateTime
  year_gt: DateTime
  year_gte: DateTime
  createdBy: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [OlympiadWhereInput!]
  OR: [OlympiadWhereInput!]
  NOT: [OlympiadWhereInput!]
}

input OlympiadWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  city(where: CityWhereUniqueInput!): City
  cities(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [City]!
  citiesConnection(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CityConnection!
  olympiad(where: OlympiadWhereUniqueInput!): Olympiad
  olympiads(where: OlympiadWhereInput, orderBy: OlympiadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Olympiad]!
  olympiadsConnection(where: OlympiadWhereInput, orderBy: OlympiadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OlympiadConnection!
  question(where: QuestionWhereUniqueInput!): Question
  questions(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question]!
  questionsConnection(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionConnection!
  questionChoice(where: QuestionChoiceWhereUniqueInput!): QuestionChoice
  questionChoices(where: QuestionChoiceWhereInput, orderBy: QuestionChoiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [QuestionChoice]!
  questionChoicesConnection(where: QuestionChoiceWhereInput, orderBy: QuestionChoiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionChoiceConnection!
  school(where: SchoolWhereUniqueInput!): School
  schools(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [School]!
  schoolsConnection(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SchoolConnection!
  test(where: TestWhereUniqueInput!): Test
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test]!
  testsConnection(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TestConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Question {
  id: ID!
  type: QUESTION_TYPE!
  wording: String!
  imageUrl: String
  secondaryWording: String
  choices(where: QuestionChoiceWhereInput, orderBy: QuestionChoiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [QuestionChoice!]
}

enum QUESTION_TYPE {
  MULTIPLE_CHOICE
  OPEN_ENDED
}

type QuestionChoice {
  id: ID!
  text: String!
}

type QuestionChoiceConnection {
  pageInfo: PageInfo!
  edges: [QuestionChoiceEdge]!
  aggregate: AggregateQuestionChoice!
}

input QuestionChoiceCreateInput {
  text: String!
}

input QuestionChoiceCreateManyInput {
  create: [QuestionChoiceCreateInput!]
  connect: [QuestionChoiceWhereUniqueInput!]
}

type QuestionChoiceEdge {
  node: QuestionChoice!
  cursor: String!
}

enum QuestionChoiceOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type QuestionChoicePreviousValues {
  id: ID!
  text: String!
}

type QuestionChoiceSubscriptionPayload {
  mutation: MutationType!
  node: QuestionChoice
  updatedFields: [String!]
  previousValues: QuestionChoicePreviousValues
}

input QuestionChoiceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: QuestionChoiceWhereInput
  AND: [QuestionChoiceSubscriptionWhereInput!]
  OR: [QuestionChoiceSubscriptionWhereInput!]
  NOT: [QuestionChoiceSubscriptionWhereInput!]
}

input QuestionChoiceUpdateDataInput {
  text: String
}

input QuestionChoiceUpdateInput {
  text: String
}

input QuestionChoiceUpdateManyInput {
  create: [QuestionChoiceCreateInput!]
  update: [QuestionChoiceUpdateWithWhereUniqueNestedInput!]
  upsert: [QuestionChoiceUpsertWithWhereUniqueNestedInput!]
  delete: [QuestionChoiceWhereUniqueInput!]
  connect: [QuestionChoiceWhereUniqueInput!]
  disconnect: [QuestionChoiceWhereUniqueInput!]
}

input QuestionChoiceUpdateManyMutationInput {
  text: String
}

input QuestionChoiceUpdateWithWhereUniqueNestedInput {
  where: QuestionChoiceWhereUniqueInput!
  data: QuestionChoiceUpdateDataInput!
}

input QuestionChoiceUpsertWithWhereUniqueNestedInput {
  where: QuestionChoiceWhereUniqueInput!
  update: QuestionChoiceUpdateDataInput!
  create: QuestionChoiceCreateInput!
}

input QuestionChoiceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [QuestionChoiceWhereInput!]
  OR: [QuestionChoiceWhereInput!]
  NOT: [QuestionChoiceWhereInput!]
}

input QuestionChoiceWhereUniqueInput {
  id: ID
}

type QuestionConnection {
  pageInfo: PageInfo!
  edges: [QuestionEdge]!
  aggregate: AggregateQuestion!
}

input QuestionCreateInput {
  type: QUESTION_TYPE!
  wording: String!
  imageUrl: String
  secondaryWording: String
  choices: QuestionChoiceCreateManyInput
}

type QuestionEdge {
  node: Question!
  cursor: String!
}

enum QuestionOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  wording_ASC
  wording_DESC
  imageUrl_ASC
  imageUrl_DESC
  secondaryWording_ASC
  secondaryWording_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type QuestionPreviousValues {
  id: ID!
  type: QUESTION_TYPE!
  wording: String!
  imageUrl: String
  secondaryWording: String
}

type QuestionSubscriptionPayload {
  mutation: MutationType!
  node: Question
  updatedFields: [String!]
  previousValues: QuestionPreviousValues
}

input QuestionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: QuestionWhereInput
  AND: [QuestionSubscriptionWhereInput!]
  OR: [QuestionSubscriptionWhereInput!]
  NOT: [QuestionSubscriptionWhereInput!]
}

input QuestionUpdateInput {
  type: QUESTION_TYPE
  wording: String
  imageUrl: String
  secondaryWording: String
  choices: QuestionChoiceUpdateManyInput
}

input QuestionUpdateManyMutationInput {
  type: QUESTION_TYPE
  wording: String
  imageUrl: String
  secondaryWording: String
}

input QuestionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: QUESTION_TYPE
  type_not: QUESTION_TYPE
  type_in: [QUESTION_TYPE!]
  type_not_in: [QUESTION_TYPE!]
  wording: String
  wording_not: String
  wording_in: [String!]
  wording_not_in: [String!]
  wording_lt: String
  wording_lte: String
  wording_gt: String
  wording_gte: String
  wording_contains: String
  wording_not_contains: String
  wording_starts_with: String
  wording_not_starts_with: String
  wording_ends_with: String
  wording_not_ends_with: String
  imageUrl: String
  imageUrl_not: String
  imageUrl_in: [String!]
  imageUrl_not_in: [String!]
  imageUrl_lt: String
  imageUrl_lte: String
  imageUrl_gt: String
  imageUrl_gte: String
  imageUrl_contains: String
  imageUrl_not_contains: String
  imageUrl_starts_with: String
  imageUrl_not_starts_with: String
  imageUrl_ends_with: String
  imageUrl_not_ends_with: String
  secondaryWording: String
  secondaryWording_not: String
  secondaryWording_in: [String!]
  secondaryWording_not_in: [String!]
  secondaryWording_lt: String
  secondaryWording_lte: String
  secondaryWording_gt: String
  secondaryWording_gte: String
  secondaryWording_contains: String
  secondaryWording_not_contains: String
  secondaryWording_starts_with: String
  secondaryWording_not_starts_with: String
  secondaryWording_ends_with: String
  secondaryWording_not_ends_with: String
  choices_every: QuestionChoiceWhereInput
  choices_some: QuestionChoiceWhereInput
  choices_none: QuestionChoiceWhereInput
  AND: [QuestionWhereInput!]
  OR: [QuestionWhereInput!]
  NOT: [QuestionWhereInput!]
}

input QuestionWhereUniqueInput {
  id: ID
}

type School {
  id: ID!
  name: String!
  email: String!
  phone: String
  olympiadCood: User!
  pedagogyCoord: String
  director: String
  city: City!
  address: String
}

type SchoolConnection {
  pageInfo: PageInfo!
  edges: [SchoolEdge]!
  aggregate: AggregateSchool!
}

input SchoolCreateInput {
  name: String!
  email: String!
  phone: String
  olympiadCood: UserCreateOneInput!
  pedagogyCoord: String
  director: String
  city: CityCreateOneInput!
  address: String
}

type SchoolEdge {
  node: School!
  cursor: String!
}

enum SchoolOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  phone_ASC
  phone_DESC
  pedagogyCoord_ASC
  pedagogyCoord_DESC
  director_ASC
  director_DESC
  address_ASC
  address_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SchoolPreviousValues {
  id: ID!
  name: String!
  email: String!
  phone: String
  pedagogyCoord: String
  director: String
  address: String
}

type SchoolSubscriptionPayload {
  mutation: MutationType!
  node: School
  updatedFields: [String!]
  previousValues: SchoolPreviousValues
}

input SchoolSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SchoolWhereInput
  AND: [SchoolSubscriptionWhereInput!]
  OR: [SchoolSubscriptionWhereInput!]
  NOT: [SchoolSubscriptionWhereInput!]
}

input SchoolUpdateInput {
  name: String
  email: String
  phone: String
  olympiadCood: UserUpdateOneRequiredInput
  pedagogyCoord: String
  director: String
  city: CityUpdateOneRequiredInput
  address: String
}

input SchoolUpdateManyMutationInput {
  name: String
  email: String
  phone: String
  pedagogyCoord: String
  director: String
  address: String
}

input SchoolWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  olympiadCood: UserWhereInput
  pedagogyCoord: String
  pedagogyCoord_not: String
  pedagogyCoord_in: [String!]
  pedagogyCoord_not_in: [String!]
  pedagogyCoord_lt: String
  pedagogyCoord_lte: String
  pedagogyCoord_gt: String
  pedagogyCoord_gte: String
  pedagogyCoord_contains: String
  pedagogyCoord_not_contains: String
  pedagogyCoord_starts_with: String
  pedagogyCoord_not_starts_with: String
  pedagogyCoord_ends_with: String
  pedagogyCoord_not_ends_with: String
  director: String
  director_not: String
  director_in: [String!]
  director_not_in: [String!]
  director_lt: String
  director_lte: String
  director_gt: String
  director_gte: String
  director_contains: String
  director_not_contains: String
  director_starts_with: String
  director_not_starts_with: String
  director_ends_with: String
  director_not_ends_with: String
  city: CityWhereInput
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  AND: [SchoolWhereInput!]
  OR: [SchoolWhereInput!]
  NOT: [SchoolWhereInput!]
}

input SchoolWhereUniqueInput {
  id: ID
  email: String
}

type Subscription {
  city(where: CitySubscriptionWhereInput): CitySubscriptionPayload
  olympiad(where: OlympiadSubscriptionWhereInput): OlympiadSubscriptionPayload
  question(where: QuestionSubscriptionWhereInput): QuestionSubscriptionPayload
  questionChoice(where: QuestionChoiceSubscriptionWhereInput): QuestionChoiceSubscriptionPayload
  school(where: SchoolSubscriptionWhereInput): SchoolSubscriptionPayload
  test(where: TestSubscriptionWhereInput): TestSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Test {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  description: String!
  author: User!
}

type TestConnection {
  pageInfo: PageInfo!
  edges: [TestEdge]!
  aggregate: AggregateTest!
}

input TestCreateInput {
  title: String!
  description: String!
  author: UserCreateOneWithoutTestsInput!
}

input TestCreateManyWithoutAuthorInput {
  create: [TestCreateWithoutAuthorInput!]
  connect: [TestWhereUniqueInput!]
}

input TestCreateWithoutAuthorInput {
  title: String!
  description: String!
}

type TestEdge {
  node: Test!
  cursor: String!
}

enum TestOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
}

type TestPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  description: String!
}

type TestSubscriptionPayload {
  mutation: MutationType!
  node: Test
  updatedFields: [String!]
  previousValues: TestPreviousValues
}

input TestSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TestWhereInput
  AND: [TestSubscriptionWhereInput!]
  OR: [TestSubscriptionWhereInput!]
  NOT: [TestSubscriptionWhereInput!]
}

input TestUpdateInput {
  title: String
  description: String
  author: UserUpdateOneRequiredWithoutTestsInput
}

input TestUpdateManyMutationInput {
  title: String
  description: String
}

input TestUpdateManyWithoutAuthorInput {
  create: [TestCreateWithoutAuthorInput!]
  delete: [TestWhereUniqueInput!]
  connect: [TestWhereUniqueInput!]
  disconnect: [TestWhereUniqueInput!]
  update: [TestUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [TestUpsertWithWhereUniqueWithoutAuthorInput!]
}

input TestUpdateWithoutAuthorDataInput {
  title: String
  description: String
}

input TestUpdateWithWhereUniqueWithoutAuthorInput {
  where: TestWhereUniqueInput!
  data: TestUpdateWithoutAuthorDataInput!
}

input TestUpsertWithWhereUniqueWithoutAuthorInput {
  where: TestWhereUniqueInput!
  update: TestUpdateWithoutAuthorDataInput!
  create: TestCreateWithoutAuthorInput!
}

input TestWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  author: UserWhereInput
  AND: [TestWhereInput!]
  OR: [TestWhereInput!]
  NOT: [TestWhereInput!]
}

input TestWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  email: String!
  password: String!
  name: String!
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String!
  tests: TestCreateManyWithoutAuthorInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTestsInput {
  create: UserCreateWithoutTestsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTestsInput {
  email: String!
  password: String!
  name: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  password: String
  name: String
  tests: TestUpdateManyWithoutAuthorInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  tests: TestUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  name: String
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutTestsInput {
  create: UserCreateWithoutTestsInput
  update: UserUpdateWithoutTestsDataInput
  upsert: UserUpsertWithoutTestsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTestsDataInput {
  email: String
  password: String
  name: String
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutTestsInput {
  update: UserUpdateWithoutTestsDataInput!
  create: UserCreateWithoutTestsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  tests_every: TestWhereInput
  tests_some: TestWhereInput
  tests_none: TestWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`