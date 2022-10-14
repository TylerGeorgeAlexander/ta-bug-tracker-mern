import React from "react";

const PriorityPill = ({ priority }) => {
  let color = "bg-black";

  if (priority === "low") color = "bg-blue-500";
  if (priority === "medium") color = "bg-yellow-500";
  if (priority === "high") color = "bg-orange-500";
  if (priority === "immediately") color = "bg-red-500";

  return (
    <button className={`btn btn-sm rounded-full ${color}`}>
      {priority.toUpperCase()}
    </button>
  );
};

export default PriorityPill;
