import React from "react";
import AvatarPlaceholder from "./AvatarPlaceholder";

const Avatar = ({ picture, firstName, lastName }) => {
  return (
    <>
      {/* TODO: Technical Debt - change the loose equality to strict */}
      {/* We can't strict equality a complex data type in this case, an object accessing a string.
       Potential fix could be useMemo however we are updating the data dependent on other factors being passed in*/}
      {/* eslint-disable-next-line eqeqeq */}
      {picture != "" && (
        <div title={`${firstName} ${lastName}`} className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={picture} alt="User's Avatar" />
          </div>
        </div>
      )}

      {/* eslint-disable-next-line eqeqeq */}
      {picture == "" && <AvatarPlaceholder firstName={"N"} lastName={"A"} />}
    </>
  );
};

export default Avatar;
