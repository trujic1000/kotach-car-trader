// helper function to transform data that comes from sanity api
// accepts result set from the api, and the property
export const transformData = ({res, prop}) => {
  // create a map of distinct property fields and their counts
  // prop => count
  const map = res.reduce(
    (acc, curr) => acc.set(curr[prop], (acc.get(curr[prop]) || 0) + 1),
    new Map(),
  );
  // 1. transform map to array of arrays [[make, count], ...]
  // 2. transform array of arrays to array of objects [{make, count}, ...]
  const data = [...map.entries()].reduce((acc, [property, count]) => {
    const obj = {
      [prop]: property,
      count,
    };
    return [...acc, obj];
  }, []);
  return data;
};
