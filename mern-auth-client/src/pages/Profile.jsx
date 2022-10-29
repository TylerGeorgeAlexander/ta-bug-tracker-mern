import React from "react";
import axios from "axios";
import ProfileForm from "../components/ProfileForm";

const Profile = ({ userContext }) => {
  const savePicture = async (e) => {
    const UPLOAD_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + `/users/profilePicture`

    var formData = new FormData();
    e.preventDefault();
    console.log(e);

    // Create bodyData object
    // setBodyData({
    //   ...bodyData,
    //   id: userContext.details._id,
    // });

    formData.append("id", userContext.details._id);

    var file = document.getElementById("file");
    console.log(file.files[0]);
    formData.append("file", file.files[0]);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    return await axios({
      method: "put",
      url: UPLOAD_ENDPOINT,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
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
      <div className="m-4">
        <h2 className="text-lg flex justify-center font-bold">
          {userContext.details?.username}'s
        </h2>
        <span className="text-md flex justify-center font-semibold opacity-50">
          {`profile`.toUpperCase()}
        </span>
      </div>
      <form onSubmit={savePicture} id="pictureForm">
        <div className="flex justify-center">
          <div className="mb-3 w-96">
            <div className="flex justify-center">
              <label
                htmlFor="file"
                className="form-label inline-block mb-2 text-gray-700 text-lg"
              >
                Upload Profile Picture
              </label>
            </div>
            <input
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="file"
              id="file"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-primary text-center"
            onSubmit={savePicture}
          >
            Save
          </button>
        </div>
      </form>
      <hr className="m-4" />
      <ProfileForm userContext={userContext} />
    </>
  );
};

export default Profile;
