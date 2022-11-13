import React, { useState, useEffect } from "react";
import axios from "axios";
import BugGraph from "../components/BarGraph";

const Vis = ({ userContext }) => {
  const [data, setData] = useState([]);
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
      getData();
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
    data.bugs.filter((bug) => bug.priority === priority).length;

  // Construct an array of objects
  // this is the data being passed in

  // x axis represents the priority type, such as low, medium, high, immediately
  // y axis represents the number of those priority types

  return (
    <>
      <BugGraph data={bugData} xAxis={["priority"]} yAxis={["priorityCount"]} />

      {/* {JSON.stringify(bugData)} */}
      {/* {result} */}
      <button onClick={getBugData}>Click</button>
      <p>Test</p>
    </>
  );
};

export default Vis;
