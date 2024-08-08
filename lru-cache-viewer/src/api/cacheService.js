// src/api/apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/cache";

export const getCacheData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cache data");
  }
};

export const getCacheDataByKey = async (key) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${key}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching cache data");
  }
};

export const deleteCacheEntry = async (key) => {
  try {
    await axios.delete(`${API_BASE_URL}/${key}`);
  } catch (error) {
    throw new Error("Error deleting cache entry");
  }
};

export const clearCache = async () => {
  try {
    await axios.delete(API_BASE_URL);
  } catch (error) {
    throw new Error("Error clearing cache");
  }
};

export const addCacheEntry = async (entry) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    return response;
  } catch (error) {
    throw new Error("Error adding cache entry");
  }
};

// Uncomment and modify if you implement editing functionality
// export const editCacheEntry = async (key, updatedData) => {
//   try {
//     await axios.put(`${API_BASE_URL}/${key}`, updatedData);
//   } catch (error) {
//     throw new Error('Error editing cache entry');
//   }
// };
