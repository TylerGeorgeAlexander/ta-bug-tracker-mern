import React, { useState } from "react";
import axios from "axios";

const Profile = ({ userContext }) => {
  const [bodyData, setBodyData] = useState({});

  const submitForm = async (e) => {
    const UPLOAD_ENDPOINT = "http://localhost:8081/users/addProfilePicture";

    var formData = new FormData();
    e.preventDefault();
    console.log(e);

    // Create bodyData object
    setBodyData({
      ...bodyData,
      id: userContext.details._id,
    });

    // var name = document.getElementById("testName").value;
    // formData.append("name", bodyData.name);
    // formData.append("description", bodyData.description);
    // formData.append("priority", bodyData.priority);
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
      <h2 className="text-lg">Profile:</h2>
      <span className="text-sm opacity-50">
        {JSON.stringify(userContext.details)}
      </span>
      <form onSubmit={submitForm} id="testForm">
        <label>
          Profile Picture:
          <input type="file" name="file" id="file" />
        </label>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Profile;
