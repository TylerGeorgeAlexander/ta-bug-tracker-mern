import axios from "axios";
import React, { useState } from "react";
// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const BugForm = ({ userContext }) => {
  const [bodyData, setBodyData] = useState({});
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("");

  const clickTest = (e) => {
    setBodyData({
      ...bodyData,
      id: userContext.details._id,
      name,
      description: desc,
      priority,
    });
    // setBodyData( { id: userContext.details._id });
    return console.log(JSON.stringify(bodyData));
  };

  const submitForm = async (e) => {
    const UPLOAD_ENDPOINT = "http://localhost:8081/bug/createBug";

    var formData = new FormData();
    e.preventDefault();
    console.log(e);

    // Create bodyData object
    setBodyData({
      ...bodyData,
      id: userContext.details._id,
      name,
      description: desc,
      priority,
    });

    // var name = document.getElementById("testName").value;
    // formData.append("name", name);
    var file = document.getElementById("testFile");
    console.log(file.files[0]);
    formData.append("testFile", file.files[0]);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    return await axios.post(UPLOAD_ENDPOINT, bodyData, {
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
      // body: JSON.stringify(bodyData),
    });
  };

  return (
    <>
      {/* <h1>{userContext.details._id && userContext.details._id}</h1> */}
      <form onSubmit={submitForm} id="testForm">
        <label htmlFor="name" className="label-text">
          Name:{" "}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="desc" className="label-text">
          Desc:{" "}
        </label>
        <input
          id="desc"
          name="desc"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="priority" className="label-text">
          Priority:{" "}
        </label>
        <input
          id="priority"
          name="priority"
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />

        <input type="file" name="test" id="testFile" />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <button className="btn btn-secondary" type="click" onClick={clickTest}>
        Click Test
      </button>
    </>
  );
};

export default BugForm;
