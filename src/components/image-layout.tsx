import { ReactNode } from "react";

export function ImageLayout({
  children,
  imageSrc,
}: {
  children: ReactNode;
  imageSrc: string;
}) {
  return (
    <div>
      <div>
        <img src={imageSrc} alt="" />
      </div>
      <div>{children}</div>
    </div>
  );
}
