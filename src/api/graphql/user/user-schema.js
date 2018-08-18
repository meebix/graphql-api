import { readFileSync } from 'fs';
import { join } from 'path';

const userTypes = readFileSync(join(__dirname, 'user-types.graphql'), 'utf8');
const userQueries = readFileSync(join(__dirname, 'user-queries.graphql'), 'utf8');
const userMutations = readFileSync(join(__dirname, 'user-mutations.graphql'), 'utf8');
const userTypesDef = `${userTypes} ${userQueries} ${userMutations}`;

export default userTypesDef;
