"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

class QueryLogger {
  requestDidStart(o) {
    const query = o.queryString || (0, _graphql.print)(o.parsedQuery);
    console.log(query);
    console.log(o.variables);
  }

  willSendResponse(o) {
    console.log(JSON.stringify(o.graphqlResponse, null, 2));
  }

}

exports.default = QueryLogger;