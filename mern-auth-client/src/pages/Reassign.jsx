import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Reassign = ({ userContext }) => {
  let { bugId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [bodyData, setBodyData] = useState({ assignedTo: "" });

  const getData = async () => {
    const UPLOAD_ENDPOINT =
      process.env.REACT_APP_API_ENDPOINT + `/bug/getBug/${bugId}`;

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
    const UPLOAD_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + `/bug/assignBug/${bugId}`

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    };

    try {
      return await axios
        .put(UPLOAD_ENDPOINT, bodyData, config)
        .then(function (response) {
          console.log(response);
          navigate("/bugs");
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex justify-center m-4">
        <div className="text-center m-2">
          {/* <h2 className="text-lg font-bold">Reassign:</h2> */}
          <span className="text-center m-4 font-bold">
            {/* Currently Assigned to {data.bug?.assignedTo} */}
            {/* {JSON.stringify(data.users)} */}
          </span>
          <label htmlFor="assignedTo">
            <div className="text-center m-2">
              <span>Reassign to:</span>
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
            <option defaultValue={null}>Reassign to:</option>
            {data.users &&
              data.users.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {`${user.firstName} ${user.lastName}`}
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

export default Reassign;
