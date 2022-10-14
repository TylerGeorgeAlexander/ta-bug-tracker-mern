import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteModal from "../components/DeleteModal";
import AvatarPlaceholder from "../components/AvatarPlaceholder";
import Avatar from "../components/Avatar";
import ResolveModal from "../components/ResolveModal";

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

  // Resolved Function
  const resolveBug = async (id) => {
    const UPLOAD_ENDPOINT = `http://localhost:8081/bug/resolveBug/${id}`;

    await axios.put(UPLOAD_ENDPOINT);
    // .then(function (response) {
    //   console.log(response);
    // })
    return await getData().catch(function (error) {
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
                        <input
                          type="checkbox"
                          className="checkbox"
                          // Checked off if Bug is resolved
                          checked={bug.resolved}
                          readOnly
                        />
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
                        <div className="grid text-center">
                          <div className="grid-cols-1">
                            <span className="text-center font-semibold">
                              {bug.createdBy}
                            </span>
                          </div>
                          <div className="grid-cols-1 m-2">
                            {bug.user.profilePicture ? (
                              <Avatar
                                picture={bug.user.profilePicture}
                                firstName={bug.user.firstName}
                                lastName={bug.user.lastName}
                              />
                            ) : (
                              <AvatarPlaceholder
                                firstName={bug.user.firstName}
                                lastName={bug.user.lastName}
                              />
                            )}
                          </div>
                          <div className="grid-cols-1">
                            <span className="badge badge-ghost badge-sm">
                              {bug.user?.role || "Software Engineer I"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <button className="btn btn-ghost btn-xs">details</button>
                    </td>

                    <td className="text-center">
                      <div className="m-2">
                        <ResolveModal id={bug._id} resolveBug={resolveBug} />
                      </div>
                      <div className="m-2">
                        {userContext.details?.rank === 1 && (
                          <DeleteModal id={bug._id} deleteBug={deleteBug} />
                        )}
                      </div>
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
