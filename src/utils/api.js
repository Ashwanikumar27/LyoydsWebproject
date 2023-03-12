export const fetchSuggestions = (searchTerm) => {
  try {
  return fetch(`http://localhost:3001/search?q=${searchTerm}`).then((res) => res.json());
  } catch (error) {
    console.log('Unable to fetchSuggestions', JSON.stringify(error))
    throw error
  }
};

export const fetchProductDetail = (id) => {
  return fetch(`http://localhost:3001/products/${id}`).then((res) => res.json());
};
