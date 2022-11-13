import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BugGraph from "../components/BarGraph";
import Loader from "../components/Loader";

const Vis = ({ userContext }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bugData, setBugData] = useState([
    { priority: "low", count: 1 },
    { priority: "medium", count: 1 },
    { priority: "high", count: 1 },
    {
      priority: "immediately",
      count: 1,
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
      { priority: "low", count: priorityCounter("low"), indexValue: 0 },
      {
        priority: "medium",
        count: priorityCounter("medium"),
        indexValue: 1,
      },
      {
        priority: "high",
        count: priorityCounter("high"),
        indexValue: 2,
      },
      {
        priority: "immediately",
        count: priorityCounter("immediately"),
        indexValue: 3,
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
          yAxis={["count"]}
          indexValue={["indexValue"]}
          xName={"priority"}
          yName={"number"}
        />
      )}

      {/* {JSON.stringify(bugData)} */}
      {/* {result} */}
      <div className="text-center m-2">
        <Link className="btn text-center" to="/bugs">
          Navigate to Bugs
        </Link>
      </div>
    </>
  );
};

export default Vis;
