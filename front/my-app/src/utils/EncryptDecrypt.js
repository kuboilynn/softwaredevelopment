import CryptoJS from 'crypto-js'; // Importing the crypto-js library

const secretKey = '@atis';

// Utility function to encrypt data
export const encryptData = (data) => {
  try {
    // Convert data to a JSON string and then encrypt it using AES
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  } catch (error) {
    console.error("Encryption error:", error);
  }
};

// Utility function to decrypt data
export const decryptData = (encryptedData) => {
  try {
    // Decrypt data using AES
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    // Convert the decrypted bytes back to a JSON object
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Utility function to save to local storage
export const saveToLocalStorage = (key, data) => {
  const encryptedData = encryptData(data);
  if (encryptedData) {
    localStorage.setItem(key, encryptedData);
  }
};

// Utility function to retrieve and decrypt from local storage
export const getFromLocalStorage = (key) => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
};