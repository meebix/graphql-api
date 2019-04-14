"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmail = void 0;
const isEmail = yup.object({
  email: yup.string().email('It has to be an email!').required()
});
exports.isEmail = isEmail;