import React from "react";

export default function Button({
    type = 'button',
    value,
    className = '',
    ...props
}) {
    return (
        <button type={type} className={`btn ${className}`} {...props}>{value}</button>
    )
}