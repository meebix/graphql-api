"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const {
  print
} = require('graphql');

class BasicLogging {
  requestDidStart({
    queryString,
    parsedQuery,
    variables
  }) {
    const query = queryString || print(parsedQuery);
    console.log(query);
    console.log(variables);
  }

  willSendResponse({
    graphqlResponse
  }) {
    console.log(JSON.stringify(graphqlResponse, null, 2));
  }

}

exports.default = BasicLogging;