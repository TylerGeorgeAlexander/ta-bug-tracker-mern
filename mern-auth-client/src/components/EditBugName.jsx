import React, { useState } from "react";

const EditBugName = ({ bugId, bugName, bugApp, editBugName }) => {
  const [data, setData] = useState({ bugName: "" });
  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor={`edit-bugName-modal-${bugId}`}
        className={`cursor-pointer`}
      >
        <div className="flex items-center space-x-3 whitespace-normal">
          <div>
            <div className="font-bold truncate w-[10rem] whitespace-normal">
              {bugName}
            </div>
            <div className="text-sm opacity-50 text-start mt-2">
              {bugApp || "bugTracker"}
            </div>
          </div>
        </div>
      </label>
      {/* <!-- Put this part before </body> tag --> */}
      <input
        type="checkbox"
        id={`edit-bugName-modal-${bugId}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">
            Are you sure you want to edit?
          </h3>

          {/* DROPDOWN MENU */}
          <div className="flex justify-center m-4">
            <label htmlFor="bugName" className="label-text text-lg text-center">
              Current Bug Name:{" "}
              <div className="flex items-center space-x-3 whitespace-normal justify-start m-4">
                <p
                  className="truncate w-[10rem] whitespace-normal font-semibold"
                >
                  {bugName}
                </p>
              </div>
            </label>
          </div>
          <div className="flex justify-center m-4">
            <input
              id="bugName"
              name="bugName"
              value={data.bugName}
              required
              placeholder={bugName}
              onChange={(e) => setData({ ...data, bugName: e.target.value })}
              className="textarea textarea-bordered w-full max-w-xs"
            />
          </div>

          <div className="modal-action flex justify-center">
            <label
              htmlFor={`edit-bugName-modal-${bugId}`}
              className="btn hover:btn-primary"
            >
              Cancel
            </label>
          </div>
          <div className="modal-action flex justify-center">
            {/* <label htmlFor={`edit-bugName-modal-${bugId}`} className="btn">
            SAVE
          </label> */}
            <label
              htmlFor={`edit-bugName-modal-${bugId}`}
              onClick={() => editBugName(bugId, data.bugName)}
              className="btn btn-secondary hover:btn-secondary-focus"
            >
              save
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBugName;
