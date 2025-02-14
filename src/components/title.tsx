import { PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};
