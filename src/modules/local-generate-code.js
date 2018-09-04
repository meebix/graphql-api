/**
 * Generates a random 8 digit integer
 *
 * @description Used to generate codes for MFA scenarios.
 * @function
 * @returns {Integer} - An 8 digit integer
 */
export default () => Math.floor(Math.random() * 90000000) + 10000000;
