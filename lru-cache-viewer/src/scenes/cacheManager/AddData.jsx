import React, { useState } from "react";
import axios from "axios";

const AddData = ({ onSuccess, onFailure }) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-gray-200 px-5 py-3 placeholder-white`;
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [expiry, setExpiry] = useState("");
  const [apiErrors, setApiErrors] = useState("");

  const handleCreateCache = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cache", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: key,
          value: value,
          expiry: Number(expiry),
        }),
      });

      if (response.ok) {
        setKey("");
        setValue("");
        setExpiry("");
        onSuccess();
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setApiErrors(errorData.error);
      }
    } catch (error) {
      console.log(error);
      onFailure();
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100 p-8 rounded w-full max-w-md">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {apiErrors ? (
            <p className="mt-1 text-red-500">{apiErrors}</p>
          ) : (
            <></>
          )}
          <div>
            <label className="block mb-1" htmlFor="key">
              Key
            </label>
            <input
              type="text"
              id="key"
              className={inputStyles}
              placeholder="Enter your key"
              value={key}
              required={true}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="value">
              Value
            </label>
            <input
              type="text"
              id="value"
              className={inputStyles}
              placeholder="Enter your Value"
              value={value}
              required={true}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="expiry">
              Expiry
            </label>
            <input
              type="text"
              id="expiry"
              className={inputStyles}
              placeholder="Enter your time to live"
              value={expiry}
              required={true}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            onClick={handleCreateCache}
          >
            Add Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddData;
