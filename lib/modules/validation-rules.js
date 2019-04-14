"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmail = void 0;

const isEmail = yup => yup.object({
  email: yup.string().email('Please enter a valid email').required()
});

exports.isEmail = isEmail;