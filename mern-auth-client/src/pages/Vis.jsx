import React, { useState, useEffect } from "react";
import axios from "axios";
import BugGraph from "../components/BarGraph";
import Loader from "../components/Loader";

const Vis = ({ userContext }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bugData, setBugData] = useState([
    { priority: "low", priorityCount: 1 },
    { priority: "medium", priorityCount: 1 },
    { priority: "high", priorityCount: 1 },
    {
      priority: "immediately",
      priorityCount: 1,
    },
  ]);
  //   const [filter, setFilter] = useState({
  //     assignedTo: "",
  //     createdBy: "",
  //     type: "",
  //     priority: "",
  //     resolved: "",
  //   });

  const getData = async () => {
    const UPLOAD_ENDPOINT = process.env.REACT_APP_API_ENDPOINT + `/bug/getFeed`;

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
      getData().then(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getBugData = async () => {
    setBugData([
      { priority: "low", priorityCount: priorityCounter("low") },
      { priority: "medium", priorityCount: priorityCounter("medium") },
      { priority: "high", priorityCount: priorityCounter("high") },
      {
        priority: "immediately",
        priorityCount: priorityCounter("immediately"),
      },
    ]);
  };

  const priorityCounter = (priority) =>
    data.bugs?.filter((bug) => bug.priority === priority).length;

  useEffect(
    () => {
      getBugData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading]
  );

  // Construct an array of objects
  // this is the data being passed in

  // x axis represents the priority type, such as low, medium, high, immediately
  // y axis represents the number of those priority types

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BugGraph
          data={bugData}
          xAxis={["priority"]}
          yAxis={["priorityCount"]}
        />
      )}

      {/* {JSON.stringify(bugData)} */}
      {/* {result} */}
      <div className="text-center m-2">
        <button className="btn text-center" onClick={getBugData}>
          Display Bug Priority
        </button>
      </div>
    </>
  );
};

export default Vis;
