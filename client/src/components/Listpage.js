import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiCall } from "../apiCallAction/ApicallAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import Logout from "./Logout";

const Listpage = () => {
  const [passwords, setPasswords] = useState([]);
  const [copyPasswords, setCopyPasswords] = useState([]);
  const [favouriteStatus, setFavoriteStatus] = useState(false);

  useEffect(() => {
    console.log("TEST_CONSOLE", passwords);
  }, [passwords]);

  const listpage = async () => {
    try {
      const data = await apiCall("/api/passwords", "GET");
      let tempArr = [];
      data?.forEach((item) => {
        let obj = { ...item, copyUser: false, copyPass: false };
        tempArr.push(obj);
      });
      setFavoriteStatus(false);
      setPasswords(tempArr);
      setCopyPasswords(tempArr);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const listFavourite = async () => {
    try {
      const data = await apiCall("/api/favorites", "GET");
      let tempArr = [];
      data?.forEach((item) => {
        let obj = { ...item, copyUser: false, copyPass: false };
        tempArr.push(obj);
      });
      setFavoriteStatus(true);
      setPasswords(tempArr);
      setCopyPasswords(tempArr);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    listpage();
  }, []);

  const deletePassword = async (id) => {
    try {
      const data = await apiCall(`/api/passwords/${id}`, "DELETE");
      console.log("DELETE_RESPONSE", data);
      if (!favouriteStatus) {
        listpage();
      } else listFavourite();
    } catch (error) {
      console.log("error :", error);
    }
  };

  const addToFavourite = async (id, favorite) => {
    try {
      const data = await apiCall(`/api/favorites/${id}`, "PATCH");
      console.log("FAVOURITE_RESPONSE", data, favorite);
      if (!favouriteStatus) {
        listpage();
      } else listFavourite();
    } catch (error) {
      console.log("error :", error);
    }
  };

  const copyTextToClipboard = async (textToCopy, param, key, id) => {
    console.log("INSIDE_COPYTOCLIPBOARD", textToCopy, param, key, id);
    try {
      await navigator.clipboard.writeText(textToCopy);
      const updatedData = passwords.map((item, index) =>
        item._id === id
          ? {
              ...item,
              [key]: !item[key],
              [key === "copyUser" ? "copyPass" : "copyUser"]: false,
            }
          : copyPasswords[index]
      );
      setPasswords(updatedData);
      showSuccessToast(`${param} copied to clipboard!`);
    } catch (err) {
      showErrorToast(`Error while copy to clipboard!`);
    }
  };

  const removeTextFromClipboard = async (key, id) => {
    try {
      await navigator.clipboard.writeText("");
      const updatedData = passwords.map((item, index) =>
        item._id === id ? { ...item, [key]: !item[key] } : copyPasswords[index]
      );
      setPasswords(updatedData);
      showSuccessToast(`Remove text from the clipboard!`);
    } catch (err) {
      console.log("err :", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen  flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg  w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 h-screen overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center Header">
          <h2 className="text-xl font-semibold text-left text-white">
            <Link to={"/"}>
              <FontAwesomeIcon className="mr-2" icon="fas fa-home" />
              </Link>
            Password Manager
          </h2>
            <div>
          <Logout/>
            </div>

        </div>
          <div className="flex justify-end items-center px-3 pt-1 ">
            {favouriteStatus ? (
              <FontAwesomeIcon
                title="Listpage"
                onClick={listpage}
                className="text-2xl cursor-pointert mr-3"
                icon="fas fa-list"
              />
            ) : (
              <FontAwesomeIcon
                title="Favourite"
                onClick={listFavourite}
                className="text-3xl cursor-pointer t mr-2 text-red-600"
                icon="fas fa-heart"
              />
            )}
            <Link
              to={"/add"}
              className="bg-gray-800  hover:bg-gray-900 text-white text-sm py-2 px-3 rounded shadow-md transition duration-300 flex items-center"
            >
              <FontAwesomeIcon icon="fas fa-plus" />
            </Link>
          </div>
       <div className="px-3">
         <ul className="divide-y  divide-gray-200">
           {passwords?.length > 0 ? (
             passwords?.map((item, index) => (
               <>
                 <li key={index} className="py-4 flex justify-between ">
                   <div className="flex items-center">
                     <div className="flex-shrink-0">
                       <img
                         className="h-10 w-10 rounded-full"
                         src="./images/key.png"
                         alt="User avatar"
                       />
                     </div>
                     <div className="ml-3">
                       <p className="text-lg font-medium text-black-900">
                         {item?.website} <span> </span>
                       </p>
                       {item?.username && (
                         <p className="text-sm mb-2  text-gray-900">
                           <span className="font-medium truncate">
                             Username :
                           </span>
                           <span> {item?.username}</span>
                           <span
                             onClick={() =>
                               !item?.copyUser
                                 ? copyTextToClipboard(
                                     item?.username,
                                     "Username",
                                     "copyUser",
                                     item?._id
                                   )
                                 : removeTextFromClipboard("copyUser", item?.id)
                             }
                           >
                             {!item?.copyUser ? (
                               <FontAwesomeIcon
                                 className="ml-2 cursor-pointer"
                                 icon="far fa-copy"
                               />
                             ) : (
                               <FontAwesomeIcon
                                 className="ml-2 cursor-pointer"
                                 icon="fa-solid fa-check"
                               />
                             )}
                           </span>
                         </p>
                       )}
                       <p className="text-sm  text-gray-900">
                         <span className="font-medium truncate">Password :</span>
                         {item?.password}
                         <span
                           onClick={() =>
                             !item?.copyPass
                               ? copyTextToClipboard(
                                   item?.password,
                                   "Password",
                                   "copyPass",
                                   item?._id
                                 )
                               : removeTextFromClipboard("copyPass", item?.id)
                           }
                         >
                           {!item?.copyPass ? (
                             <FontAwesomeIcon
                               className="ml-2 cursor-pointer"
                               icon="far fa-copy"
                             />
                           ) : (
                             <FontAwesomeIcon
                               className="ml-2 cursor-pointer"
                               icon="fa-solid fa-check"
                             />
                           )}
                         </span>
                       </p>
                     </div>
                   </div>
                   <div className="pt-2 pr-1">
                     <FontAwesomeIcon
                       onClick={() => deletePassword(item?._id)}
                       className="mr-4 cursor-pointer"
                       icon="far fa-trash-alt"
                     />{" "}
                     <Link
                       to="/add"
                       state={{ paramType: "edit", dataComming: item }}
                     >
                       <FontAwesomeIcon
                         className="mr-4 cursor-pointer"
                         icon="far fa-edit"
                       />
                     </Link>
                     {
                       <FontAwesomeIcon
                         onClick={() => addToFavourite(item?._id, item?.favorite)}
                         className={`text-xl cursor-pointer ${
                           item?.favorite ? "text-red-600" : ""
                         }`}
                         icon={`${!item?.favorite ? "far" : "fas"} fa-heart`}
                       />
                     }
                   </div>
                 </li>
               </>
             ))
           ) : (
             <div className="text-center text-2xl mt-5">
               {!favouriteStatus
                 ? "Add some Passwords !"
                 : "Add some favoirite Passwords !"}
             </div>
           )}
        
           {/* Add more list items as needed */}
         </ul>
       </div>
      </div>
    </div>
  );
};

export default Listpage;
