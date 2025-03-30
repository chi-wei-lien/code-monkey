import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <button
      type="button"
      className={`${rest.className} rounded-lg border bg-red-400 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300`}
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
      className={`${rest.className} rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100`}
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
      className={`${rest.className} rounded-lg border bg-themeBrown px-2 py-1 text-sm font-medium text-white hover:bg-themeDarkBrown focus:outline-none`}
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
      className="mb-2 me-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-900"
      {...rest}
    >
      {children}
    </button>
  );
};
