import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileForm = ({ userContext }) => {
  let { id } = useParams();

  const [bodyData, setBodyData] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  const editProfile = async (e) => {
    const UPLOAD_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + `/users/editProfile/${id}`

    e.preventDefault();
    console.log(e);

    return await axios({
      method: "put",
      url: UPLOAD_ENDPOINT,
      data: bodyData,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        // Refresh page
        // TODO: Optimize
        window.location.reload(false);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <>
      <h2 className="text-lg text-center">Edit Profile Form</h2>
      <form onSubmit={editProfile}>
        {/* USERNAME */}
        <div className="flex justify-center m-2">
          <label htmlFor="username" className="label-text text-center m-2">
            Username:{" "}
            <input
              id="username"
              name="username"
              type="text"
              value={bodyData.username}
              onChange={(e) =>
                setBodyData({
                  ...bodyData,
                  username: e.target.value.toLowerCase(),
                })
              }
              placeholder={userContext.details?.username}
              className="input input-bordered w-full max-w-xs m-2"
            />
          </label>
        </div>
        {/* FIRSTNAME */}
        <div className="flex justify-center m-2">
          <label htmlFor="firstName" className="label-text text-center m-2">
            First Name:{" "}
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={bodyData.firstName}
              onChange={(e) =>
                setBodyData({ ...bodyData, firstName: e.target.value })
              }
              placeholder={userContext.details?.firstName}
              className="input input-bordered w-full max-w-xs m-2"
            />
          </label>
        </div>
        {/* LASTNAME */}
        <div className="flex justify-center m-2">
          <label htmlFor="lastName" className="label-text text-center m-2">
            Last Name:{" "}
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={bodyData.lastName}
              onChange={(e) =>
                setBodyData({ ...bodyData, lastName: e.target.value })
              }
              placeholder={userContext.details?.lastName}
              className="input input-bordered w-full max-w-xs m-2"
            />
          </label>
        </div>
        <div className="flex justify-center m-2">
          <button className="btn btn-secondary" onClick={editProfile}>
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
