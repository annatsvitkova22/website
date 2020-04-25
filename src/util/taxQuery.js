//TODO: implement
export const composeTaxQuery = (...taxonomies) => {
  const realTaxes = taxonomies.filter((tax) => tax.terms);
  if (!realTaxes.length) return ``;

  const result = `taxArray: [
              ${realTaxes.map(
                ({ terms, type, field = 'slug', operator = 'in' }) => {
                  return `{
                terms: "${terms}"
                taxonomy: ${type.toUpperCase()}
                operator: ${operator.toUpperCase()}
                field: ${field.toUpperCase()}
              }`;
                }
              )}
            ]`;

  return result;
};
