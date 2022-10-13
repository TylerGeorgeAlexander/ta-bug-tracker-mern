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
              <th className="text-center">Bug Name</th>
              <th className="text-center">Description</th>
              <th className="text-center">Priority</th>
              <th className="text-center">Attachments</th>
              <th className="text-center">Created By</th>
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
                          <div className="text-sm opacity-50 text-center">
                            {bug.app || "Default Application"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3 whitespace-normal justify-center">
                        {bug.description}
                      </div>
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {bug.user?.role || "Software Engineer I"}
                      </span>
                    </td>
                    <td className="text-center">
                      {bug.priority.toUpperCase() || "HIGH"}
                    </td>
                    <td>
                      <div className="flex items-center space-x-3 justify-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={bug.image || "favicon.ico"}
                              alt="Bug's Avatar"
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center space-x-3 justify-center">
                        <span>{bug.createdBy}</span>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={bug.user.profilePicture || "favicon.ico"}
                              alt="User's Avatar"
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <button className="btn btn-ghost btn-xs">details</button>
                    </td>

                    <td className="text-center">
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
              <th className="text-center">Bug Name</th>
              <th className="text-center">Description</th>
              <th className="text-center">Priority</th>
              <th className="text-center">Attachments</th>
              <th className="text-center">Created By</th>
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
