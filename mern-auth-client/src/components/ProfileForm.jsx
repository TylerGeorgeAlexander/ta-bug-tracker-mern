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
    const UPLOAD_ENDPOINT = `http://localhost:8081/users/editProfile/${id}`;

    // var formData = new FormData();
    e.preventDefault();
    console.log(e);

    // Create bodyData object
    // setBodyData({
    //   ...bodyData,
    //   id: userContext.details._id,
    // });

    // formData.append("id", userContext.details._id);

    // var file = document.getElementById("file");
    // console.log(file.files[0]);
    // formData.append("file", file.files[0]);
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }

    return await axios({
      method: "put",
      url: UPLOAD_ENDPOINT,
      data: bodyData,
      //   headers: { "Content-Type": "multipart/form-data" },
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

  const clickConsole = () => {
    // Create bodyData object
    // setBodyData({
    //   ...bodyData,
    //   id: userContext.details._id,
    // });

    console.log("useParams", id);

    return console.log(bodyData);
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
                setBodyData({ ...bodyData, username: e.target.value })
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
      <div className="flex justify-center m-2">
        <button className="btn btn-ghost" onClick={clickConsole}>
          Console Log
        </button>
      </div>
    </>
  );
};

export default ProfileForm;
