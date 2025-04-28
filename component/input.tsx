import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  classname?: string;
  type?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, classname, ...props }, ref) => {
    return (
      <div className="mt-2 w-full">
        <label
          htmlFor={props.id || props.name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 w-full">
          <input
            error={props.error}
            ref={ref}
            {...props}
            name={props.name}
            type={props.type}
            className={`${classname} grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
