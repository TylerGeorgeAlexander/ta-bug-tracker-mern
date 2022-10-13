import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteModal from "../components/DeleteModal";

const Bugs = ({ userContext }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const UPLOAD_ENDPOINT = "http://localhost:8081/bug/getFeed";

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

  // Delete Function
  const deleteBug = (id) => {
    const UPLOAD_ENDPOINT = `http://localhost:8081/bug/deleteBug/${id}`;

    return axios
      .delete(UPLOAD_ENDPOINT)
      .then(function (response) {
        console.log(response);
      })
      .then(getData())
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/* data structure stringified
      <h2>Bugs</h2>
      <div>{JSON.stringify(data)}</div> */}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Bug Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Attachments</th>
              <th>Created By</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {/* tbody begin */}
          <tbody>
            {/* <!-- row 1 --> */}
            {data &&
              data.bugs?.map((bug) => {
                return (
                  <tr key={`${bug._id} tr`}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3 whitespace-normal">
                        <div>
                          <div className="font-bold">{bug.name}</div>
                          <div className="text-sm opacity-50">
                            {bug.app || "Default Application"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3 whitespace-normal">
                        {bug.description}
                      </div>
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {bug.user?.role || "Desktop Support Technician"}
                      </span>
                    </td>
                    <td>{bug.priority.toUpperCase() || "HIGH"}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={bug.image || "favicon.ico"}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {bug.createdBy}{" "}
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={
                                data.users?.map((user) => {
                                  if (user.username === bug.createdBy)
                                    return user.profilePicture;
                                  return null;
                                }) || "favicon.ico"
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </td>

                    <td>
                      <DeleteModal id={bug._id} deleteBug={deleteBug} />
                    </td>
                  </tr>
                );
              })}
            {/* tbody end */}
          </tbody>
          {/* <!-- foot --> */}
          <tfoot>
            <tr>
              <th></th>
              <th>Bug Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Attachments</th>
              <th>Created By</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Bugs;
