import React from "react";

const Modal = ({ resolveBug, id }) => {
  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor={`modal-${id}`}
        className="btn modal-button btn-primary hover:btn-success"
      >
        resolve
      </label>

      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id={`modal-${id}`} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">
            Are you sure you want to resolve?
          </h3>
          <p className="py-4 flex justify-center">
            Do you want the experience? Code reviews await you, adventurer!
          </p>
          <div className="modal-action flex justify-center">
            <label htmlFor={`modal-${id}`} className="btn hover:btn-primary">
              Cancel
            </label>
          </div>
          <div className="modal-action flex justify-center">
            {/* <label htmlFor={`modal-${id}`} className="btn">
              DELETE
            </label> */}
            <label
              htmlFor={`modal-${id}`}
              onClick={() => resolveBug(id)}
              className="btn btn-primary hover:btn-success"
            >
              confirm
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
