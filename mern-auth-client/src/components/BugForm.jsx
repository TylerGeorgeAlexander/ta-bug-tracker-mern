import axios from "axios";
import React, { useState } from "react";
// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const BugForm = ({ userContext }) => {
  const [bodyData, setBodyData] = useState({
    name: "",
    description: "",
    priority: "low",
  });
  // const [name, setName] = useState("");
  // const [desc, setDesc] = useState("");
  // const [priority, setPriority] = useState("");
  const [filePath, setFilePath] = useState("");

  const clickTest = (e) => {
    // setBodyData({
    //   ...bodyData,
    //   id: userContext.details._id,
    //   name,
    //   description: desc,
    //   priority,
    // });
    // setBodyData( { id: userContext.details._id });
    console.log("file path: ", filePath);
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
      // name,
      // description: desc,
      // priority,
    });

    // var name = document.getElementById("testName").value;
    formData.append("name", bodyData.name);
    formData.append("description", bodyData.description);
    formData.append("priority", bodyData.priority);
    var file = document.getElementById("file");
    console.log(file.files[0]);
    formData.append("file", file.files[0]);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    return await axios({
      method: "post",
      url: UPLOAD_ENDPOINT,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
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
          value={bodyData.name}
          onChange={(e) => setBodyData({ ...bodyData, name: e.target.value })}
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="desc" className="label-text">
          Desc:{" "}
        </label>
        <input
          id="desc"
          name="desc"
          type="text"
          value={bodyData.description}
          onChange={(e) =>
            setBodyData({ ...bodyData, description: e.target.value })
          }
          className="input input-bordered w-full max-w-xs"
        />
        <label htmlFor="priority" className="label-text">
          Priority:{" "}
        </label>

        <select
          id="priority"
          name="priority"
          value={bodyData.priority}
          onChange={(e) =>
            setBodyData({ ...bodyData, priority: e.target.value })
          }
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled>Priority Level:</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="immediately">Immediately</option>
        </select>

        <input
          type="file"
          name="file"
          id="file"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />
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
