import slugify from 'slugify';

const makeIdSlug = string =>
  slugify(string, { remove: /[*+~.()'"!:@]/g, lower: true });

const makeId = id => id.match(/[a-zA-Z0-9]+$/)[0];

export { makeIdSlug, makeId };
