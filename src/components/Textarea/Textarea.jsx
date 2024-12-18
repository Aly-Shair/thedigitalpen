import React, { forwardRef, useId } from "react";

const Textarea = forwardRef(
  ({ label, placeholder, className = "", ...props }, ref) => {
    const id = useId();
    return <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <textarea
        className="form-control"
        id={id}
        rows="4"
        placeholder={placeholder || "Write your comment here..."}
        {...props}
        ref={ref}
      ></textarea>
    </div>;
  }
);

export default Textarea;
