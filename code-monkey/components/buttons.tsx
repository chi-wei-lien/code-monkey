import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <button
      type="button"
      className={`${rest.className} text-white bg-red-400 border hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2`}
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
      className={`${rest.className} text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const BlackButton = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button
      type="button"
      className={`${rest.className} text-white bg-themeBrown border hover:bg-themeDarkBrown focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const TagButton = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:focus:ring-yellow-900"
      {...rest}
    >
      {children}
    </button>
  );
};
