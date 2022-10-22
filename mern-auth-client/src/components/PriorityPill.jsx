import React, { useState } from "react";

const PriorityPill = ({ priority, bugId, editPriorityBug }) => {
  const [data, setData] = useState({ priority: "low" });

  let color = "bg-black";

  if (priority === "low") color = "bg-blue-500";
  if (priority === "medium") color = "bg-yellow-500";
  if (priority === "high") color = "bg-orange-500";
  if (priority === "immediately") color = "bg-red-500";

  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor={`pill-modal-${bugId}`}
        className={`btn btn-sm rounded-full ${color}`}
      >
        {priority.toUpperCase()}
      </label>

      {/* <!-- Put this part before </body> tag --> */}
      <input
        type="checkbox"
        id={`pill-modal-${bugId}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">
            Are you sure you want to edit?
          </h3>
          <p className="py-4 flex justify-center">What's the rush?</p>

          {/* DROPDOWN MENU */}
          <div className="flex justify-center m-4">
            <label htmlFor="priority" className="label-text text-lg">
              Priority:{" "}
            </label>
          </div>
          <div className="flex justify-center m-4">
            <select
              id="priority"
              name="priority"
              value={data.priority}
              required
              onChange={(e) => setData({ ...data, priority: e.target.value })}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled>Priority Level:</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="immediately">Immediately</option>
            </select>
          </div>

          <div className="modal-action flex justify-center">
            <label
              htmlFor={`pill-modal-${bugId}`}
              className="btn hover:btn-primary"
            >
              Cancel
            </label>
          </div>
          <div className="modal-action flex justify-center">
            {/* <label htmlFor={`pill-modal-${bugId}`} className="btn">
              SAVE
            </label> */}
            <label
              htmlFor={`pill-modal-${bugId}`}
              onClick={() => editPriorityBug(bugId, data.priority)}
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

export default PriorityPill;
