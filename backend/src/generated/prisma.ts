import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type AggregateCity {
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
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

type City implements Node {
  id: ID!
  name: String!
}

"""
A connection to a list of items.
"""
type CityConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
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

"""
An edge in a connection.
"""
type CityEdge {
  """
  The item at the end of the edge.
  """
  node: City!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum CityOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """
  Logical AND on all given filters.
  """
  AND: [CitySubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CitySubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [CitySubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CityWhereInput
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
  connect: CityWhereUniqueInput
  update: CityUpdateDataInput
  upsert: CityUpsertNestedInput
}

input CityUpsertNestedInput {
  update: CityUpdateDataInput!
  create: CityCreateInput!
}

input CityWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CityWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CityWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [CityWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
}

input CityWhereUniqueInput {
  id: ID
  name: String
}

scalar DateTime

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

type Olympiad implements Node {
  id: ID!
  name: String!
  isPublished: Boolean
  year: DateTime!
  createdBy: User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type OlympiadConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [OlympiadEdge]!
  aggregate: AggregateOlympiad!
}

input OlympiadCreateInput {
  name: String!
  isPublished: Boolean
  year: DateTime!
  createdBy: UserCreateOneInput!
}

"""
An edge in a connection.
"""
type OlympiadEdge {
  """
  The item at the end of the edge.
  """
  node: Olympiad!
  """
  A cursor for use in pagination.
  """
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
  """
  Logical AND on all given filters.
  """
  AND: [OlympiadSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OlympiadSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OlympiadSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: OlympiadWhereInput
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
  """
  Logical AND on all given filters.
  """
  AND: [OlympiadWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [OlympiadWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [OlympiadWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  isPublished: Boolean
  """
  All values that are not equal to given value.
  """
  isPublished_not: Boolean
  year: DateTime
  """
  All values that are not equal to given value.
  """
  year_not: DateTime
  """
  All values that are contained in given list.
  """
  year_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  year_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  year_lt: DateTime
  """
  All values less than or equal the given value.
  """
  year_lte: DateTime
  """
  All values greater than the given value.
  """
  year_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  year_gte: DateTime
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  createdBy: UserWhereInput
}

input OlympiadWhereUniqueInput {
  id: ID
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

type Question implements Node {
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

type QuestionChoice implements Node {
  id: ID!
  text: String!
}

"""
A connection to a list of items.
"""
type QuestionChoiceConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
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

"""
An edge in a connection.
"""
type QuestionChoiceEdge {
  """
  The item at the end of the edge.
  """
  node: QuestionChoice!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum QuestionChoiceOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """
  Logical AND on all given filters.
  """
  AND: [QuestionChoiceSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [QuestionChoiceSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [QuestionChoiceSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: QuestionChoiceWhereInput
}

input QuestionChoiceUpdateDataInput {
  text: String
}

input QuestionChoiceUpdateInput {
  text: String
}

input QuestionChoiceUpdateManyInput {
  create: [QuestionChoiceCreateInput!]
  connect: [QuestionChoiceWhereUniqueInput!]
  disconnect: [QuestionChoiceWhereUniqueInput!]
  delete: [QuestionChoiceWhereUniqueInput!]
  update: [QuestionChoiceUpdateWithWhereUniqueNestedInput!]
  upsert: [QuestionChoiceUpsertWithWhereUniqueNestedInput!]
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
  """
  Logical AND on all given filters.
  """
  AND: [QuestionChoiceWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [QuestionChoiceWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [QuestionChoiceWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  text: String
  """
  All values that are not equal to given value.
  """
  text_not: String
  """
  All values that are contained in given list.
  """
  text_in: [String!]
  """
  All values that are not contained in given list.
  """
  text_not_in: [String!]
  """
  All values less than the given value.
  """
  text_lt: String
  """
  All values less than or equal the given value.
  """
  text_lte: String
  """
  All values greater than the given value.
  """
  text_gt: String
  """
  All values greater than or equal the given value.
  """
  text_gte: String
  """
  All values containing the given string.
  """
  text_contains: String
  """
  All values not containing the given string.
  """
  text_not_contains: String
  """
  All values starting with the given string.
  """
  text_starts_with: String
  """
  All values not starting with the given string.
  """
  text_not_starts_with: String
  """
  All values ending with the given string.
  """
  text_ends_with: String
  """
  All values not ending with the given string.
  """
  text_not_ends_with: String
}

input QuestionChoiceWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type QuestionConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
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

"""
An edge in a connection.
"""
type QuestionEdge {
  """
  The item at the end of the edge.
  """
  node: Question!
  """
  A cursor for use in pagination.
  """
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
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """
  Logical AND on all given filters.
  """
  AND: [QuestionSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [QuestionSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [QuestionSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: QuestionWhereInput
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
  """
  Logical AND on all given filters.
  """
  AND: [QuestionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [QuestionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [QuestionWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  type: QUESTION_TYPE
  """
  All values that are not equal to given value.
  """
  type_not: QUESTION_TYPE
  """
  All values that are contained in given list.
  """
  type_in: [QUESTION_TYPE!]
  """
  All values that are not contained in given list.
  """
  type_not_in: [QUESTION_TYPE!]
  wording: String
  """
  All values that are not equal to given value.
  """
  wording_not: String
  """
  All values that are contained in given list.
  """
  wording_in: [String!]
  """
  All values that are not contained in given list.
  """
  wording_not_in: [String!]
  """
  All values less than the given value.
  """
  wording_lt: String
  """
  All values less than or equal the given value.
  """
  wording_lte: String
  """
  All values greater than the given value.
  """
  wording_gt: String
  """
  All values greater than or equal the given value.
  """
  wording_gte: String
  """
  All values containing the given string.
  """
  wording_contains: String
  """
  All values not containing the given string.
  """
  wording_not_contains: String
  """
  All values starting with the given string.
  """
  wording_starts_with: String
  """
  All values not starting with the given string.
  """
  wording_not_starts_with: String
  """
  All values ending with the given string.
  """
  wording_ends_with: String
  """
  All values not ending with the given string.
  """
  wording_not_ends_with: String
  imageUrl: String
  """
  All values that are not equal to given value.
  """
  imageUrl_not: String
  """
  All values that are contained in given list.
  """
  imageUrl_in: [String!]
  """
  All values that are not contained in given list.
  """
  imageUrl_not_in: [String!]
  """
  All values less than the given value.
  """
  imageUrl_lt: String
  """
  All values less than or equal the given value.
  """
  imageUrl_lte: String
  """
  All values greater than the given value.
  """
  imageUrl_gt: String
  """
  All values greater than or equal the given value.
  """
  imageUrl_gte: String
  """
  All values containing the given string.
  """
  imageUrl_contains: String
  """
  All values not containing the given string.
  """
  imageUrl_not_contains: String
  """
  All values starting with the given string.
  """
  imageUrl_starts_with: String
  """
  All values not starting with the given string.
  """
  imageUrl_not_starts_with: String
  """
  All values ending with the given string.
  """
  imageUrl_ends_with: String
  """
  All values not ending with the given string.
  """
  imageUrl_not_ends_with: String
  secondaryWording: String
  """
  All values that are not equal to given value.
  """
  secondaryWording_not: String
  """
  All values that are contained in given list.
  """
  secondaryWording_in: [String!]
  """
  All values that are not contained in given list.
  """
  secondaryWording_not_in: [String!]
  """
  All values less than the given value.
  """
  secondaryWording_lt: String
  """
  All values less than or equal the given value.
  """
  secondaryWording_lte: String
  """
  All values greater than the given value.
  """
  secondaryWording_gt: String
  """
  All values greater than or equal the given value.
  """
  secondaryWording_gte: String
  """
  All values containing the given string.
  """
  secondaryWording_contains: String
  """
  All values not containing the given string.
  """
  secondaryWording_not_contains: String
  """
  All values starting with the given string.
  """
  secondaryWording_starts_with: String
  """
  All values not starting with the given string.
  """
  secondaryWording_not_starts_with: String
  """
  All values ending with the given string.
  """
  secondaryWording_ends_with: String
  """
  All values not ending with the given string.
  """
  secondaryWording_not_ends_with: String
  choices_every: QuestionChoiceWhereInput
  choices_some: QuestionChoiceWhereInput
  choices_none: QuestionChoiceWhereInput
}

input QuestionWhereUniqueInput {
  id: ID
}

type School implements Node {
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

"""
A connection to a list of items.
"""
type SchoolConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [SchoolEdge]!
  aggregate: AggregateSchool!
}

input SchoolCreateInput {
  name: String!
  email: String!
  phone: String
  pedagogyCoord: String
  director: String
  address: String
  olympiadCood: UserCreateOneInput!
  city: CityCreateOneInput!
}

"""
An edge in a connection.
"""
type SchoolEdge {
  """
  The item at the end of the edge.
  """
  node: School!
  """
  A cursor for use in pagination.
  """
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
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """
  Logical AND on all given filters.
  """
  AND: [SchoolSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [SchoolSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [SchoolSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SchoolWhereInput
}

input SchoolUpdateInput {
  name: String
  email: String
  phone: String
  pedagogyCoord: String
  director: String
  address: String
  olympiadCood: UserUpdateOneRequiredInput
  city: CityUpdateOneRequiredInput
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
  """
  Logical AND on all given filters.
  """
  AND: [SchoolWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [SchoolWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [SchoolWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  phone: String
  """
  All values that are not equal to given value.
  """
  phone_not: String
  """
  All values that are contained in given list.
  """
  phone_in: [String!]
  """
  All values that are not contained in given list.
  """
  phone_not_in: [String!]
  """
  All values less than the given value.
  """
  phone_lt: String
  """
  All values less than or equal the given value.
  """
  phone_lte: String
  """
  All values greater than the given value.
  """
  phone_gt: String
  """
  All values greater than or equal the given value.
  """
  phone_gte: String
  """
  All values containing the given string.
  """
  phone_contains: String
  """
  All values not containing the given string.
  """
  phone_not_contains: String
  """
  All values starting with the given string.
  """
  phone_starts_with: String
  """
  All values not starting with the given string.
  """
  phone_not_starts_with: String
  """
  All values ending with the given string.
  """
  phone_ends_with: String
  """
  All values not ending with the given string.
  """
  phone_not_ends_with: String
  pedagogyCoord: String
  """
  All values that are not equal to given value.
  """
  pedagogyCoord_not: String
  """
  All values that are contained in given list.
  """
  pedagogyCoord_in: [String!]
  """
  All values that are not contained in given list.
  """
  pedagogyCoord_not_in: [String!]
  """
  All values less than the given value.
  """
  pedagogyCoord_lt: String
  """
  All values less than or equal the given value.
  """
  pedagogyCoord_lte: String
  """
  All values greater than the given value.
  """
  pedagogyCoord_gt: String
  """
  All values greater than or equal the given value.
  """
  pedagogyCoord_gte: String
  """
  All values containing the given string.
  """
  pedagogyCoord_contains: String
  """
  All values not containing the given string.
  """
  pedagogyCoord_not_contains: String
  """
  All values starting with the given string.
  """
  pedagogyCoord_starts_with: String
  """
  All values not starting with the given string.
  """
  pedagogyCoord_not_starts_with: String
  """
  All values ending with the given string.
  """
  pedagogyCoord_ends_with: String
  """
  All values not ending with the given string.
  """
  pedagogyCoord_not_ends_with: String
  director: String
  """
  All values that are not equal to given value.
  """
  director_not: String
  """
  All values that are contained in given list.
  """
  director_in: [String!]
  """
  All values that are not contained in given list.
  """
  director_not_in: [String!]
  """
  All values less than the given value.
  """
  director_lt: String
  """
  All values less than or equal the given value.
  """
  director_lte: String
  """
  All values greater than the given value.
  """
  director_gt: String
  """
  All values greater than or equal the given value.
  """
  director_gte: String
  """
  All values containing the given string.
  """
  director_contains: String
  """
  All values not containing the given string.
  """
  director_not_contains: String
  """
  All values starting with the given string.
  """
  director_starts_with: String
  """
  All values not starting with the given string.
  """
  director_not_starts_with: String
  """
  All values ending with the given string.
  """
  director_ends_with: String
  """
  All values not ending with the given string.
  """
  director_not_ends_with: String
  address: String
  """
  All values that are not equal to given value.
  """
  address_not: String
  """
  All values that are contained in given list.
  """
  address_in: [String!]
  """
  All values that are not contained in given list.
  """
  address_not_in: [String!]
  """
  All values less than the given value.
  """
  address_lt: String
  """
  All values less than or equal the given value.
  """
  address_lte: String
  """
  All values greater than the given value.
  """
  address_gt: String
  """
  All values greater than or equal the given value.
  """
  address_gte: String
  """
  All values containing the given string.
  """
  address_contains: String
  """
  All values not containing the given string.
  """
  address_not_contains: String
  """
  All values starting with the given string.
  """
  address_starts_with: String
  """
  All values not starting with the given string.
  """
  address_not_starts_with: String
  """
  All values ending with the given string.
  """
  address_ends_with: String
  """
  All values not ending with the given string.
  """
  address_not_ends_with: String
  olympiadCood: UserWhereInput
  city: CityWhereInput
}

input SchoolWhereUniqueInput {
  id: ID
  email: String
}

type Test implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  description: String!
  author: User!
}

"""
A connection to a list of items.
"""
type TestConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
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

"""
An edge in a connection.
"""
type TestEdge {
  """
  The item at the end of the edge.
  """
  node: Test!
  """
  A cursor for use in pagination.
  """
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
  """
  Logical AND on all given filters.
  """
  AND: [TestSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [TestSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [TestSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TestWhereInput
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
  connect: [TestWhereUniqueInput!]
  disconnect: [TestWhereUniqueInput!]
  delete: [TestWhereUniqueInput!]
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
  """
  Logical AND on all given filters.
  """
  AND: [TestWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [TestWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [TestWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  author: UserWhereInput
}

input TestWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  name: String!
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test!]
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
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

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
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
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
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
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
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
  connect: UserWhereUniqueInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneRequiredWithoutTestsInput {
  create: UserCreateWithoutTestsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutTestsDataInput
  upsert: UserUpsertWithoutTestsInput
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
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  tests_every: TestWhereInput
  tests_some: TestWhereInput
  tests_none: TestWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Mutation {
  createQuestion(data: QuestionCreateInput!): Question!
  createOlympiad(data: OlympiadCreateInput!): Olympiad!
  createSchool(data: SchoolCreateInput!): School!
  createTest(data: TestCreateInput!): Test!
  createCity(data: CityCreateInput!): City!
  createQuestionChoice(data: QuestionChoiceCreateInput!): QuestionChoice!
  createUser(data: UserCreateInput!): User!
  updateQuestion(data: QuestionUpdateInput!, where: QuestionWhereUniqueInput!): Question
  updateOlympiad(data: OlympiadUpdateInput!, where: OlympiadWhereUniqueInput!): Olympiad
  updateSchool(data: SchoolUpdateInput!, where: SchoolWhereUniqueInput!): School
  updateTest(data: TestUpdateInput!, where: TestWhereUniqueInput!): Test
  updateCity(data: CityUpdateInput!, where: CityWhereUniqueInput!): City
  updateQuestionChoice(data: QuestionChoiceUpdateInput!, where: QuestionChoiceWhereUniqueInput!): QuestionChoice
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteQuestion(where: QuestionWhereUniqueInput!): Question
  deleteOlympiad(where: OlympiadWhereUniqueInput!): Olympiad
  deleteSchool(where: SchoolWhereUniqueInput!): School
  deleteTest(where: TestWhereUniqueInput!): Test
  deleteCity(where: CityWhereUniqueInput!): City
  deleteQuestionChoice(where: QuestionChoiceWhereUniqueInput!): QuestionChoice
  deleteUser(where: UserWhereUniqueInput!): User
  upsertQuestion(where: QuestionWhereUniqueInput!, create: QuestionCreateInput!, update: QuestionUpdateInput!): Question!
  upsertOlympiad(where: OlympiadWhereUniqueInput!, create: OlympiadCreateInput!, update: OlympiadUpdateInput!): Olympiad!
  upsertSchool(where: SchoolWhereUniqueInput!, create: SchoolCreateInput!, update: SchoolUpdateInput!): School!
  upsertTest(where: TestWhereUniqueInput!, create: TestCreateInput!, update: TestUpdateInput!): Test!
  upsertCity(where: CityWhereUniqueInput!, create: CityCreateInput!, update: CityUpdateInput!): City!
  upsertQuestionChoice(where: QuestionChoiceWhereUniqueInput!, create: QuestionChoiceCreateInput!, update: QuestionChoiceUpdateInput!): QuestionChoice!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyQuestions(data: QuestionUpdateManyMutationInput!, where: QuestionWhereInput): BatchPayload!
  updateManyOlympiads(data: OlympiadUpdateManyMutationInput!, where: OlympiadWhereInput): BatchPayload!
  updateManySchools(data: SchoolUpdateManyMutationInput!, where: SchoolWhereInput): BatchPayload!
  updateManyTests(data: TestUpdateManyMutationInput!, where: TestWhereInput): BatchPayload!
  updateManyCities(data: CityUpdateManyMutationInput!, where: CityWhereInput): BatchPayload!
  updateManyQuestionChoices(data: QuestionChoiceUpdateManyMutationInput!, where: QuestionChoiceWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  deleteManyQuestions(where: QuestionWhereInput): BatchPayload!
  deleteManyOlympiads(where: OlympiadWhereInput): BatchPayload!
  deleteManySchools(where: SchoolWhereInput): BatchPayload!
  deleteManyTests(where: TestWhereInput): BatchPayload!
  deleteManyCities(where: CityWhereInput): BatchPayload!
  deleteManyQuestionChoices(where: QuestionChoiceWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

type Query {
  questions(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question]!
  olympiads(where: OlympiadWhereInput, orderBy: OlympiadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Olympiad]!
  schools(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [School]!
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test]!
  cities(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [City]!
  questionChoices(where: QuestionChoiceWhereInput, orderBy: QuestionChoiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [QuestionChoice]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  question(where: QuestionWhereUniqueInput!): Question
  olympiad(where: OlympiadWhereUniqueInput!): Olympiad
  school(where: SchoolWhereUniqueInput!): School
  test(where: TestWhereUniqueInput!): Test
  city(where: CityWhereUniqueInput!): City
  questionChoice(where: QuestionChoiceWhereUniqueInput!): QuestionChoice
  user(where: UserWhereUniqueInput!): User
  questionsConnection(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionConnection!
  olympiadsConnection(where: OlympiadWhereInput, orderBy: OlympiadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OlympiadConnection!
  schoolsConnection(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SchoolConnection!
  testsConnection(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TestConnection!
  citiesConnection(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CityConnection!
  questionChoicesConnection(where: QuestionChoiceWhereInput, orderBy: QuestionChoiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): QuestionChoiceConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  question(where: QuestionSubscriptionWhereInput): QuestionSubscriptionPayload
  olympiad(where: OlympiadSubscriptionWhereInput): OlympiadSubscriptionPayload
  school(where: SchoolSubscriptionWhereInput): SchoolSubscriptionPayload
  test(where: TestSubscriptionWhereInput): TestSubscriptionPayload
  city(where: CitySubscriptionWhereInput): CitySubscriptionPayload
  questionChoice(where: QuestionChoiceSubscriptionWhereInput): QuestionChoiceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}
`

export type OlympiadOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'isPublished_ASC' |
  'isPublished_DESC' |
  'year_ASC' |
  'year_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type QuestionChoiceOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'text_ASC' |
  'text_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type TestOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'title_ASC' |
  'title_DESC' |
  'description_ASC' |
  'description_DESC'

export type SchoolOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'email_ASC' |
  'email_DESC' |
  'phone_ASC' |
  'phone_DESC' |
  'pedagogyCoord_ASC' |
  'pedagogyCoord_DESC' |
  'director_ASC' |
  'director_DESC' |
  'address_ASC' |
  'address_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type CityOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type QuestionOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'type_ASC' |
  'type_DESC' |
  'wording_ASC' |
  'wording_DESC' |
  'imageUrl_ASC' |
  'imageUrl_DESC' |
  'secondaryWording_ASC' |
  'secondaryWording_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export type QUESTION_TYPE = 
  'MULTIPLE_CHOICE' |
  'OPEN_ENDED'

export interface TestCreateManyWithoutAuthorInput {
  create?: TestCreateWithoutAuthorInput[] | TestCreateWithoutAuthorInput
  connect?: TestWhereUniqueInput[] | TestWhereUniqueInput
}

export interface QuestionWhereInput {
  AND?: QuestionWhereInput[] | QuestionWhereInput
  OR?: QuestionWhereInput[] | QuestionWhereInput
  NOT?: QuestionWhereInput[] | QuestionWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  type?: QUESTION_TYPE
  type_not?: QUESTION_TYPE
  type_in?: QUESTION_TYPE[] | QUESTION_TYPE
  type_not_in?: QUESTION_TYPE[] | QUESTION_TYPE
  wording?: String
  wording_not?: String
  wording_in?: String[] | String
  wording_not_in?: String[] | String
  wording_lt?: String
  wording_lte?: String
  wording_gt?: String
  wording_gte?: String
  wording_contains?: String
  wording_not_contains?: String
  wording_starts_with?: String
  wording_not_starts_with?: String
  wording_ends_with?: String
  wording_not_ends_with?: String
  imageUrl?: String
  imageUrl_not?: String
  imageUrl_in?: String[] | String
  imageUrl_not_in?: String[] | String
  imageUrl_lt?: String
  imageUrl_lte?: String
  imageUrl_gt?: String
  imageUrl_gte?: String
  imageUrl_contains?: String
  imageUrl_not_contains?: String
  imageUrl_starts_with?: String
  imageUrl_not_starts_with?: String
  imageUrl_ends_with?: String
  imageUrl_not_ends_with?: String
  secondaryWording?: String
  secondaryWording_not?: String
  secondaryWording_in?: String[] | String
  secondaryWording_not_in?: String[] | String
  secondaryWording_lt?: String
  secondaryWording_lte?: String
  secondaryWording_gt?: String
  secondaryWording_gte?: String
  secondaryWording_contains?: String
  secondaryWording_not_contains?: String
  secondaryWording_starts_with?: String
  secondaryWording_not_starts_with?: String
  secondaryWording_ends_with?: String
  secondaryWording_not_ends_with?: String
  choices_every?: QuestionChoiceWhereInput
  choices_some?: QuestionChoiceWhereInput
  choices_none?: QuestionChoiceWhereInput
}

export interface TestCreateInput {
  title: String
  description: String
  author: UserCreateOneWithoutTestsInput
}

export interface OlympiadWhereInput {
  AND?: OlympiadWhereInput[] | OlympiadWhereInput
  OR?: OlympiadWhereInput[] | OlympiadWhereInput
  NOT?: OlympiadWhereInput[] | OlympiadWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  isPublished?: Boolean
  isPublished_not?: Boolean
  year?: DateTime
  year_not?: DateTime
  year_in?: DateTime[] | DateTime
  year_not_in?: DateTime[] | DateTime
  year_lt?: DateTime
  year_lte?: DateTime
  year_gt?: DateTime
  year_gte?: DateTime
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  createdBy?: UserWhereInput
}

export interface UserUpdateWithoutTestsDataInput {
  email?: String
  password?: String
  name?: String
}

export interface OlympiadUpdateInput {
  name?: String
  isPublished?: Boolean
  year?: DateTime
  createdBy?: UserUpdateOneRequiredInput
}

export interface UserUpdateOneRequiredWithoutTestsInput {
  create?: UserCreateWithoutTestsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutTestsDataInput
  upsert?: UserUpsertWithoutTestsInput
}

export interface UserCreateOneWithoutTestsInput {
  create?: UserCreateWithoutTestsInput
  connect?: UserWhereUniqueInput
}

export interface TestUpdateInput {
  title?: String
  description?: String
  author?: UserUpdateOneRequiredWithoutTestsInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface CityUpsertNestedInput {
  update: CityUpdateDataInput
  create: CityCreateInput
}

export interface CitySubscriptionWhereInput {
  AND?: CitySubscriptionWhereInput[] | CitySubscriptionWhereInput
  OR?: CitySubscriptionWhereInput[] | CitySubscriptionWhereInput
  NOT?: CitySubscriptionWhereInput[] | CitySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CityWhereInput
}

export interface CityUpdateDataInput {
  name?: String
}

export interface TestSubscriptionWhereInput {
  AND?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  OR?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  NOT?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TestWhereInput
}

export interface CityUpdateOneRequiredInput {
  create?: CityCreateInput
  connect?: CityWhereUniqueInput
  update?: CityUpdateDataInput
  upsert?: CityUpsertNestedInput
}

export interface CityWhereInput {
  AND?: CityWhereInput[] | CityWhereInput
  OR?: CityWhereInput[] | CityWhereInput
  NOT?: CityWhereInput[] | CityWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
}

export interface SchoolUpdateInput {
  name?: String
  email?: String
  phone?: String
  pedagogyCoord?: String
  director?: String
  address?: String
  olympiadCood?: UserUpdateOneRequiredInput
  city?: CityUpdateOneRequiredInput
}

export interface OlympiadSubscriptionWhereInput {
  AND?: OlympiadSubscriptionWhereInput[] | OlympiadSubscriptionWhereInput
  OR?: OlympiadSubscriptionWhereInput[] | OlympiadSubscriptionWhereInput
  NOT?: OlympiadSubscriptionWhereInput[] | OlympiadSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: OlympiadWhereInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface UserUpdateManyMutationInput {
  email?: String
  password?: String
  name?: String
}

export interface TestUpsertWithWhereUniqueWithoutAuthorInput {
  where: TestWhereUniqueInput
  update: TestUpdateWithoutAuthorDataInput
  create: TestCreateWithoutAuthorInput
}

export interface QuestionWhereUniqueInput {
  id?: ID_Input
}

export interface TestUpdateWithoutAuthorDataInput {
  title?: String
  description?: String
}

export interface SchoolWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface TestUpdateWithWhereUniqueWithoutAuthorInput {
  where: TestWhereUniqueInput
  data: TestUpdateWithoutAuthorDataInput
}

export interface CityWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface TestUpdateManyWithoutAuthorInput {
  create?: TestCreateWithoutAuthorInput[] | TestCreateWithoutAuthorInput
  connect?: TestWhereUniqueInput[] | TestWhereUniqueInput
  disconnect?: TestWhereUniqueInput[] | TestWhereUniqueInput
  delete?: TestWhereUniqueInput[] | TestWhereUniqueInput
  update?: TestUpdateWithWhereUniqueWithoutAuthorInput[] | TestUpdateWithWhereUniqueWithoutAuthorInput
  upsert?: TestUpsertWithWhereUniqueWithoutAuthorInput[] | TestUpsertWithWhereUniqueWithoutAuthorInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface QuestionCreateInput {
  type: QUESTION_TYPE
  wording: String
  imageUrl?: String
  secondaryWording?: String
  choices?: QuestionChoiceCreateManyInput
}

export interface CityUpdateManyMutationInput {
  name?: String
}

export interface QuestionChoiceCreateManyInput {
  create?: QuestionChoiceCreateInput[] | QuestionChoiceCreateInput
  connect?: QuestionChoiceWhereUniqueInput[] | QuestionChoiceWhereUniqueInput
}

export interface SchoolUpdateManyMutationInput {
  name?: String
  email?: String
  phone?: String
  pedagogyCoord?: String
  director?: String
  address?: String
}

export interface QuestionChoiceCreateInput {
  text: String
}

export interface QuestionUpdateManyMutationInput {
  type?: QUESTION_TYPE
  wording?: String
  imageUrl?: String
  secondaryWording?: String
}

export interface OlympiadCreateInput {
  name: String
  isPublished?: Boolean
  year: DateTime
  createdBy: UserCreateOneInput
}

export interface QuestionChoiceUpdateInput {
  text?: String
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface UserUpsertWithoutTestsInput {
  update: UserUpdateWithoutTestsDataInput
  create: UserCreateWithoutTestsInput
}

export interface UserCreateInput {
  email: String
  password: String
  name: String
  tests?: TestCreateManyWithoutAuthorInput
}

export interface QuestionChoiceSubscriptionWhereInput {
  AND?: QuestionChoiceSubscriptionWhereInput[] | QuestionChoiceSubscriptionWhereInput
  OR?: QuestionChoiceSubscriptionWhereInput[] | QuestionChoiceSubscriptionWhereInput
  NOT?: QuestionChoiceSubscriptionWhereInput[] | QuestionChoiceSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: QuestionChoiceWhereInput
}

export interface UserUpdateDataInput {
  email?: String
  password?: String
  name?: String
  tests?: TestUpdateManyWithoutAuthorInput
}

export interface SchoolWhereInput {
  AND?: SchoolWhereInput[] | SchoolWhereInput
  OR?: SchoolWhereInput[] | SchoolWhereInput
  NOT?: SchoolWhereInput[] | SchoolWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  phone?: String
  phone_not?: String
  phone_in?: String[] | String
  phone_not_in?: String[] | String
  phone_lt?: String
  phone_lte?: String
  phone_gt?: String
  phone_gte?: String
  phone_contains?: String
  phone_not_contains?: String
  phone_starts_with?: String
  phone_not_starts_with?: String
  phone_ends_with?: String
  phone_not_ends_with?: String
  pedagogyCoord?: String
  pedagogyCoord_not?: String
  pedagogyCoord_in?: String[] | String
  pedagogyCoord_not_in?: String[] | String
  pedagogyCoord_lt?: String
  pedagogyCoord_lte?: String
  pedagogyCoord_gt?: String
  pedagogyCoord_gte?: String
  pedagogyCoord_contains?: String
  pedagogyCoord_not_contains?: String
  pedagogyCoord_starts_with?: String
  pedagogyCoord_not_starts_with?: String
  pedagogyCoord_ends_with?: String
  pedagogyCoord_not_ends_with?: String
  director?: String
  director_not?: String
  director_in?: String[] | String
  director_not_in?: String[] | String
  director_lt?: String
  director_lte?: String
  director_gt?: String
  director_gte?: String
  director_contains?: String
  director_not_contains?: String
  director_starts_with?: String
  director_not_starts_with?: String
  director_ends_with?: String
  director_not_ends_with?: String
  address?: String
  address_not?: String
  address_in?: String[] | String
  address_not_in?: String[] | String
  address_lt?: String
  address_lte?: String
  address_gt?: String
  address_gte?: String
  address_contains?: String
  address_not_contains?: String
  address_starts_with?: String
  address_not_starts_with?: String
  address_ends_with?: String
  address_not_ends_with?: String
  olympiadCood?: UserWhereInput
  city?: CityWhereInput
}

export interface TestCreateWithoutAuthorInput {
  title: String
  description: String
}

export interface QuestionSubscriptionWhereInput {
  AND?: QuestionSubscriptionWhereInput[] | QuestionSubscriptionWhereInput
  OR?: QuestionSubscriptionWhereInput[] | QuestionSubscriptionWhereInput
  NOT?: QuestionSubscriptionWhereInput[] | QuestionSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: QuestionWhereInput
}

export interface SchoolCreateInput {
  name: String
  email: String
  phone?: String
  pedagogyCoord?: String
  director?: String
  address?: String
  olympiadCood: UserCreateOneInput
  city: CityCreateOneInput
}

export interface OlympiadWhereUniqueInput {
  id?: ID_Input
}

export interface CityCreateOneInput {
  create?: CityCreateInput
  connect?: CityWhereUniqueInput
}

export interface QuestionChoiceWhereUniqueInput {
  id?: ID_Input
}

export interface CityCreateInput {
  name: String
}

export interface TestUpdateManyMutationInput {
  title?: String
  description?: String
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  name?: String
  tests?: TestUpdateManyWithoutAuthorInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  tests_every?: TestWhereInput
  tests_some?: TestWhereInput
  tests_none?: TestWhereInput
}

export interface TestWhereInput {
  AND?: TestWhereInput[] | TestWhereInput
  OR?: TestWhereInput[] | TestWhereInput
  NOT?: TestWhereInput[] | TestWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  author?: UserWhereInput
}

export interface UserCreateWithoutTestsInput {
  email: String
  password: String
  name: String
}

export interface SchoolSubscriptionWhereInput {
  AND?: SchoolSubscriptionWhereInput[] | SchoolSubscriptionWhereInput
  OR?: SchoolSubscriptionWhereInput[] | SchoolSubscriptionWhereInput
  NOT?: SchoolSubscriptionWhereInput[] | SchoolSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SchoolWhereInput
}

export interface QuestionUpdateInput {
  type?: QUESTION_TYPE
  wording?: String
  imageUrl?: String
  secondaryWording?: String
  choices?: QuestionChoiceUpdateManyInput
}

export interface TestWhereUniqueInput {
  id?: ID_Input
}

export interface OlympiadUpdateManyMutationInput {
  name?: String
  isPublished?: Boolean
  year?: DateTime
}

export interface QuestionChoiceUpsertWithWhereUniqueNestedInput {
  where: QuestionChoiceWhereUniqueInput
  update: QuestionChoiceUpdateDataInput
  create: QuestionChoiceCreateInput
}

export interface QuestionChoiceUpdateDataInput {
  text?: String
}

export interface QuestionChoiceUpdateWithWhereUniqueNestedInput {
  where: QuestionChoiceWhereUniqueInput
  data: QuestionChoiceUpdateDataInput
}

export interface QuestionChoiceUpdateManyInput {
  create?: QuestionChoiceCreateInput[] | QuestionChoiceCreateInput
  connect?: QuestionChoiceWhereUniqueInput[] | QuestionChoiceWhereUniqueInput
  disconnect?: QuestionChoiceWhereUniqueInput[] | QuestionChoiceWhereUniqueInput
  delete?: QuestionChoiceWhereUniqueInput[] | QuestionChoiceWhereUniqueInput
  update?: QuestionChoiceUpdateWithWhereUniqueNestedInput[] | QuestionChoiceUpdateWithWhereUniqueNestedInput
  upsert?: QuestionChoiceUpsertWithWhereUniqueNestedInput[] | QuestionChoiceUpsertWithWhereUniqueNestedInput
}

export interface CityUpdateInput {
  name?: String
}

export interface QuestionChoiceUpdateManyMutationInput {
  text?: String
}

export interface QuestionChoiceWhereInput {
  AND?: QuestionChoiceWhereInput[] | QuestionChoiceWhereInput
  OR?: QuestionChoiceWhereInput[] | QuestionChoiceWhereInput
  NOT?: QuestionChoiceWhereInput[] | QuestionChoiceWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  text?: String
  text_not?: String
  text_in?: String[] | String
  text_not_in?: String[] | String
  text_lt?: String
  text_lte?: String
  text_gt?: String
  text_gte?: String
  text_contains?: String
  text_not_contains?: String
  text_starts_with?: String
  text_not_starts_with?: String
  text_ends_with?: String
  text_not_ends_with?: String
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  name: String
}

export interface AggregateQuestion {
  count: Int
}

export interface Olympiad extends Node {
  id: ID_Output
  name: String
  isPublished?: Boolean
  year: DateTime
  createdBy: User
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface QuestionEdge {
  node: Question
  cursor: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface QuestionChoice extends Node {
  id: ID_Output
  text: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface QuestionConnection {
  pageInfo: PageInfo
  edges: QuestionEdge[]
  aggregate: AggregateQuestion
}

export interface AggregateQuestionChoice {
  count: Int
}

export interface QuestionChoicePreviousValues {
  id: ID_Output
  text: String
}

/*
 * A connection to a list of items.

 */
export interface QuestionChoiceConnection {
  pageInfo: PageInfo
  edges: QuestionChoiceEdge[]
  aggregate: AggregateQuestionChoice
}

export interface City extends Node {
  id: ID_Output
  name: String
}

/*
 * An edge in a connection.

 */
export interface CityEdge {
  node: City
  cursor: String
}

export interface QuestionChoiceSubscriptionPayload {
  mutation: MutationType
  node?: QuestionChoice
  updatedFields?: String[]
  previousValues?: QuestionChoicePreviousValues
}

export interface AggregateTest {
  count: Int
}

export interface QuestionSubscriptionPayload {
  mutation: MutationType
  node?: Question
  updatedFields?: String[]
  previousValues?: QuestionPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface TestConnection {
  pageInfo: PageInfo
  edges: TestEdge[]
  aggregate: AggregateTest
}

export interface QuestionPreviousValues {
  id: ID_Output
  type: QUESTION_TYPE
  wording: String
  imageUrl?: String
  secondaryWording?: String
}

/*
 * An edge in a connection.

 */
export interface SchoolEdge {
  node: School
  cursor: String
}

export interface School extends Node {
  id: ID_Output
  name: String
  email: String
  phone?: String
  olympiadCood: User
  pedagogyCoord?: String
  director?: String
  city: City
  address?: String
}

export interface AggregateOlympiad {
  count: Int
}

export interface OlympiadSubscriptionPayload {
  mutation: MutationType
  node?: Olympiad
  updatedFields?: String[]
  previousValues?: OlympiadPreviousValues
}

export interface BatchPayload {
  count: Long
}

export interface OlympiadPreviousValues {
  id: ID_Output
  name: String
  isPublished?: Boolean
  year: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface OlympiadConnection {
  pageInfo: PageInfo
  edges: OlympiadEdge[]
  aggregate: AggregateOlympiad
}

export interface Question extends Node {
  id: ID_Output
  type: QUESTION_TYPE
  wording: String
  imageUrl?: String
  secondaryWording?: String
  choices?: QuestionChoice[]
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface SchoolSubscriptionPayload {
  mutation: MutationType
  node?: School
  updatedFields?: String[]
  previousValues?: SchoolPreviousValues
}

export interface AggregateCity {
  count: Int
}

export interface SchoolPreviousValues {
  id: ID_Output
  name: String
  email: String
  phone?: String
  pedagogyCoord?: String
  director?: String
  address?: String
}

/*
 * An edge in a connection.

 */
export interface TestEdge {
  node: Test
  cursor: String
}

export interface Test extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  title: String
  description: String
  author: User
}

/*
 * A connection to a list of items.

 */
export interface SchoolConnection {
  pageInfo: PageInfo
  edges: SchoolEdge[]
  aggregate: AggregateSchool
}

export interface TestSubscriptionPayload {
  mutation: MutationType
  node?: Test
  updatedFields?: String[]
  previousValues?: TestPreviousValues
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * An edge in a connection.

 */
export interface QuestionChoiceEdge {
  node: QuestionChoice
  cursor: String
}

export interface CityPreviousValues {
  id: ID_Output
  name: String
}

export interface CitySubscriptionPayload {
  mutation: MutationType
  node?: City
  updatedFields?: String[]
  previousValues?: CityPreviousValues
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  name: String
  tests?: Test[]
}

export interface TestPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  title: String
  description: String
}

/*
 * A connection to a list of items.

 */
export interface CityConnection {
  pageInfo: PageInfo
  edges: CityEdge[]
  aggregate: AggregateCity
}

export interface AggregateUser {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface OlympiadEdge {
  node: Olympiad
  cursor: String
}

export interface AggregateSchool {
  count: Int
}

export type DateTime = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  questions: (args: { where?: QuestionWhereInput, orderBy?: QuestionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Question[]>
  olympiads: (args: { where?: OlympiadWhereInput, orderBy?: OlympiadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Olympiad[]>
  schools: (args: { where?: SchoolWhereInput, orderBy?: SchoolOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<School[]>
  tests: (args: { where?: TestWhereInput, orderBy?: TestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Test[]>
  cities: (args: { where?: CityWhereInput, orderBy?: CityOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<City[]>
  questionChoices: (args: { where?: QuestionChoiceWhereInput, orderBy?: QuestionChoiceOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<QuestionChoice[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  question: (args: { where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Question | null>
  olympiad: (args: { where: OlympiadWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Olympiad | null>
  school: (args: { where: SchoolWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<School | null>
  test: (args: { where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Test | null>
  city: (args: { where: CityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<City | null>
  questionChoice: (args: { where: QuestionChoiceWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<QuestionChoice | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  questionsConnection: (args: { where?: QuestionWhereInput, orderBy?: QuestionOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<QuestionConnection>
  olympiadsConnection: (args: { where?: OlympiadWhereInput, orderBy?: OlympiadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<OlympiadConnection>
  schoolsConnection: (args: { where?: SchoolWhereInput, orderBy?: SchoolOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<SchoolConnection>
  testsConnection: (args: { where?: TestWhereInput, orderBy?: TestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<TestConnection>
  citiesConnection: (args: { where?: CityWhereInput, orderBy?: CityOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<CityConnection>
  questionChoicesConnection: (args: { where?: QuestionChoiceWhereInput, orderBy?: QuestionChoiceOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<QuestionChoiceConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createQuestion: (args: { data: QuestionCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Question>
  createOlympiad: (args: { data: OlympiadCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Olympiad>
  createSchool: (args: { data: SchoolCreateInput }, info?: GraphQLResolveInfo | string) => Promise<School>
  createTest: (args: { data: TestCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Test>
  createCity: (args: { data: CityCreateInput }, info?: GraphQLResolveInfo | string) => Promise<City>
  createQuestionChoice: (args: { data: QuestionChoiceCreateInput }, info?: GraphQLResolveInfo | string) => Promise<QuestionChoice>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateQuestion: (args: { data: QuestionUpdateInput, where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Question | null>
  updateOlympiad: (args: { data: OlympiadUpdateInput, where: OlympiadWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Olympiad | null>
  updateSchool: (args: { data: SchoolUpdateInput, where: SchoolWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<School | null>
  updateTest: (args: { data: TestUpdateInput, where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Test | null>
  updateCity: (args: { data: CityUpdateInput, where: CityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<City | null>
  updateQuestionChoice: (args: { data: QuestionChoiceUpdateInput, where: QuestionChoiceWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<QuestionChoice | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteQuestion: (args: { where: QuestionWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Question | null>
  deleteOlympiad: (args: { where: OlympiadWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Olympiad | null>
  deleteSchool: (args: { where: SchoolWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<School | null>
  deleteTest: (args: { where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Test | null>
  deleteCity: (args: { where: CityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<City | null>
  deleteQuestionChoice: (args: { where: QuestionChoiceWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<QuestionChoice | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  upsertQuestion: (args: { where: QuestionWhereUniqueInput, create: QuestionCreateInput, update: QuestionUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Question>
  upsertOlympiad: (args: { where: OlympiadWhereUniqueInput, create: OlympiadCreateInput, update: OlympiadUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Olympiad>
  upsertSchool: (args: { where: SchoolWhereUniqueInput, create: SchoolCreateInput, update: SchoolUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<School>
  upsertTest: (args: { where: TestWhereUniqueInput, create: TestCreateInput, update: TestUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Test>
  upsertCity: (args: { where: CityWhereUniqueInput, create: CityCreateInput, update: CityUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<City>
  upsertQuestionChoice: (args: { where: QuestionChoiceWhereUniqueInput, create: QuestionChoiceCreateInput, update: QuestionChoiceUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<QuestionChoice>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateManyQuestions: (args: { data: QuestionUpdateManyMutationInput, where?: QuestionWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyOlympiads: (args: { data: OlympiadUpdateManyMutationInput, where?: OlympiadWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManySchools: (args: { data: SchoolUpdateManyMutationInput, where?: SchoolWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyTests: (args: { data: TestUpdateManyMutationInput, where?: TestWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyCities: (args: { data: CityUpdateManyMutationInput, where?: CityWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyQuestionChoices: (args: { data: QuestionChoiceUpdateManyMutationInput, where?: QuestionChoiceWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateManyMutationInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyQuestions: (args: { where?: QuestionWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyOlympiads: (args: { where?: OlympiadWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManySchools: (args: { where?: SchoolWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyTests: (args: { where?: TestWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyCities: (args: { where?: CityWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyQuestionChoices: (args: { where?: QuestionChoiceWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  question: (args: { where?: QuestionSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<QuestionSubscriptionPayload>>
  olympiad: (args: { where?: OlympiadSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<OlympiadSubscriptionPayload>>
  school: (args: { where?: SchoolSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<SchoolSubscriptionPayload>>
  test: (args: { where?: TestSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<TestSubscriptionPayload>>
  city: (args: { where?: CitySubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<CitySubscriptionPayload>>
  questionChoice: (args: { where?: QuestionChoiceSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<QuestionChoiceSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Question: (where: QuestionWhereInput): Promise<boolean> => super.existsDelegate('query', 'questions', { where }, {}, '{ id }'),
    Olympiad: (where: OlympiadWhereInput): Promise<boolean> => super.existsDelegate('query', 'olympiads', { where }, {}, '{ id }'),
    School: (where: SchoolWhereInput): Promise<boolean> => super.existsDelegate('query', 'schools', { where }, {}, '{ id }'),
    Test: (where: TestWhereInput): Promise<boolean> => super.existsDelegate('query', 'tests', { where }, {}, '{ id }'),
    City: (where: CityWhereInput): Promise<boolean> => super.existsDelegate('query', 'cities', { where }, {}, '{ id }'),
    QuestionChoice: (where: QuestionChoiceWhereInput): Promise<boolean> => super.existsDelegate('query', 'questionChoices', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }')
  }

  query: Query = {
    questions: (args, info): Promise<Question[]> => super.delegate('query', 'questions', args, {}, info),
    olympiads: (args, info): Promise<Olympiad[]> => super.delegate('query', 'olympiads', args, {}, info),
    schools: (args, info): Promise<School[]> => super.delegate('query', 'schools', args, {}, info),
    tests: (args, info): Promise<Test[]> => super.delegate('query', 'tests', args, {}, info),
    cities: (args, info): Promise<City[]> => super.delegate('query', 'cities', args, {}, info),
    questionChoices: (args, info): Promise<QuestionChoice[]> => super.delegate('query', 'questionChoices', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    question: (args, info): Promise<Question | null> => super.delegate('query', 'question', args, {}, info),
    olympiad: (args, info): Promise<Olympiad | null> => super.delegate('query', 'olympiad', args, {}, info),
    school: (args, info): Promise<School | null> => super.delegate('query', 'school', args, {}, info),
    test: (args, info): Promise<Test | null> => super.delegate('query', 'test', args, {}, info),
    city: (args, info): Promise<City | null> => super.delegate('query', 'city', args, {}, info),
    questionChoice: (args, info): Promise<QuestionChoice | null> => super.delegate('query', 'questionChoice', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    questionsConnection: (args, info): Promise<QuestionConnection> => super.delegate('query', 'questionsConnection', args, {}, info),
    olympiadsConnection: (args, info): Promise<OlympiadConnection> => super.delegate('query', 'olympiadsConnection', args, {}, info),
    schoolsConnection: (args, info): Promise<SchoolConnection> => super.delegate('query', 'schoolsConnection', args, {}, info),
    testsConnection: (args, info): Promise<TestConnection> => super.delegate('query', 'testsConnection', args, {}, info),
    citiesConnection: (args, info): Promise<CityConnection> => super.delegate('query', 'citiesConnection', args, {}, info),
    questionChoicesConnection: (args, info): Promise<QuestionChoiceConnection> => super.delegate('query', 'questionChoicesConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createQuestion: (args, info): Promise<Question> => super.delegate('mutation', 'createQuestion', args, {}, info),
    createOlympiad: (args, info): Promise<Olympiad> => super.delegate('mutation', 'createOlympiad', args, {}, info),
    createSchool: (args, info): Promise<School> => super.delegate('mutation', 'createSchool', args, {}, info),
    createTest: (args, info): Promise<Test> => super.delegate('mutation', 'createTest', args, {}, info),
    createCity: (args, info): Promise<City> => super.delegate('mutation', 'createCity', args, {}, info),
    createQuestionChoice: (args, info): Promise<QuestionChoice> => super.delegate('mutation', 'createQuestionChoice', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    updateQuestion: (args, info): Promise<Question | null> => super.delegate('mutation', 'updateQuestion', args, {}, info),
    updateOlympiad: (args, info): Promise<Olympiad | null> => super.delegate('mutation', 'updateOlympiad', args, {}, info),
    updateSchool: (args, info): Promise<School | null> => super.delegate('mutation', 'updateSchool', args, {}, info),
    updateTest: (args, info): Promise<Test | null> => super.delegate('mutation', 'updateTest', args, {}, info),
    updateCity: (args, info): Promise<City | null> => super.delegate('mutation', 'updateCity', args, {}, info),
    updateQuestionChoice: (args, info): Promise<QuestionChoice | null> => super.delegate('mutation', 'updateQuestionChoice', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    deleteQuestion: (args, info): Promise<Question | null> => super.delegate('mutation', 'deleteQuestion', args, {}, info),
    deleteOlympiad: (args, info): Promise<Olympiad | null> => super.delegate('mutation', 'deleteOlympiad', args, {}, info),
    deleteSchool: (args, info): Promise<School | null> => super.delegate('mutation', 'deleteSchool', args, {}, info),
    deleteTest: (args, info): Promise<Test | null> => super.delegate('mutation', 'deleteTest', args, {}, info),
    deleteCity: (args, info): Promise<City | null> => super.delegate('mutation', 'deleteCity', args, {}, info),
    deleteQuestionChoice: (args, info): Promise<QuestionChoice | null> => super.delegate('mutation', 'deleteQuestionChoice', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    upsertQuestion: (args, info): Promise<Question> => super.delegate('mutation', 'upsertQuestion', args, {}, info),
    upsertOlympiad: (args, info): Promise<Olympiad> => super.delegate('mutation', 'upsertOlympiad', args, {}, info),
    upsertSchool: (args, info): Promise<School> => super.delegate('mutation', 'upsertSchool', args, {}, info),
    upsertTest: (args, info): Promise<Test> => super.delegate('mutation', 'upsertTest', args, {}, info),
    upsertCity: (args, info): Promise<City> => super.delegate('mutation', 'upsertCity', args, {}, info),
    upsertQuestionChoice: (args, info): Promise<QuestionChoice> => super.delegate('mutation', 'upsertQuestionChoice', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    updateManyQuestions: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyQuestions', args, {}, info),
    updateManyOlympiads: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyOlympiads', args, {}, info),
    updateManySchools: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManySchools', args, {}, info),
    updateManyTests: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyTests', args, {}, info),
    updateManyCities: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyCities', args, {}, info),
    updateManyQuestionChoices: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyQuestionChoices', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    deleteManyQuestions: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyQuestions', args, {}, info),
    deleteManyOlympiads: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyOlympiads', args, {}, info),
    deleteManySchools: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManySchools', args, {}, info),
    deleteManyTests: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyTests', args, {}, info),
    deleteManyCities: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyCities', args, {}, info),
    deleteManyQuestionChoices: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyQuestionChoices', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info)
  }

  subscription: Subscription = {
    question: (args, infoOrQuery): Promise<AsyncIterator<QuestionSubscriptionPayload>> => super.delegateSubscription('question', args, {}, infoOrQuery),
    olympiad: (args, infoOrQuery): Promise<AsyncIterator<OlympiadSubscriptionPayload>> => super.delegateSubscription('olympiad', args, {}, infoOrQuery),
    school: (args, infoOrQuery): Promise<AsyncIterator<SchoolSubscriptionPayload>> => super.delegateSubscription('school', args, {}, infoOrQuery),
    test: (args, infoOrQuery): Promise<AsyncIterator<TestSubscriptionPayload>> => super.delegateSubscription('test', args, {}, infoOrQuery),
    city: (args, infoOrQuery): Promise<AsyncIterator<CitySubscriptionPayload>> => super.delegateSubscription('city', args, {}, infoOrQuery),
    questionChoice: (args, infoOrQuery): Promise<AsyncIterator<QuestionChoiceSubscriptionPayload>> => super.delegateSubscription('questionChoice', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery)
  }
}