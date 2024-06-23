import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiCall } from "../apiCallAction/ApicallAction";
import { useNavigate } from "react-router-dom";

const AddPassword = () => {
  const navigate = useNavigate();
  let { state } = useLocation();

  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (state?.paramType === "edit") {
      setFormData(state?.dataComming);
    }
    // eslint-disable-next-line
  }, []);

  const addPassword = async (e) => {
    e.preventDefault();
    const payload = formData;
    try {
      const data = await apiCall("/api/passwords", "POST", payload);
      console.log("data :", data);
      navigate("/");
    } catch (error) {
      console.log("error :", error);
    }
  };

  const editPassword = async (e) => {
    e.preventDefault();
    const payload = formData;
    try {
      const data = await apiCall(`/api/passwords/${state?.dataComming?._id}`, "PUT", payload);
      navigate("/");
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          <Link to={"/"}>
            <FontAwesomeIcon className="mr-2" icon="fas fa-home" />
          </Link>{" "}
          <span>Add Password</span>
        </h2>

        {/* Add Form Section */}
        <form onSubmit={addPassword} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Website/Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-600">*</span> 
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required={true}
            />
          </div>
          <div className="flex justify-end">
           {state?.paramType === "edit" ? <button
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md shadow-md transition duration-300 flex items-center"
              onClick={editPassword}
            >
              Update
            </button> : <button type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md shadow-md transition duration-300 flex items-center"
              
            >
              Save
            </button>}
            <button
              className="bg-gray-300 hover:bg-gray-400 ml-4 text-black py-2 px-4 rounded-md shadow-md transition duration-300 flex items-center"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPassword;
