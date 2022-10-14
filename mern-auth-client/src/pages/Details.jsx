import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = ({ userContext }) => {
  let { bugId } = useParams();

  const [data, setData] = useState([]);
  const [bodyData, setBodyData] = useState({ assignedTo: "" });

  const getData = async () => {
    const UPLOAD_ENDPOINT = `http://localhost:8081/bug/getBug/${bugId}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    };

    const { data } = await axios.get(UPLOAD_ENDPOINT, config);
    setData(data);
  };

  useEffect(
    () => {
      getData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function assignTo() {
    const UPLOAD_ENDPOINT = `http://localhost:8081/bug/assignBug/${bugId}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    };

    try {
      const response = await axios.put(UPLOAD_ENDPOINT, bodyData, config);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2 className="text-lg font-bold">Details:</h2>
      <span className="text-center m-4 font-bold">
        Currently Assigned to {data.bug?.assignedTo}
      </span>
      <div className="flex justify-center m-4">
        <div className="text-center m-2">
          <label htmlFor="assignedTo">
            <div className="text-center m-2">
              <span>Assign to:</span>
            </div>
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={bodyData.assignedTo}
            required
            onChange={(e) =>
              setBodyData({ ...bodyData, assignedTo: e.target.value })
            }
            className="select select-bordered w-full max-w-xs m-2"
          >
            <option defaultValue={null}>Assign to:</option>
            {data.users &&
              data.users.map((user) => {
                return (
                  <option key={user._id} value={user.firstName}>
                    {user.firstName}
                  </option>
                );
              })}
          </select>

          <button
            onClick={assignTo}
            className="btn btn-primary text-center m-2"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Details;
