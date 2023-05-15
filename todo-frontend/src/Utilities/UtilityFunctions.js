export function getAPIUrl() {
  return process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_BASE_URL;
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
