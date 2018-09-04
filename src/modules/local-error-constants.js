/**
 * MISSING_BODY
 *
 * @description Required inputs are missing from req.body
 */
export const MISSING_BODY = {
  name: 'AppError',
  message: 'Required inputs are missing from req.body',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'Required inputs are missing from req.body',
    code: 'MISSING_BODY',
  }],
};

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
 * PROFILE_NOT_FOUND
 *
 * @description The user's profile was not found in the database
 * @param {Object} meta - More details about the error
 */
export const PROFILE_NOT_FOUND = meta => ({
  name: 'AppError',
  message: 'The user\'s profile was not found',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'The user\'s profile was not found',
    code: 'PROFILE_NOT_FOUND',
    meta,
  }],
});

/**
 * CODE_NOT_FOUND
 *
 * @description The MFA code was not found in the database
 * @param {Object} meta - More details about the error
 */
export const CODE_NOT_FOUND = meta => ({
  name: 'AppError',
  message: 'The code was not found',
  statusCode: 400,
  errors: [{
    statusCode: 400,
    message: 'The code was not found',
    code: 'CODE_NOT_FOUND',
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
