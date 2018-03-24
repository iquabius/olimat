import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type City implements Node {
  id: ID!
  name: String!
}

type School implements Node {
  id: ID!
  name: String!
  email: String!
  phone: String
  olympiadCood(where: UserWhereInput): User!
  pedagogyCoord: String
  director: String
  city(where: CityWhereInput): City!
  address: String
}

type Test implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  description: String!
  author(where: UserWhereInput): User!
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  name: String!
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test!]
}

type AggregateCity {
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

input CityUpdateOneInput {
  create: CityCreateInput
  connect: CityWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
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
  olympiadCood: UserUpdateOneInput
  city: CityUpdateOneInput
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
  author: UserUpdateOneWithoutTestsInput
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

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneWithoutTestsInput {
  create: UserCreateWithoutTestsInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
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
  createCity(data: CityCreateInput!): City!
  createSchool(data: SchoolCreateInput!): School!
  createTest(data: TestCreateInput!): Test!
  createUser(data: UserCreateInput!): User!
  updateCity(data: CityUpdateInput!, where: CityWhereUniqueInput!): City
  updateSchool(data: SchoolUpdateInput!, where: SchoolWhereUniqueInput!): School
  updateTest(data: TestUpdateInput!, where: TestWhereUniqueInput!): Test
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteCity(where: CityWhereUniqueInput!): City
  deleteSchool(where: SchoolWhereUniqueInput!): School
  deleteTest(where: TestWhereUniqueInput!): Test
  deleteUser(where: UserWhereUniqueInput!): User
  upsertCity(where: CityWhereUniqueInput!, create: CityCreateInput!, update: CityUpdateInput!): City!
  upsertSchool(where: SchoolWhereUniqueInput!, create: SchoolCreateInput!, update: SchoolUpdateInput!): School!
  upsertTest(where: TestWhereUniqueInput!, create: TestCreateInput!, update: TestUpdateInput!): Test!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyCities(data: CityUpdateInput!, where: CityWhereInput!): BatchPayload!
  updateManySchools(data: SchoolUpdateInput!, where: SchoolWhereInput!): BatchPayload!
  updateManyTests(data: TestUpdateInput!, where: TestWhereInput!): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput!): BatchPayload!
  deleteManyCities(where: CityWhereInput!): BatchPayload!
  deleteManySchools(where: SchoolWhereInput!): BatchPayload!
  deleteManyTests(where: TestWhereInput!): BatchPayload!
  deleteManyUsers(where: UserWhereInput!): BatchPayload!
}

type Query {
  cities(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [City]!
  schools(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [School]!
  tests(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Test]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  city(where: CityWhereUniqueInput!): City
  school(where: SchoolWhereUniqueInput!): School
  test(where: TestWhereUniqueInput!): Test
  user(where: UserWhereUniqueInput!): User
  citiesConnection(where: CityWhereInput, orderBy: CityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CityConnection!
  schoolsConnection(where: SchoolWhereInput, orderBy: SchoolOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SchoolConnection!
  testsConnection(where: TestWhereInput, orderBy: TestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TestConnection!
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
  city(where: CitySubscriptionWhereInput): CitySubscriptionPayload
  school(where: SchoolSubscriptionWhereInput): SchoolSubscriptionPayload
  test(where: TestSubscriptionWhereInput): TestSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}
`

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

export type CityOrderByInput = 
  'id_ASC' |
  'id_DESC' |
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

export interface UserCreateInput {
  email: String
  password: String
  name: String
  tests?: TestCreateManyWithoutAuthorInput
}

export interface CityWhereInput {
  AND?: CityWhereInput[] | CityWhereInput
  OR?: CityWhereInput[] | CityWhereInput
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

export interface TestCreateInput {
  title: String
  description: String
  author: UserCreateOneWithoutTestsInput
}

export interface SchoolWhereInput {
  AND?: SchoolWhereInput[] | SchoolWhereInput
  OR?: SchoolWhereInput[] | SchoolWhereInput
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

export interface UserCreateOneWithoutTestsInput {
  create?: UserCreateWithoutTestsInput
  connect?: UserWhereUniqueInput
}

export interface TestWhereInput {
  AND?: TestWhereInput[] | TestWhereInput
  OR?: TestWhereInput[] | TestWhereInput
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

export interface CityUpdateOneInput {
  create?: CityCreateInput
  connect?: CityWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: CityUpdateDataInput
  upsert?: CityUpsertNestedInput
}

export interface CityUpdateInput {
  name?: String
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface UserCreateWithoutTestsInput {
  email: String
  password: String
  name: String
}

export interface TestUpsertWithWhereUniqueWithoutAuthorInput {
  where: TestWhereUniqueInput
  update: TestUpdateWithoutAuthorDataInput
  create: TestCreateWithoutAuthorInput
}

export interface TestSubscriptionWhereInput {
  AND?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  OR?: TestSubscriptionWhereInput[] | TestSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TestWhereInput
}

export interface TestUpdateWithoutAuthorDataInput {
  title?: String
  description?: String
}

export interface CitySubscriptionWhereInput {
  AND?: CitySubscriptionWhereInput[] | CitySubscriptionWhereInput
  OR?: CitySubscriptionWhereInput[] | CitySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CityWhereInput
}

export interface TestUpdateWithWhereUniqueWithoutAuthorInput {
  where: TestWhereUniqueInput
  data: TestUpdateWithoutAuthorDataInput
}

export interface SchoolWhereUniqueInput {
  id?: ID_Input
  email?: String
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

export interface UserUpdateDataInput {
  email?: String
  password?: String
  name?: String
  tests?: TestUpdateManyWithoutAuthorInput
}

export interface UserUpsertWithoutTestsInput {
  update: UserUpdateWithoutTestsDataInput
  create: UserCreateWithoutTestsInput
}

export interface CityCreateInput {
  name: String
}

export interface UserUpdateOneWithoutTestsInput {
  create?: UserCreateWithoutTestsInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutTestsDataInput
  upsert?: UserUpsertWithoutTestsInput
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

export interface CityUpsertNestedInput {
  update: CityUpdateDataInput
  create: CityCreateInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface CityWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface TestCreateManyWithoutAuthorInput {
  create?: TestCreateWithoutAuthorInput[] | TestCreateWithoutAuthorInput
  connect?: TestWhereUniqueInput[] | TestWhereUniqueInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  name?: String
  tests?: TestUpdateManyWithoutAuthorInput
}

export interface TestUpdateInput {
  title?: String
  description?: String
  author?: UserUpdateOneWithoutTestsInput
}

export interface SchoolUpdateInput {
  name?: String
  email?: String
  phone?: String
  pedagogyCoord?: String
  director?: String
  address?: String
  olympiadCood?: UserUpdateOneInput
  city?: CityUpdateOneInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
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

export interface CityCreateOneInput {
  create?: CityCreateInput
  connect?: CityWhereUniqueInput
}

export interface TestCreateWithoutAuthorInput {
  title: String
  description: String
}

export interface CityUpdateDataInput {
  name?: String
}

export interface UserUpdateWithoutTestsDataInput {
  email?: String
  password?: String
  name?: String
}

export interface TestWhereUniqueInput {
  id?: ID_Input
}

export interface SchoolSubscriptionWhereInput {
  AND?: SchoolSubscriptionWhereInput[] | SchoolSubscriptionWhereInput
  OR?: SchoolSubscriptionWhereInput[] | SchoolSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SchoolWhereInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

/*
 * A connection to a list of items.

 */
export interface CityConnection {
  pageInfo: PageInfo
  edges: CityEdge[]
  aggregate: AggregateCity
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  name: String
}

export interface BatchPayload {
  count: Long
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

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  name: String
  tests?: Test[]
}

export interface City extends Node {
  id: ID_Output
  name: String
}

export interface AggregateUser {
  count: Int
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
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

/*
 * An edge in a connection.

 */
export interface TestEdge {
  node: Test
  cursor: String
}

export interface TestPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  title: String
  description: String
}

export interface AggregateSchool {
  count: Int
}

export interface TestSubscriptionPayload {
  mutation: MutationType
  node?: Test
  updatedFields?: String[]
  previousValues?: TestPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface SchoolConnection {
  pageInfo: PageInfo
  edges: SchoolEdge[]
  aggregate: AggregateSchool
}

export interface CitySubscriptionPayload {
  mutation: MutationType
  node?: City
  updatedFields?: String[]
  previousValues?: CityPreviousValues
}

/*
 * An edge in a connection.

 */
export interface CityEdge {
  node: City
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

export interface SchoolPreviousValues {
  id: ID_Output
  name: String
  email: String
  phone?: String
  pedagogyCoord?: String
  director?: String
  address?: String
}

export interface SchoolSubscriptionPayload {
  mutation: MutationType
  node?: School
  updatedFields?: String[]
  previousValues?: SchoolPreviousValues
}

export interface Test extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  title: String
  description: String
  author: User
}

export interface CityPreviousValues {
  id: ID_Output
  name: String
}

export interface AggregateTest {
  count: Int
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface AggregateCity {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface SchoolEdge {
  node: School
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface TestConnection {
  pageInfo: PageInfo
  edges: TestEdge[]
  aggregate: AggregateTest
}

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
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

export type DateTime = string

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
  cities: (args: { where?: CityWhereInput, orderBy?: CityOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<City[]>
  schools: (args: { where?: SchoolWhereInput, orderBy?: SchoolOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<School[]>
  tests: (args: { where?: TestWhereInput, orderBy?: TestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Test[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  city: (args: { where: CityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<City | null>
  school: (args: { where: SchoolWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<School | null>
  test: (args: { where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Test | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  citiesConnection: (args: { where?: CityWhereInput, orderBy?: CityOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<CityConnection>
  schoolsConnection: (args: { where?: SchoolWhereInput, orderBy?: SchoolOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<SchoolConnection>
  testsConnection: (args: { where?: TestWhereInput, orderBy?: TestOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<TestConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createCity: (args: { data: CityCreateInput }, info?: GraphQLResolveInfo | string) => Promise<City>
  createSchool: (args: { data: SchoolCreateInput }, info?: GraphQLResolveInfo | string) => Promise<School>
  createTest: (args: { data: TestCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Test>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateCity: (args: { data: CityUpdateInput, where: CityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<City | null>
  updateSchool: (args: { data: SchoolUpdateInput, where: SchoolWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<School | null>
  updateTest: (args: { data: TestUpdateInput, where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Test | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteCity: (args: { where: CityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<City | null>
  deleteSchool: (args: { where: SchoolWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<School | null>
  deleteTest: (args: { where: TestWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Test | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  upsertCity: (args: { where: CityWhereUniqueInput, create: CityCreateInput, update: CityUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<City>
  upsertSchool: (args: { where: SchoolWhereUniqueInput, create: SchoolCreateInput, update: SchoolUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<School>
  upsertTest: (args: { where: TestWhereUniqueInput, create: TestCreateInput, update: TestUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Test>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateManyCities: (args: { data: CityUpdateInput, where: CityWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManySchools: (args: { data: SchoolUpdateInput, where: SchoolWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyTests: (args: { data: TestUpdateInput, where: TestWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyCities: (args: { where: CityWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManySchools: (args: { where: SchoolWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyTests: (args: { where: TestWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  city: (args: { where?: CitySubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<CitySubscriptionPayload>>
  school: (args: { where?: SchoolSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<SchoolSubscriptionPayload>>
  test: (args: { where?: TestSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<TestSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    City: (where: CityWhereInput): Promise<boolean> => super.existsDelegate('query', 'cities', { where }, {}, '{ id }'),
    School: (where: SchoolWhereInput): Promise<boolean> => super.existsDelegate('query', 'schools', { where }, {}, '{ id }'),
    Test: (where: TestWhereInput): Promise<boolean> => super.existsDelegate('query', 'tests', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }')
  }

  query: Query = {
    cities: (args, info): Promise<City[]> => super.delegate('query', 'cities', args, {}, info),
    schools: (args, info): Promise<School[]> => super.delegate('query', 'schools', args, {}, info),
    tests: (args, info): Promise<Test[]> => super.delegate('query', 'tests', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    city: (args, info): Promise<City | null> => super.delegate('query', 'city', args, {}, info),
    school: (args, info): Promise<School | null> => super.delegate('query', 'school', args, {}, info),
    test: (args, info): Promise<Test | null> => super.delegate('query', 'test', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    citiesConnection: (args, info): Promise<CityConnection> => super.delegate('query', 'citiesConnection', args, {}, info),
    schoolsConnection: (args, info): Promise<SchoolConnection> => super.delegate('query', 'schoolsConnection', args, {}, info),
    testsConnection: (args, info): Promise<TestConnection> => super.delegate('query', 'testsConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createCity: (args, info): Promise<City> => super.delegate('mutation', 'createCity', args, {}, info),
    createSchool: (args, info): Promise<School> => super.delegate('mutation', 'createSchool', args, {}, info),
    createTest: (args, info): Promise<Test> => super.delegate('mutation', 'createTest', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    updateCity: (args, info): Promise<City | null> => super.delegate('mutation', 'updateCity', args, {}, info),
    updateSchool: (args, info): Promise<School | null> => super.delegate('mutation', 'updateSchool', args, {}, info),
    updateTest: (args, info): Promise<Test | null> => super.delegate('mutation', 'updateTest', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    deleteCity: (args, info): Promise<City | null> => super.delegate('mutation', 'deleteCity', args, {}, info),
    deleteSchool: (args, info): Promise<School | null> => super.delegate('mutation', 'deleteSchool', args, {}, info),
    deleteTest: (args, info): Promise<Test | null> => super.delegate('mutation', 'deleteTest', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    upsertCity: (args, info): Promise<City> => super.delegate('mutation', 'upsertCity', args, {}, info),
    upsertSchool: (args, info): Promise<School> => super.delegate('mutation', 'upsertSchool', args, {}, info),
    upsertTest: (args, info): Promise<Test> => super.delegate('mutation', 'upsertTest', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    updateManyCities: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyCities', args, {}, info),
    updateManySchools: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManySchools', args, {}, info),
    updateManyTests: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyTests', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    deleteManyCities: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyCities', args, {}, info),
    deleteManySchools: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManySchools', args, {}, info),
    deleteManyTests: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyTests', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info)
  }

  subscription: Subscription = {
    city: (args, infoOrQuery): Promise<AsyncIterator<CitySubscriptionPayload>> => super.delegateSubscription('city', args, {}, infoOrQuery),
    school: (args, infoOrQuery): Promise<AsyncIterator<SchoolSubscriptionPayload>> => super.delegateSubscription('school', args, {}, infoOrQuery),
    test: (args, infoOrQuery): Promise<AsyncIterator<TestSubscriptionPayload>> => super.delegateSubscription('test', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery)
  }
}