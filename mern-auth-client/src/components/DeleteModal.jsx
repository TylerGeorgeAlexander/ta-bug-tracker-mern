import React from "react";

const Modal = ({ deleteBug, id }) => {
  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor={`delete-modal-${id}`}
        className="btn modal-button btn-warning hover:btn-error"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </label>

      {/* <!-- Put this part before </body> tag --> */}
      <input
        type="checkbox"
        id={`delete-modal-${id}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex justify-center">
            Are you sure you want to delete?
          </h3>
          <p className="py-4 flex justify-center">
            This is a hard delete. The information will be lost forever.
          </p>
          <div className="modal-action flex justify-center">
            <label
              htmlFor={`delete-modal-${id}`}
              className="btn hover:btn-primary"
            >
              Cancel
            </label>
          </div>
          <div className="modal-action flex justify-center">
            {/* <label htmlFor={`delete-modal-${id}`} className="btn">
              DELETE
            </label> */}
            <label
              htmlFor={`delete-modal-${id}`}
              onClick={() => deleteBug(id)}
              className="btn btn-warning hover:btn-error"
            >
              delete
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
