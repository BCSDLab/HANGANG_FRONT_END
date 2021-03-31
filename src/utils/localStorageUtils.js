export const setValueOnLocalStorage = (key, value) => {
  let val = JSON.stringify(value);
  localStorage.setItem(key, val);
};

export const getValueOnLocalStorage = (key) => {
  let val = localStorage.getItem(key);
  return JSON.parse(val);
};

export const removeValueOnLocalStorage = (key) => {
  localStorage.removeItem(key);
};
