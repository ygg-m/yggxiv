type LocalStorageData = {
  [key: string]: any;
};

const saveToLocalStorage = (key: string, data: LocalStorageData): void => {
  const serializedData = JSON.stringify(data);
  localStorage.setItem(key, serializedData);
};

const loadFromLocalStorage = (key: string): LocalStorageData | null => {
  const serializedData = localStorage.getItem(key);
  if (serializedData) {
    return JSON.parse(serializedData);
  }
  return null;
};

export { saveToLocalStorage, loadFromLocalStorage };
