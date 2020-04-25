//TODO: implement
export const composeTaxQuery = (relation, ...taxonomies) => {
  return `taxQuery: {taxArray: ${taxonomies.map(taxonomy => {
    return `{field: ${taxonomy.field}, operator: ${taxonomy.operator},
    taxonomy: ${taxonomy.taxonomy}', terms: ${taxonomy.terms.map(term => )}`;
  })}, relation: ${relation}`;
};
