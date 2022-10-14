import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = ({ userContext }) => {
  let { bugId } = useParams();

  const [data, setData] = useState([]);

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

  function assignTo(id) {
    const BASE_URL = `http://localhost:8081`;
    return axios.put(BASE_URL + `/assignBug/${id}`);
  }
  return (
    <>
      <h2 className="text-lg font-bold">Details:</h2>
      {JSON.stringify(bugId)}
      <br />
      {JSON.stringify(data)}
    </>
  );
};

export default Details;
