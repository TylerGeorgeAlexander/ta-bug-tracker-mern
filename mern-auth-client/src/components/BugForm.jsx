import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const BugForm = ({ userContext }) => {
  const navigate = useNavigate();
  const [bodyData, setBodyData] = useState({
    name: "",
    description: "",
    priority: "low",
  });

  const [error, setError] = useState("");
  const [filePath, setFilePath] = useState("");

  const submitForm = async (e) => {
    const UPLOAD_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + `/bug/createBug`

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
    formData.append("id", userContext.details._id);
    formData.append("username", userContext.details.username);
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
        navigate('/bugs')
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        setError(response);
      });
  };

  return (
    <>
      {/* ERROR ALERT */}
      {error && (
        <div className="flex justify-center m-4">
          <div className="alert alert-error shadow-lg w-1/2 justify-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error.message}</span>
            </div>
          </div>
        </div>
      )}
      {/* <h1>{userContext.details._id && userContext.details._id}</h1> */}
      <form onSubmit={submitForm} id="testForm">
        <div className="flex justify-center m-4">
          <label htmlFor="name" className="label-text text-lg">
            Name:{" "}
          </label>
        </div>
        <div className="flex justify-center m-4">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={bodyData.name}
            onChange={(e) => setBodyData({ ...bodyData, name: e.target.value })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-center m-4">
          <label htmlFor="desc" className="label-text text-lg">
            Description:{" "}
          </label>
        </div>
        <div className="flex justify-center m-4">
          <textarea
            id="desc"
            name="desc"
            type="text"
            required
            value={bodyData.description}
            onChange={(e) =>
              setBodyData({ ...bodyData, description: e.target.value })
            }
            className="textarea textarea-bordered w-full max-w-xs h-[7rem]"
          />
        </div>
        <div className="flex justify-center m-4">
          <label htmlFor="priority" className="label-text text-lg">
            Priority:{" "}
          </label>
        </div>
        <div className="flex justify-center m-4">
          <select
            id="priority"
            name="priority"
            value={bodyData.priority}
            required
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
        </div>
        <div className="flex justify-center m-4">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-white hover:text-secondary">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              name="file"
              id="file"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              className="hidden"
            />
          </label>

          {/* OG */}
          {/* <input
            type="file"
            name="file"
            id="file"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
          /> */}
        </div>
        <div className="flex justify-center m-4">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
      {/* <button className="btn btn-secondary" type="click" onClick={clickTest}>
        Click Test
      </button> */}
    </>
  );
};

export default BugForm;
