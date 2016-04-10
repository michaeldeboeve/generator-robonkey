'use strict';

// Matches answer in array
function hasFeature(feat, query) {
  return query && query.indexOf(feat) !== -1;
};

module.exports = hasFeature;
