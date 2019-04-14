import logger from '@modules/logger';

const resolverLogger = (resolve, parent, args, context, info) => {
  logger.info({ args }, `Metadata for resolver: ${info.fieldName}`);

  return resolve();
};

export default resolverLogger;
