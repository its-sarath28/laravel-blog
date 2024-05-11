import React from "react";

const DeletePost = ({ isOpen, toggleOpen, children }) => (
  <div className={`overlay ${isOpen ? "open" : ""}`} onClick={toggleOpen}>
    <div className="modal">{children}</div>
  </div>
);

export default DeletePost;
