/**
 * USER_NOT_FOUND
 *
 * @description The user was not found in the database
 * @param {Object} meta - More details about the error
 */
export const USER_NOT_FOUND = meta => ({
  name: 'AppError',
  message: 'The user was not found',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'The user was not found',
    code: 'USER_NOT_FOUND',
    meta,
  }],
});

/**
 * TOKEN_NOT_FOUND
 *
 * @description The token was not found in the database
 * @param {Object} meta - More details about the error
 */
export const TOKEN_NOT_FOUND = meta => ({
  name: 'AppError',
  message: 'The token was not found',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'The token was not found',
    code: 'TOKEN_NOT_FOUND',
    meta,
  }],
});

/**
 * TOKEN_EXPIRED
 *
 * @description The token was found, but has expired
 * @param {Object} meta - More details about the error
 */
export const TOKEN_EXPIRED = meta => ({
  name: 'AppError',
  message: 'The token has expired',
  statusCode: 401,
  errors: [{
    statusCode: 401,
    message: 'The token has expired',
    code: 'TOKEN_EXPIRED',
    meta,
  }],
});

/**
 * INVALID_TOKEN_TYPE
 *
 * @description The token type specified was invalid
 * @param {Object} meta - More details about the error
 */
export const INVALID_TOKEN_TYPE = meta => ({
  name: 'AppError',
  message: 'The token type is invalid',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'The token type is invalid',
    code: 'INVALID_TOKEN_TYPE',
    meta,
  }],
});

/**
 * TYPEORM_ERRORS
 *
 * @description An array of all possible error names from TypeORM
 */
export const TYPEORM_ERRORS = [
  'AlreadyHasActiveConnectionError',
  'CannotAttachTreeChildrenEntityError',
  'CannotConnectAlreadyConnectedError',
  'CannotCreateEntityIdMapError',
  'CannotDetermineEntityError',
  'CannotExecuteNotConnectedError',
  'CannotGetEntityManagerNotConnectedError',
  'CannotReflectMethodParameterTypeError',
  'CircularRelationsError',
  'ColumnTypeUndefinedError',
  'ConnectionIsNotSetError',
  'ConnectionNotFoundError',
  'CustomRepositoryCannotInheritRepositoryError',
  'CustomRepositoryDoesNotHaveEntityError',
  'CustomRepositoryNotFoundError',
  'DataTypeNotSupportedError',
  'DriverOptionNotSetError',
  'DriverPackageNotInstalledError',
  'EntityMetadataNotFoundError',
  'EntityNotFoundError',
  'FindRelationsNotFoundError',
  'InitializedRelationError',
  'InsertValuesMissingError',
  'LimitOnUpdateNotSupportedError',
  'LockNotSupportedOnGivenDriverError',
  'MetadataAlreadyExistsError',
  'MetadataWithSuchNameAlreadyExistsError',
  'MissingDriverError',
  'MissingJoinColumnError',
  'MissingJoinTableError',
  'MissingPrimaryColumnError',
  'MustBeEntityError',
  'NamingStrategyNotFoundError',
  'NoConnectionForRepositoryError',
  'NoConnectionOptionError',
  'NoNeedToReleaseEntityManagerError',
  'NoVersionOrUpdateDateColumnError',
  'OffsetWithoutLimitNotSupportedError',
  'OptimisticLockCanNotBeUsedError',
  'OptimisticLockVersionMismatchError',
  'PersistedEntityNotFoundError',
  'PessimisticLockTransactionRequiredError',
  'PrimaryColumnCannotBeNullableError',
  'QueryFailedError',
  'QueryRunnerAlreadyReleasedError',
  'QueryRunnerProviderAlreadyReleasedError',
  'RepositoryNotFoundError',
  'RepositoryNotTreeError',
  'ReturningStatementNotSupportedError',
  'SubjectRemovedAndUpdatedError',
  'SubjectWithoutIdentifierError',
  'TransactionAlreadyStartedError',
  'TransactionNotStartedError',
  'TreeRepositoryNotSupportedError',
  'UsingJoinColumnIsNotAllowedError',
  'UsingJoinColumnOnlyOnOneSideAllowedError',
  'UsingJoinTableIsNotAllowedError',
  'UsingJoinTableOnlyOnOneSideAllowedError',
];
