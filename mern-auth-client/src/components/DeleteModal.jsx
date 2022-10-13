import React from "react";

const Modal = ({ deleteBug, id }) => {
  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor={`modal-${id}`}
        className="btn modal-button btn-warning hover:btn-error"
      >
        delete {id}
      </label>

      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id={`modal-${id}`} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">
            Are you sure you want to delete?
          </h3>
          <p className="py-4 flex justify-center">
            This is a hard delete. The information will be lost forever.
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
            <button
              onClick={() => deleteBug(id)}
              className="btn btn-warning hover:btn-error"
            >
              delete {id}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
