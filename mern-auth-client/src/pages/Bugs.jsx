import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DeleteModal from "../components/DeleteModal";
import AvatarPlaceholder from "../components/AvatarPlaceholder";
import Avatar from "../components/Avatar";
import ResolveModal from "../components/ResolveModal";
import PriorityPill from "../components/PriorityPill";

const Bugs = ({ userContext }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    assignedTo: "",
    createdBy: "",
    type: "",
    priority: "",
    resolved: "",
  });

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
      <h2>Bugs</h2> */}
      {/* <div>{JSON.stringify(data)}</div> */}
      {/* <p>{JSON.stringify(filter)}</p> */}
      <div className="flex justify-center align-middle">
        {/* CREATED BY FILTER SELECT */}
        <div className="form-control w-full max-w-xs m-2">
          <label htmlFor="createdBy" className="label">
            <span className="label-text">Created By: </span>
            <span className="label-text-alt">Filter</span>
          </label>
          <select
            id="createdBy"
            name="createdBy"
            value={filter.createdBy}
            required
            onChange={(e) =>
              setFilter({ ...filter, createdBy: e.target.value })
            }
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">ALL</option>
            {data &&
              data.users?.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >{`${user.firstName} ${user.lastName}`}</option>
              ))}
          </select>
        </div>
        {/* ASSIGNED TO FILTER SELECT */}
        <div className="form-control w-full max-w-xs m-2">
          <label htmlFor="assignedTo" className="label">
            <span className="label-text">Assigned To: </span>
            <span className="label-text-alt">Filter</span>
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={filter.assignedTo}
            required
            onChange={(e) =>
              setFilter({ ...filter, assignedTo: e.target.value })
            }
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">ALL</option>
            {data &&
              data.users?.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >{`${user.firstName} ${user.lastName}`}</option>
              ))}
          </select>
        </div>
        {/* PRIORITY FILTER SELECT */}
        <div className="form-control w-full max-w-xs m-2">
          <label htmlFor="priority" className="label">
            <span className="label-text">Priority: </span>
            <span className="label-text-alt">Filter</span>
          </label>
          <select
            id="priority"
            name="priority"
            value={filter.priority}
            required
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">ALL</option>
            <option value="low">LOW</option>
            <option value="medium">MEDIUM</option>
            <option value="high">HIGH</option>
            <option value="immediately">IMMEDIATELY</option>
          </select>
        </div>
        {/* RESOLVED FILTER SELECT */}
        <div className="form-control w-full max-w-xs m-2">
          <label htmlFor="resolved" className="label">
            <span className="label-text">Resolved: </span>
            <span className="label-text-alt">Filter</span>
          </label>
          <select
            id="resolved"
            name="resolved"
            value={filter.resolved}
            required
            onChange={(e) => setFilter({ ...filter, resolved: e.target.value })}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">ALL</option>
            <option value="yes">YES</option>
            <option value="no">NO</option>
          </select>
        </div>
      </div>
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
              <th className="text-center">Assigned To</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {/* tbody begin */}
          <tbody>
            {/* <!-- row 1 --> */}
            {data &&
              data.bugs
                ?.filter((bug) =>
                  filter.createdBy ? bug.user._id === filter.createdBy : bug
                )
                .filter((bug) =>
                  filter.assignedTo ? bug.assignedTo === filter.assignedTo : bug
                )
                .filter((bug) =>
                  filter.priority ? bug.priority === filter.priority : bug
                )
                .filter((bug) =>
                  filter.resolved ? bug.resolved === filter.resolved : bug
                )
                .map((bug) => {
                  return (
                    <tr key={`${bug._id} tr`} className="hover">
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            // Checked off if Bug is resolved
                            checked={(bug.resolved === "yes")}
                            readOnly
                          />
                        </label>
                      </th>
                      {/* BUGS NAME */}
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
                      {/* DESCRIPTION */}
                      <td>
                        <div className="flex items-center space-x-3 whitespace-normal justify-center">
                          {bug.description}
                        </div>
                      </td>
                      {/* PRIORITY */}
                      <td className="text-center">
                        <PriorityPill priority={bug.priority} />
                      </td>
                      {/* ATTACHMENTS */}
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
                      {/* CREATED BY */}
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
                      {/* ASSIGNED TO */}
                      <td className="text-center">
                        <div className="flex items-center space-x-3 justify-center">
                          <div className="grid text-center">
                            <div className="grid-cols-1">
                              <span className="text-center font-semibold">
                                {data.users
                                  ?.filter(
                                    (user) => user._id === bug.assignedTo
                                  )
                                  .map(
                                    (user) =>
                                      `${user.firstName} ${user.lastName}`
                                  )}
                              </span>
                            </div>
                            <div className="grid-cols-1 m-2">
                              {bug.assignedTo ? (
                                // TODO optimize
                                <Avatar
                                  picture={data.users
                                    ?.filter(
                                      (user) => user._id === bug.assignedTo
                                    )
                                    .map((user) => user.profilePicture)}
                                  firstName={data.users
                                    ?.filter(
                                      (user) => user._id === bug.assignedTo
                                    )
                                    .map((user) => user.firstName)}
                                  lastName={data.users
                                    ?.filter(
                                      (user) => user._id === bug.assignedTo
                                    )
                                    .map((user) => user.lastName)}
                                />
                              ) : (
                                <AvatarPlaceholder
                                  firstName={"N"}
                                  lastName={"A"}
                                />
                              )}
                            </div>
                            <div className="grid-cols-1">
                              {bug.user.role && (
                                <span className="badge badge-ghost badge-sm">
                                  {bug.user?.role}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-center">
                        <Link
                          to={`/details/${bug._id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          details
                        </Link>
                      </td>

                      <td className="text-center">
                        <div className="m-2">
                          <ResolveModal id={bug._id} resolveBug={resolveBug} resolved={bug.resolved}/>
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
              <th className="text-center">Assigned To</th>
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
