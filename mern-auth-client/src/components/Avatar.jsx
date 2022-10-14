import React from "react";

const Avatar = ({ picture, firstName, lastName }) => {
  return (
    <>
      <div title={`${firstName} ${lastName}`} className="avatar">
        <div className="mask mask-squircle w-12 h-12">
          <img src={picture} alt="User's Avatar" />
        </div>
      </div>
    </>
  );
};

export default Avatar;
