import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
      {...rest}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button
      type="button"
      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
      {...rest}
    >
      {children}
    </button>
  );
};
