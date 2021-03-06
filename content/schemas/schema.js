// First, we must import the schema creator
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import comment from './documents/comment';
import listing from './documents/listing';
import save from './documents/save';
import user from './documents/user';
import postedBy from './objects/postedBy';

// Then import schema types from any plugins that might expose them
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /*Enter Your types here! */
    comment,
    listing,
    postedBy,
    save,
    user,
  ]),
});
