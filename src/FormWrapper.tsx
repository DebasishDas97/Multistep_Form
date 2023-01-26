import { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <h1 className="text-center m-0 mb-8">{title}</h1>
      <div className="grid gap-x-4 gap-y-2 justify-start grid-cols-1">{children}</div>
    </>
  );
};
