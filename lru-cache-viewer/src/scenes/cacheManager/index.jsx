import React, { useState, useEffect } from "react";
import Modal from "../../shared/Modal";
import AddData from "./AddData";

import axios from "axios";

const CacheManager = () => {
  const [cacheData, setCacheData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch initial cache data when component mounts
    fetchCacheData();

    // Set up interval to fetch cache data every 10 seconds
    const intervalId = setInterval(() => {
      fetchCacheData();
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const fetchCacheData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cache");
      console.log(response);
      if (response.data.data !== null) {
        setCacheData(response.data.data);
      } else {
        setCacheData([]);
      }
    } catch (error) {
      console.error("Error fetching cache data", error);
    }
  };

  const handleDeleteCache = async (keyToDelete) => {
    try {
      await axios.delete(`http://localhost:8080/api/cache/${keyToDelete}`);
      fetchCacheData(); // Refresh cache data after deletion
    } catch (error) {
      console.error("Error deleting cache entry", error);
    }
  };

  // const handleEditCache = async (keyToEdit, newValue, newExpiry) => {
  //   try {
  //     await axios.put(`http://localhost:8080/api/cache/${keyToEdit}`, {
  //       value: newValue,
  //       expiry: newExpiry,
  //     });
  //     fetchCacheData(); // Refresh cache data after editing
  //   } catch (error) {
  //     console.error("Error editing cache entry", error);
  //   }
  // };

  const handleClearCache = async () => {
    try {
      await axios.delete("http://localhost:8080/api/cache");
      fetchCacheData(); // Refresh cache data after clearing
    } catch (error) {
      console.error("Error clearing cache", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        {/* Some utility */}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h1 className="font-semibold text-base text-blue-700">
                Cache Manager
              </h1>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Add Data
              </button>

              <button
                className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear all cache data? This action cannot be undone."
                    )
                  ) {
                    handleClearCache();
                  }
                }}
              >
                Clear
              </button>

              <button
                className="bg-gray-500 text-white active:bg-gray-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  fetchCacheData();
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Table area */}
        <div className="relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-10 py-3">
                  Key
                </th>
                <th scope="col" className="px-10 py-3">
                  Value
                </th>
                <th scope="col" className="px-10 py-3">
                  Expiry
                </th>
                <th scope="col" className="px-10 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            {cacheData.map((entry) => (
              <tr key={entry.key}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                  {entry.key}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  {entry.value}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  {entry.expiry}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  <div>
                    {/* <button
                      onClick={() =>
                        handleEditCache(
                          entry.key,
                          prompt("New Value:", entry.value),
                          prompt("New Expiry:", entry.expiry)
                        )
                      }
                      type="button"
                      className="text-blue-500 active:bg-blue-600 active:text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Edit
                    </button> */}

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete entry."
                          )
                        ) {
                          handleDeleteCache(entry.key);
                        }
                      }}
                      type="button"
                      className="text-red-500 active:bg-red-600 active:text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tbody></tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        <AddData
          onSuccess={() => {
            setIsModalOpen(false);
            fetchCacheData();
          }}
          onFailure={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default CacheManager;
