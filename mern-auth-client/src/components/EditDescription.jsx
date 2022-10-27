import React, { useState } from "react";

const EditDescription = ({ bugId, description, editDescriptionBug }) => {
  const [data, setData] = useState({ description: "" });
  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor={`edit-description-modal-${bugId}`}
        className={`cursor-pointer`}
      >
        <div className="flex items-center space-x-3 whitespace-normal justify-start">
          <p className="truncate w-[10rem] whitespace-normal">{description}</p>
        </div>
      </label>
      {/* <!-- Put this part before </body> tag --> */}
      <input
        type="checkbox"
        id={`edit-description-modal-${bugId}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">
            Are you sure you want to edit?
          </h3>

          {/* DROPDOWN MENU */}
          <div className="flex justify-center m-4">
            <label
              htmlFor="description"
              className="label-text text-lg text-center"
            >
              Current description:{" "}
              <div className="flex items-center space-x-3 whitespace-normal justify-start m-4">
                <p className="truncate w-[10rem] whitespace-normal font-semibold">
                  {description}
                </p>
              </div>
            </label>
          </div>
          <div className="flex justify-center m-4">
            <textarea
              id="description"
              name="description"
              value={data.description}
              required
              placeholder={description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="textarea textarea-bordered w-full max-w-xs h-[7rem]"
            ></textarea>
          </div>

          <div className="modal-action flex justify-center">
            <label
              htmlFor={`edit-description-modal-${bugId}`}
              className="btn hover:btn-primary"
            >
              Cancel
            </label>
          </div>
          <div className="modal-action flex justify-center">
            {/* <label htmlFor={`edit-description-modal-${bugId}`} className="btn">
            SAVE
          </label> */}
            <label
              htmlFor={`edit-description-modal-${bugId}`}
              onClick={() => editDescriptionBug(bugId, data.description)}
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

export default EditDescription;
