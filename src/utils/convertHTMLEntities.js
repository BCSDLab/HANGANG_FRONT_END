/**
 * HTML Entity 를 변환시켜줍니다.
 */
export const convertHTMLEntities = (string) => {
  const target = HTMLEntities.reduce((acc, { entityName, result }) => {
    acc = acc.replaceAll(entityName, result);
    return acc;
  }, string);

  return target;
};

const HTMLEntities = [
  { entityName: "&lt;", result: "<" },
  { entityName: "&gt;", result: ">" },
  { entityName: "&amp;", result: "&" },
  { entityName: "&quot;", result: '"' },
  { entityName: "&apos;", result: "'" },
];
