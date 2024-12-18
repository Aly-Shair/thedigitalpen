import React, { useId } from "react";
import { forwardRef } from "react";

const Input = forwardRef(({
    label,
    type = 'text',
    placeholder,
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className="mb-3">
            {
                label && <label htmlFor={id} className="form-label">{label}</label>
            }
            <input type={type} id={id} className="form-control" placeholder={placeholder} {...props} ref={ref}/>
        </div>
    )
})

export default Input;