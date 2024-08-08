import React, { useState, useEffect } from "react";
import Modal from "../../shared/Modal";
import AddData from "./AddData";
import {
  getCacheData,
  getCacheDataByKey,
  deleteCacheEntry,
  clearCache,
} from "../../api/cacheService";

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
      const data = await getCacheData();
      setCacheData(data.data || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteCache = async (keyToDelete) => {
    try {
      await deleteCacheEntry(keyToDelete);
      fetchCacheData(); // Refresh cache data after deletion
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClearCache = async () => {
    try {
      await clearCache();
      fetchCacheData(); // Refresh cache data after clearing
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGetCache = async (keyToDelete) => {
    try {
      await getCacheDataByKey(keyToDelete);
      fetchCacheData(); // Refresh cache data after deletion
    } catch (error) {
      console.error(error.message);
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
                    <button
                      onClick={() => handleGetCache(entry.key)}
                      type="button"
                      className="text-blue-500 active:bg-blue-600 active:text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Refresh
                    </button>

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
