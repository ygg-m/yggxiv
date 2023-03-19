import { FreeCompanyFull } from "../Types";

function saveToLocalStorage(key: string, value: object | string[] | string) {
  // Check if value is an object
  if (typeof value === "object") {
    // Convert object to JSON string
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

function loadFromLocalStorage(key: string) {
  let value = localStorage.getItem(key);
  // Check if value needs to be parsed
  if (value && value.charAt(0) === "{") {
    // Parse JSON string to object
    value = JSON.parse(value);
  }
  return value;
}

export { saveToLocalStorage, loadFromLocalStorage };
