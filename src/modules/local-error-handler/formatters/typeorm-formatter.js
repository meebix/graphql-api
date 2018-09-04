import objectPath from 'object-path';

/**
 * Format the error according to MySQL
 *
 * @function
 * @param {Object} err - The error from MySQL
 * @returns {Object} - Decorated Error object
 */
function mysqlError(err) {
  const error = err;
  const statusCode = 500;
  const code = objectPath.get(error, 'code', 'MYSQL_ERROR');
  const errno = objectPath.get(error, 'errno', undefined);
  const sqlState = objectPath.get(error, 'sqlState', undefined);

  error.statusCode = statusCode;
  error.jsonResponse = [{
    statusCode,
    message: error.sqlMessage,
    code,
    meta: { errno, sqlState },
  }];

  return error;
}

export default mysqlError;
