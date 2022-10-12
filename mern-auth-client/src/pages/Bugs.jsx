import axios from "axios";
import React, { useEffect, useState } from "react";

const Bugs = ({ userContext }) => {
  const UPLOAD_ENDPOINT = "http://localhost:8081/bug/getFeed";

  const [data, setData] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userContext.token}`,
    },
  };
  const getData = async () => {
    const { data } = await axios.get(UPLOAD_ENDPOINT, config);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2>Bugs</h2>
      <div>{JSON.stringify(data)}</div>
      {data &&
        data.bugs?.map((bug) => {
          return (
            <div key={`${bug.id} div`} className="overflow-x-auto w-full">
              <table key={`${bug.id} table`} className="table w-full">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- row 1 --> */}
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={"favicon.ico"}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bug.name}</div>
                          <div className="text-sm opacity-50">
                            {bug.app || "Default Application"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {bug.description}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {bug.user.role || "Desktop Support Technician"}
                      </span>
                    </td>
                    <td>{bug.priority.toUpperCase() || "HIGH"}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                </tbody>
                {/* <!-- foot --> */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })}
    </>
  );
};

export default Bugs;
