// Code generated by Prisma (prisma@1.30.0). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `
  type AggregateRole {
    count: Int!
  }

  type AggregateSecurityQuestion {
    count: Int!
  }

  type AggregateSecurityQuestionAnswer {
    count: Int!
  }

  type AggregateUser {
    count: Int!
  }

  type AggregateUserAccount {
    count: Int!
  }

  type BatchPayload {
    count: Long!
  }

  scalar DateTime

  scalar Long

  type Mutation {
    createRole(data: RoleCreateInput!): Role!
    updateRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role
    updateManyRoles(
      data: RoleUpdateManyMutationInput!
      where: RoleWhereInput
    ): BatchPayload!
    upsertRole(
      where: RoleWhereUniqueInput!
      create: RoleCreateInput!
      update: RoleUpdateInput!
    ): Role!
    deleteRole(where: RoleWhereUniqueInput!): Role
    deleteManyRoles(where: RoleWhereInput): BatchPayload!
    createSecurityQuestion(
      data: SecurityQuestionCreateInput!
    ): SecurityQuestion!
    updateSecurityQuestion(
      data: SecurityQuestionUpdateInput!
      where: SecurityQuestionWhereUniqueInput!
    ): SecurityQuestion
    updateManySecurityQuestions(
      data: SecurityQuestionUpdateManyMutationInput!
      where: SecurityQuestionWhereInput
    ): BatchPayload!
    upsertSecurityQuestion(
      where: SecurityQuestionWhereUniqueInput!
      create: SecurityQuestionCreateInput!
      update: SecurityQuestionUpdateInput!
    ): SecurityQuestion!
    deleteSecurityQuestion(
      where: SecurityQuestionWhereUniqueInput!
    ): SecurityQuestion
    deleteManySecurityQuestions(
      where: SecurityQuestionWhereInput
    ): BatchPayload!
    createSecurityQuestionAnswer(
      data: SecurityQuestionAnswerCreateInput!
    ): SecurityQuestionAnswer!
    updateSecurityQuestionAnswer(
      data: SecurityQuestionAnswerUpdateInput!
      where: SecurityQuestionAnswerWhereUniqueInput!
    ): SecurityQuestionAnswer
    updateManySecurityQuestionAnswers(
      data: SecurityQuestionAnswerUpdateManyMutationInput!
      where: SecurityQuestionAnswerWhereInput
    ): BatchPayload!
    upsertSecurityQuestionAnswer(
      where: SecurityQuestionAnswerWhereUniqueInput!
      create: SecurityQuestionAnswerCreateInput!
      update: SecurityQuestionAnswerUpdateInput!
    ): SecurityQuestionAnswer!
    deleteSecurityQuestionAnswer(
      where: SecurityQuestionAnswerWhereUniqueInput!
    ): SecurityQuestionAnswer
    deleteManySecurityQuestionAnswers(
      where: SecurityQuestionAnswerWhereInput
    ): BatchPayload!
    createUser(data: UserCreateInput!): User!
    updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
    updateManyUsers(
      data: UserUpdateManyMutationInput!
      where: UserWhereInput
    ): BatchPayload!
    upsertUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User!
    deleteUser(where: UserWhereUniqueInput!): User
    deleteManyUsers(where: UserWhereInput): BatchPayload!
    createUserAccount(data: UserAccountCreateInput!): UserAccount!
    updateUserAccount(
      data: UserAccountUpdateInput!
      where: UserAccountWhereUniqueInput!
    ): UserAccount
    updateManyUserAccounts(
      data: UserAccountUpdateManyMutationInput!
      where: UserAccountWhereInput
    ): BatchPayload!
    upsertUserAccount(
      where: UserAccountWhereUniqueInput!
      create: UserAccountCreateInput!
      update: UserAccountUpdateInput!
    ): UserAccount!
    deleteUserAccount(where: UserAccountWhereUniqueInput!): UserAccount
    deleteManyUserAccounts(where: UserAccountWhereInput): BatchPayload!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    role(where: RoleWhereUniqueInput!): Role
    roles(
      where: RoleWhereInput
      orderBy: RoleOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Role]!
    rolesConnection(
      where: RoleWhereInput
      orderBy: RoleOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): RoleConnection!
    securityQuestion(where: SecurityQuestionWhereUniqueInput!): SecurityQuestion
    securityQuestions(
      where: SecurityQuestionWhereInput
      orderBy: SecurityQuestionOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [SecurityQuestion]!
    securityQuestionsConnection(
      where: SecurityQuestionWhereInput
      orderBy: SecurityQuestionOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): SecurityQuestionConnection!
    securityQuestionAnswer(
      where: SecurityQuestionAnswerWhereUniqueInput!
    ): SecurityQuestionAnswer
    securityQuestionAnswers(
      where: SecurityQuestionAnswerWhereInput
      orderBy: SecurityQuestionAnswerOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [SecurityQuestionAnswer]!
    securityQuestionAnswersConnection(
      where: SecurityQuestionAnswerWhereInput
      orderBy: SecurityQuestionAnswerOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): SecurityQuestionAnswerConnection!
    user(where: UserWhereUniqueInput!): User
    users(
      where: UserWhereInput
      orderBy: UserOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [User]!
    usersConnection(
      where: UserWhereInput
      orderBy: UserOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): UserConnection!
    userAccount(where: UserAccountWhereUniqueInput!): UserAccount
    userAccounts(
      where: UserAccountWhereInput
      orderBy: UserAccountOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [UserAccount]!
    userAccountsConnection(
      where: UserAccountWhereInput
      orderBy: UserAccountOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): UserAccountConnection!
    node(id: ID!): Node
  }

  type Role {
    id: ID!
    name: RoleName!
  }

  type RoleConnection {
    pageInfo: PageInfo!
    edges: [RoleEdge]!
    aggregate: AggregateRole!
  }

  input RoleCreateInput {
    name: RoleName!
  }

  input RoleCreateOneInput {
    create: RoleCreateInput
    connect: RoleWhereUniqueInput
  }

  type RoleEdge {
    node: Role!
    cursor: String!
  }

  enum RoleName {
    USER
  }

  enum RoleOrderByInput {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    createdAt_ASC
    createdAt_DESC
    updatedAt_ASC
    updatedAt_DESC
  }

  type RolePreviousValues {
    id: ID!
    name: RoleName!
  }

  type RoleSubscriptionPayload {
    mutation: MutationType!
    node: Role
    updatedFields: [String!]
    previousValues: RolePreviousValues
  }

  input RoleSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: RoleWhereInput
    AND: [RoleSubscriptionWhereInput!]
    OR: [RoleSubscriptionWhereInput!]
    NOT: [RoleSubscriptionWhereInput!]
  }

  input RoleUpdateDataInput {
    name: RoleName
  }

  input RoleUpdateInput {
    name: RoleName
  }

  input RoleUpdateManyMutationInput {
    name: RoleName
  }

  input RoleUpdateOneRequiredInput {
    create: RoleCreateInput
    update: RoleUpdateDataInput
    upsert: RoleUpsertNestedInput
    connect: RoleWhereUniqueInput
  }

  input RoleUpsertNestedInput {
    update: RoleUpdateDataInput!
    create: RoleCreateInput!
  }

  input RoleWhereInput {
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
    name: RoleName
    name_not: RoleName
    name_in: [RoleName!]
    name_not_in: [RoleName!]
    AND: [RoleWhereInput!]
    OR: [RoleWhereInput!]
    NOT: [RoleWhereInput!]
  }

  input RoleWhereUniqueInput {
    id: ID
    name: RoleName
  }

  type SecurityQuestion {
    id: ID!
    shortName: String!
    question: String!
  }

  type SecurityQuestionAnswer {
    id: ID!
    userAccount: UserAccount!
    userSecurityQuestion: SecurityQuestion!
    answer: String!
  }

  type SecurityQuestionAnswerConnection {
    pageInfo: PageInfo!
    edges: [SecurityQuestionAnswerEdge]!
    aggregate: AggregateSecurityQuestionAnswer!
  }

  input SecurityQuestionAnswerCreateInput {
    userAccount: UserAccountCreateOneWithoutSecurityQuestionsInput!
    userSecurityQuestion: SecurityQuestionCreateOneInput!
    answer: String!
  }

  input SecurityQuestionAnswerCreateManyWithoutUserAccountInput {
    create: [SecurityQuestionAnswerCreateWithoutUserAccountInput!]
    connect: [SecurityQuestionAnswerWhereUniqueInput!]
  }

  input SecurityQuestionAnswerCreateWithoutUserAccountInput {
    userSecurityQuestion: SecurityQuestionCreateOneInput!
    answer: String!
  }

  type SecurityQuestionAnswerEdge {
    node: SecurityQuestionAnswer!
    cursor: String!
  }

  enum SecurityQuestionAnswerOrderByInput {
    id_ASC
    id_DESC
    answer_ASC
    answer_DESC
    createdAt_ASC
    createdAt_DESC
    updatedAt_ASC
    updatedAt_DESC
  }

  type SecurityQuestionAnswerPreviousValues {
    id: ID!
    answer: String!
  }

  input SecurityQuestionAnswerScalarWhereInput {
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
    answer: String
    answer_not: String
    answer_in: [String!]
    answer_not_in: [String!]
    answer_lt: String
    answer_lte: String
    answer_gt: String
    answer_gte: String
    answer_contains: String
    answer_not_contains: String
    answer_starts_with: String
    answer_not_starts_with: String
    answer_ends_with: String
    answer_not_ends_with: String
    AND: [SecurityQuestionAnswerScalarWhereInput!]
    OR: [SecurityQuestionAnswerScalarWhereInput!]
    NOT: [SecurityQuestionAnswerScalarWhereInput!]
  }

  type SecurityQuestionAnswerSubscriptionPayload {
    mutation: MutationType!
    node: SecurityQuestionAnswer
    updatedFields: [String!]
    previousValues: SecurityQuestionAnswerPreviousValues
  }

  input SecurityQuestionAnswerSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: SecurityQuestionAnswerWhereInput
    AND: [SecurityQuestionAnswerSubscriptionWhereInput!]
    OR: [SecurityQuestionAnswerSubscriptionWhereInput!]
    NOT: [SecurityQuestionAnswerSubscriptionWhereInput!]
  }

  input SecurityQuestionAnswerUpdateInput {
    userAccount: UserAccountUpdateOneRequiredWithoutSecurityQuestionsInput
    userSecurityQuestion: SecurityQuestionUpdateOneRequiredInput
    answer: String
  }

  input SecurityQuestionAnswerUpdateManyDataInput {
    answer: String
  }

  input SecurityQuestionAnswerUpdateManyMutationInput {
    answer: String
  }

  input SecurityQuestionAnswerUpdateManyWithoutUserAccountInput {
    create: [SecurityQuestionAnswerCreateWithoutUserAccountInput!]
    delete: [SecurityQuestionAnswerWhereUniqueInput!]
    connect: [SecurityQuestionAnswerWhereUniqueInput!]
    set: [SecurityQuestionAnswerWhereUniqueInput!]
    disconnect: [SecurityQuestionAnswerWhereUniqueInput!]
    update: [SecurityQuestionAnswerUpdateWithWhereUniqueWithoutUserAccountInput!]
    upsert: [SecurityQuestionAnswerUpsertWithWhereUniqueWithoutUserAccountInput!]
    deleteMany: [SecurityQuestionAnswerScalarWhereInput!]
    updateMany: [SecurityQuestionAnswerUpdateManyWithWhereNestedInput!]
  }

  input SecurityQuestionAnswerUpdateManyWithWhereNestedInput {
    where: SecurityQuestionAnswerScalarWhereInput!
    data: SecurityQuestionAnswerUpdateManyDataInput!
  }

  input SecurityQuestionAnswerUpdateWithoutUserAccountDataInput {
    userSecurityQuestion: SecurityQuestionUpdateOneRequiredInput
    answer: String
  }

  input SecurityQuestionAnswerUpdateWithWhereUniqueWithoutUserAccountInput {
    where: SecurityQuestionAnswerWhereUniqueInput!
    data: SecurityQuestionAnswerUpdateWithoutUserAccountDataInput!
  }

  input SecurityQuestionAnswerUpsertWithWhereUniqueWithoutUserAccountInput {
    where: SecurityQuestionAnswerWhereUniqueInput!
    update: SecurityQuestionAnswerUpdateWithoutUserAccountDataInput!
    create: SecurityQuestionAnswerCreateWithoutUserAccountInput!
  }

  input SecurityQuestionAnswerWhereInput {
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
    userAccount: UserAccountWhereInput
    userSecurityQuestion: SecurityQuestionWhereInput
    answer: String
    answer_not: String
    answer_in: [String!]
    answer_not_in: [String!]
    answer_lt: String
    answer_lte: String
    answer_gt: String
    answer_gte: String
    answer_contains: String
    answer_not_contains: String
    answer_starts_with: String
    answer_not_starts_with: String
    answer_ends_with: String
    answer_not_ends_with: String
    AND: [SecurityQuestionAnswerWhereInput!]
    OR: [SecurityQuestionAnswerWhereInput!]
    NOT: [SecurityQuestionAnswerWhereInput!]
  }

  input SecurityQuestionAnswerWhereUniqueInput {
    id: ID
  }

  type SecurityQuestionConnection {
    pageInfo: PageInfo!
    edges: [SecurityQuestionEdge]!
    aggregate: AggregateSecurityQuestion!
  }

  input SecurityQuestionCreateInput {
    shortName: String!
    question: String!
  }

  input SecurityQuestionCreateOneInput {
    create: SecurityQuestionCreateInput
    connect: SecurityQuestionWhereUniqueInput
  }

  type SecurityQuestionEdge {
    node: SecurityQuestion!
    cursor: String!
  }

  enum SecurityQuestionOrderByInput {
    id_ASC
    id_DESC
    shortName_ASC
    shortName_DESC
    question_ASC
    question_DESC
    createdAt_ASC
    createdAt_DESC
    updatedAt_ASC
    updatedAt_DESC
  }

  type SecurityQuestionPreviousValues {
    id: ID!
    shortName: String!
    question: String!
  }

  type SecurityQuestionSubscriptionPayload {
    mutation: MutationType!
    node: SecurityQuestion
    updatedFields: [String!]
    previousValues: SecurityQuestionPreviousValues
  }

  input SecurityQuestionSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: SecurityQuestionWhereInput
    AND: [SecurityQuestionSubscriptionWhereInput!]
    OR: [SecurityQuestionSubscriptionWhereInput!]
    NOT: [SecurityQuestionSubscriptionWhereInput!]
  }

  input SecurityQuestionUpdateDataInput {
    shortName: String
    question: String
  }

  input SecurityQuestionUpdateInput {
    shortName: String
    question: String
  }

  input SecurityQuestionUpdateManyMutationInput {
    shortName: String
    question: String
  }

  input SecurityQuestionUpdateOneRequiredInput {
    create: SecurityQuestionCreateInput
    update: SecurityQuestionUpdateDataInput
    upsert: SecurityQuestionUpsertNestedInput
    connect: SecurityQuestionWhereUniqueInput
  }

  input SecurityQuestionUpsertNestedInput {
    update: SecurityQuestionUpdateDataInput!
    create: SecurityQuestionCreateInput!
  }

  input SecurityQuestionWhereInput {
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
    shortName: String
    shortName_not: String
    shortName_in: [String!]
    shortName_not_in: [String!]
    shortName_lt: String
    shortName_lte: String
    shortName_gt: String
    shortName_gte: String
    shortName_contains: String
    shortName_not_contains: String
    shortName_starts_with: String
    shortName_not_starts_with: String
    shortName_ends_with: String
    shortName_not_ends_with: String
    question: String
    question_not: String
    question_in: [String!]
    question_not_in: [String!]
    question_lt: String
    question_lte: String
    question_gt: String
    question_gte: String
    question_contains: String
    question_not_contains: String
    question_starts_with: String
    question_not_starts_with: String
    question_ends_with: String
    question_not_ends_with: String
    AND: [SecurityQuestionWhereInput!]
    OR: [SecurityQuestionWhereInput!]
    NOT: [SecurityQuestionWhereInput!]
  }

  input SecurityQuestionWhereUniqueInput {
    id: ID
    shortName: String
  }

  type Subscription {
    role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
    securityQuestion(
      where: SecurityQuestionSubscriptionWhereInput
    ): SecurityQuestionSubscriptionPayload
    securityQuestionAnswer(
      where: SecurityQuestionAnswerSubscriptionWhereInput
    ): SecurityQuestionAnswerSubscriptionPayload
    user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
    userAccount(
      where: UserAccountSubscriptionWhereInput
    ): UserAccountSubscriptionPayload
  }

  type User {
    id: ID!
    role: Role!
    userAccount: UserAccount!
    firstName: String
    lastName: String
    email: String!
    password: String!
    phoneCountryCode: String
    phone: String
    updatedAt: DateTime!
    createdAt: DateTime!
    deletedAt: DateTime
  }

  type UserAccount {
    id: ID!
    user: User!
    confirmed: Boolean!
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean!
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    securityQuestions(
      where: SecurityQuestionAnswerWhereInput
      orderBy: SecurityQuestionAnswerOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [SecurityQuestionAnswer!]
    loginAttempts: Int!
    securityQuestionAttempts: Int!
    lastVisit: DateTime
    ip: String
    updatedAt: DateTime!
    createdAt: DateTime!
    deletedAt: DateTime
  }

  type UserAccountConnection {
    pageInfo: PageInfo!
    edges: [UserAccountEdge]!
    aggregate: AggregateUserAccount!
  }

  input UserAccountCreateInput {
    user: UserCreateOneWithoutUserAccountInput!
    confirmed: Boolean
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    securityQuestions: SecurityQuestionAnswerCreateManyWithoutUserAccountInput
    loginAttempts: Int
    securityQuestionAttempts: Int
    lastVisit: DateTime
    ip: String
    deletedAt: DateTime
  }

  input UserAccountCreateOneWithoutSecurityQuestionsInput {
    create: UserAccountCreateWithoutSecurityQuestionsInput
    connect: UserAccountWhereUniqueInput
  }

  input UserAccountCreateOneWithoutUserInput {
    create: UserAccountCreateWithoutUserInput
    connect: UserAccountWhereUniqueInput
  }

  input UserAccountCreateWithoutSecurityQuestionsInput {
    user: UserCreateOneWithoutUserAccountInput!
    confirmed: Boolean
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    loginAttempts: Int
    securityQuestionAttempts: Int
    lastVisit: DateTime
    ip: String
    deletedAt: DateTime
  }

  input UserAccountCreateWithoutUserInput {
    confirmed: Boolean
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    securityQuestions: SecurityQuestionAnswerCreateManyWithoutUserAccountInput
    loginAttempts: Int
    securityQuestionAttempts: Int
    lastVisit: DateTime
    ip: String
    deletedAt: DateTime
  }

  type UserAccountEdge {
    node: UserAccount!
    cursor: String!
  }

  enum UserAccountOrderByInput {
    id_ASC
    id_DESC
    confirmed_ASC
    confirmed_DESC
    confirmedCode_ASC
    confirmedCode_DESC
    confirmedExpires_ASC
    confirmedExpires_DESC
    locked_ASC
    locked_DESC
    lockedCode_ASC
    lockedCode_DESC
    lockedExpires_ASC
    lockedExpires_DESC
    resetPasswordCode_ASC
    resetPasswordCode_DESC
    resetPasswordExpires_ASC
    resetPasswordExpires_DESC
    loginAttempts_ASC
    loginAttempts_DESC
    securityQuestionAttempts_ASC
    securityQuestionAttempts_DESC
    lastVisit_ASC
    lastVisit_DESC
    ip_ASC
    ip_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
    deletedAt_ASC
    deletedAt_DESC
  }

  type UserAccountPreviousValues {
    id: ID!
    confirmed: Boolean!
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean!
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    loginAttempts: Int!
    securityQuestionAttempts: Int!
    lastVisit: DateTime
    ip: String
    updatedAt: DateTime!
    createdAt: DateTime!
    deletedAt: DateTime
  }

  type UserAccountSubscriptionPayload {
    mutation: MutationType!
    node: UserAccount
    updatedFields: [String!]
    previousValues: UserAccountPreviousValues
  }

  input UserAccountSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: UserAccountWhereInput
    AND: [UserAccountSubscriptionWhereInput!]
    OR: [UserAccountSubscriptionWhereInput!]
    NOT: [UserAccountSubscriptionWhereInput!]
  }

  input UserAccountUpdateInput {
    user: UserUpdateOneRequiredWithoutUserAccountInput
    confirmed: Boolean
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    securityQuestions: SecurityQuestionAnswerUpdateManyWithoutUserAccountInput
    loginAttempts: Int
    securityQuestionAttempts: Int
    lastVisit: DateTime
    ip: String
    deletedAt: DateTime
  }

  input UserAccountUpdateManyMutationInput {
    confirmed: Boolean
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    loginAttempts: Int
    securityQuestionAttempts: Int
    lastVisit: DateTime
    ip: String
    deletedAt: DateTime
  }

  input UserAccountUpdateOneRequiredWithoutSecurityQuestionsInput {
    create: UserAccountCreateWithoutSecurityQuestionsInput
    update: UserAccountUpdateWithoutSecurityQuestionsDataInput
    upsert: UserAccountUpsertWithoutSecurityQuestionsInput
    connect: UserAccountWhereUniqueInput
  }

  input UserAccountUpdateOneRequiredWithoutUserInput {
    create: UserAccountCreateWithoutUserInput
    update: UserAccountUpdateWithoutUserDataInput
    upsert: UserAccountUpsertWithoutUserInput
    connect: UserAccountWhereUniqueInput
  }

  input UserAccountUpdateWithoutSecurityQuestionsDataInput {
    user: UserUpdateOneRequiredWithoutUserAccountInput
    confirmed: Boolean
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    loginAttempts: Int
    securityQuestionAttempts: Int
    lastVisit: DateTime
    ip: String
    deletedAt: DateTime
  }

  input UserAccountUpdateWithoutUserDataInput {
    confirmed: Boolean
    confirmedCode: Int
    confirmedExpires: String
    locked: Boolean
    lockedCode: Int
    lockedExpires: String
    resetPasswordCode: Int
    resetPasswordExpires: String
    securityQuestions: SecurityQuestionAnswerUpdateManyWithoutUserAccountInput
    loginAttempts: Int
    securityQuestionAttempts: Int
    lastVisit: DateTime
    ip: String
    deletedAt: DateTime
  }

  input UserAccountUpsertWithoutSecurityQuestionsInput {
    update: UserAccountUpdateWithoutSecurityQuestionsDataInput!
    create: UserAccountCreateWithoutSecurityQuestionsInput!
  }

  input UserAccountUpsertWithoutUserInput {
    update: UserAccountUpdateWithoutUserDataInput!
    create: UserAccountCreateWithoutUserInput!
  }

  input UserAccountWhereInput {
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
    user: UserWhereInput
    confirmed: Boolean
    confirmed_not: Boolean
    confirmedCode: Int
    confirmedCode_not: Int
    confirmedCode_in: [Int!]
    confirmedCode_not_in: [Int!]
    confirmedCode_lt: Int
    confirmedCode_lte: Int
    confirmedCode_gt: Int
    confirmedCode_gte: Int
    confirmedExpires: String
    confirmedExpires_not: String
    confirmedExpires_in: [String!]
    confirmedExpires_not_in: [String!]
    confirmedExpires_lt: String
    confirmedExpires_lte: String
    confirmedExpires_gt: String
    confirmedExpires_gte: String
    confirmedExpires_contains: String
    confirmedExpires_not_contains: String
    confirmedExpires_starts_with: String
    confirmedExpires_not_starts_with: String
    confirmedExpires_ends_with: String
    confirmedExpires_not_ends_with: String
    locked: Boolean
    locked_not: Boolean
    lockedCode: Int
    lockedCode_not: Int
    lockedCode_in: [Int!]
    lockedCode_not_in: [Int!]
    lockedCode_lt: Int
    lockedCode_lte: Int
    lockedCode_gt: Int
    lockedCode_gte: Int
    lockedExpires: String
    lockedExpires_not: String
    lockedExpires_in: [String!]
    lockedExpires_not_in: [String!]
    lockedExpires_lt: String
    lockedExpires_lte: String
    lockedExpires_gt: String
    lockedExpires_gte: String
    lockedExpires_contains: String
    lockedExpires_not_contains: String
    lockedExpires_starts_with: String
    lockedExpires_not_starts_with: String
    lockedExpires_ends_with: String
    lockedExpires_not_ends_with: String
    resetPasswordCode: Int
    resetPasswordCode_not: Int
    resetPasswordCode_in: [Int!]
    resetPasswordCode_not_in: [Int!]
    resetPasswordCode_lt: Int
    resetPasswordCode_lte: Int
    resetPasswordCode_gt: Int
    resetPasswordCode_gte: Int
    resetPasswordExpires: String
    resetPasswordExpires_not: String
    resetPasswordExpires_in: [String!]
    resetPasswordExpires_not_in: [String!]
    resetPasswordExpires_lt: String
    resetPasswordExpires_lte: String
    resetPasswordExpires_gt: String
    resetPasswordExpires_gte: String
    resetPasswordExpires_contains: String
    resetPasswordExpires_not_contains: String
    resetPasswordExpires_starts_with: String
    resetPasswordExpires_not_starts_with: String
    resetPasswordExpires_ends_with: String
    resetPasswordExpires_not_ends_with: String
    securityQuestions_every: SecurityQuestionAnswerWhereInput
    securityQuestions_some: SecurityQuestionAnswerWhereInput
    securityQuestions_none: SecurityQuestionAnswerWhereInput
    loginAttempts: Int
    loginAttempts_not: Int
    loginAttempts_in: [Int!]
    loginAttempts_not_in: [Int!]
    loginAttempts_lt: Int
    loginAttempts_lte: Int
    loginAttempts_gt: Int
    loginAttempts_gte: Int
    securityQuestionAttempts: Int
    securityQuestionAttempts_not: Int
    securityQuestionAttempts_in: [Int!]
    securityQuestionAttempts_not_in: [Int!]
    securityQuestionAttempts_lt: Int
    securityQuestionAttempts_lte: Int
    securityQuestionAttempts_gt: Int
    securityQuestionAttempts_gte: Int
    lastVisit: DateTime
    lastVisit_not: DateTime
    lastVisit_in: [DateTime!]
    lastVisit_not_in: [DateTime!]
    lastVisit_lt: DateTime
    lastVisit_lte: DateTime
    lastVisit_gt: DateTime
    lastVisit_gte: DateTime
    ip: String
    ip_not: String
    ip_in: [String!]
    ip_not_in: [String!]
    ip_lt: String
    ip_lte: String
    ip_gt: String
    ip_gte: String
    ip_contains: String
    ip_not_contains: String
    ip_starts_with: String
    ip_not_starts_with: String
    ip_ends_with: String
    ip_not_ends_with: String
    updatedAt: DateTime
    updatedAt_not: DateTime
    updatedAt_in: [DateTime!]
    updatedAt_not_in: [DateTime!]
    updatedAt_lt: DateTime
    updatedAt_lte: DateTime
    updatedAt_gt: DateTime
    updatedAt_gte: DateTime
    createdAt: DateTime
    createdAt_not: DateTime
    createdAt_in: [DateTime!]
    createdAt_not_in: [DateTime!]
    createdAt_lt: DateTime
    createdAt_lte: DateTime
    createdAt_gt: DateTime
    createdAt_gte: DateTime
    deletedAt: DateTime
    deletedAt_not: DateTime
    deletedAt_in: [DateTime!]
    deletedAt_not_in: [DateTime!]
    deletedAt_lt: DateTime
    deletedAt_lte: DateTime
    deletedAt_gt: DateTime
    deletedAt_gte: DateTime
    AND: [UserAccountWhereInput!]
    OR: [UserAccountWhereInput!]
    NOT: [UserAccountWhereInput!]
  }

  input UserAccountWhereUniqueInput {
    id: ID
    confirmedCode: Int
    lockedCode: Int
    resetPasswordCode: Int
  }

  type UserConnection {
    pageInfo: PageInfo!
    edges: [UserEdge]!
    aggregate: AggregateUser!
  }

  input UserCreateInput {
    role: RoleCreateOneInput!
    userAccount: UserAccountCreateOneWithoutUserInput!
    firstName: String
    lastName: String
    email: String!
    password: String!
    phoneCountryCode: String
    phone: String
    deletedAt: DateTime
  }

  input UserCreateOneWithoutUserAccountInput {
    create: UserCreateWithoutUserAccountInput
    connect: UserWhereUniqueInput
  }

  input UserCreateWithoutUserAccountInput {
    role: RoleCreateOneInput!
    firstName: String
    lastName: String
    email: String!
    password: String!
    phoneCountryCode: String
    phone: String
    deletedAt: DateTime
  }

  type UserEdge {
    node: User!
    cursor: String!
  }

  enum UserOrderByInput {
    id_ASC
    id_DESC
    firstName_ASC
    firstName_DESC
    lastName_ASC
    lastName_DESC
    email_ASC
    email_DESC
    password_ASC
    password_DESC
    phoneCountryCode_ASC
    phoneCountryCode_DESC
    phone_ASC
    phone_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
    deletedAt_ASC
    deletedAt_DESC
  }

  type UserPreviousValues {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    phoneCountryCode: String
    phone: String
    updatedAt: DateTime!
    createdAt: DateTime!
    deletedAt: DateTime
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

  input UserUpdateInput {
    role: RoleUpdateOneRequiredInput
    userAccount: UserAccountUpdateOneRequiredWithoutUserInput
    firstName: String
    lastName: String
    email: String
    password: String
    phoneCountryCode: String
    phone: String
    deletedAt: DateTime
  }

  input UserUpdateManyMutationInput {
    firstName: String
    lastName: String
    email: String
    password: String
    phoneCountryCode: String
    phone: String
    deletedAt: DateTime
  }

  input UserUpdateOneRequiredWithoutUserAccountInput {
    create: UserCreateWithoutUserAccountInput
    update: UserUpdateWithoutUserAccountDataInput
    upsert: UserUpsertWithoutUserAccountInput
    connect: UserWhereUniqueInput
  }

  input UserUpdateWithoutUserAccountDataInput {
    role: RoleUpdateOneRequiredInput
    firstName: String
    lastName: String
    email: String
    password: String
    phoneCountryCode: String
    phone: String
    deletedAt: DateTime
  }

  input UserUpsertWithoutUserAccountInput {
    update: UserUpdateWithoutUserAccountDataInput!
    create: UserCreateWithoutUserAccountInput!
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
    role: RoleWhereInput
    userAccount: UserAccountWhereInput
    firstName: String
    firstName_not: String
    firstName_in: [String!]
    firstName_not_in: [String!]
    firstName_lt: String
    firstName_lte: String
    firstName_gt: String
    firstName_gte: String
    firstName_contains: String
    firstName_not_contains: String
    firstName_starts_with: String
    firstName_not_starts_with: String
    firstName_ends_with: String
    firstName_not_ends_with: String
    lastName: String
    lastName_not: String
    lastName_in: [String!]
    lastName_not_in: [String!]
    lastName_lt: String
    lastName_lte: String
    lastName_gt: String
    lastName_gte: String
    lastName_contains: String
    lastName_not_contains: String
    lastName_starts_with: String
    lastName_not_starts_with: String
    lastName_ends_with: String
    lastName_not_ends_with: String
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
    phoneCountryCode: String
    phoneCountryCode_not: String
    phoneCountryCode_in: [String!]
    phoneCountryCode_not_in: [String!]
    phoneCountryCode_lt: String
    phoneCountryCode_lte: String
    phoneCountryCode_gt: String
    phoneCountryCode_gte: String
    phoneCountryCode_contains: String
    phoneCountryCode_not_contains: String
    phoneCountryCode_starts_with: String
    phoneCountryCode_not_starts_with: String
    phoneCountryCode_ends_with: String
    phoneCountryCode_not_ends_with: String
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
    updatedAt: DateTime
    updatedAt_not: DateTime
    updatedAt_in: [DateTime!]
    updatedAt_not_in: [DateTime!]
    updatedAt_lt: DateTime
    updatedAt_lte: DateTime
    updatedAt_gt: DateTime
    updatedAt_gte: DateTime
    createdAt: DateTime
    createdAt_not: DateTime
    createdAt_in: [DateTime!]
    createdAt_not_in: [DateTime!]
    createdAt_lt: DateTime
    createdAt_lte: DateTime
    createdAt_gt: DateTime
    createdAt_gte: DateTime
    deletedAt: DateTime
    deletedAt_not: DateTime
    deletedAt_in: [DateTime!]
    deletedAt_not_in: [DateTime!]
    deletedAt_lt: DateTime
    deletedAt_lte: DateTime
    deletedAt_gt: DateTime
    deletedAt_gte: DateTime
    AND: [UserWhereInput!]
    OR: [UserWhereInput!]
    NOT: [UserWhereInput!]
  }

  input UserWhereUniqueInput {
    id: ID
    email: String
  }
`;
