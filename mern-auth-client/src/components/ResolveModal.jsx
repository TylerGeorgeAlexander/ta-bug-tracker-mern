import React from "react";

const Modal = ({ resolveBug, id, resolved }) => {
  return (
    <>
      {/* <!-- The button to open modal --> */}
      {resolved === "no" ? (
        <label
          htmlFor={`resolve-modal-${id}`}
          className="btn modal-button btn-primary hover:btn-primary-focus"
        >
          resolve
        </label>
      ) : (
        <label
          htmlFor={`resolve-modal-${id}`}
          className="btn modal-button btn-secondary hover:btn-secondary-focus"
        >
          open
        </label>
      )}

      {/* <!-- Put this part before </body> tag --> */}
      {resolved === "no" ? (
        <div>
          <input type="checkbox" id={`resolve-modal-${id}`} className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg flex justify-center">
                Are you sure you want to resolve?
              </h3>
              <p className="py-4 flex justify-center">
                Do you want the experience? Code reviews await you!
              </p>
              <div className="modal-action flex justify-center">
                <label
                  htmlFor={`resolve-modal-${id}`}
                  className="btn hover:btn-primary"
                >
                  Cancel
                </label>
              </div>
              <div className="modal-action flex justify-center">
                {/* <label htmlFor={`resolve-modal-${id}`} className="btn">
              DELETE
            </label> */}
                <label
                  htmlFor={`resolve-modal-${id}`}
                  onClick={() => resolveBug(id)}
                  className="btn btn-primary hover:btn-success"
                >
                  confirm
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input type="checkbox" id={`resolve-modal-${id}`} className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg flex justify-center">
                Are you sure you want to re-open this issue?
              </h3>
              <p className="py-4 flex justify-center">
                Code reviews don't always predict errors, edgecases or
                rollbacks!
              </p>
              <div className="modal-action flex justify-center">
                <label
                  htmlFor={`resolve-modal-${id}`}
                  className="btn hover:btn-secondary"
                >
                  Cancel
                </label>
              </div>
              <div className="modal-action flex justify-center">
                {/* <label htmlFor={`resolve-modal-${id}`} className="btn">
              DELETE
            </label> */}
                <label
                  htmlFor={`resolve-modal-${id}`}
                  onClick={() => resolveBug(id)}
                  className="btn btn-secondary hover:btn-secondary-focus"
                >
                  confirm
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
