import React from "react";

const AvatarPlaceholder = ({ firstName, lastName }) => {
  return (
    <>
      <div title={`${firstName} ${lastName}`} className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
          <span>{firstName.charAt(0) + lastName.charAt(0)}</span>
        </div>
      </div>
    </>
  );
};

export default AvatarPlaceholder;
