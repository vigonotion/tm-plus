import { ReactNode } from "react";
import { css } from "../../styled-system/css";

export function ImageLayout({
  children,
  imageSrc,
}: {
  children: ReactNode;
  imageSrc: string;
}) {
  return (
    <div
      className={css({
        padding: "10",
        display: "grid",
        gridTemplateColumns: "400px 1fr",
        gap: "10",
        height: "100vh",
      })}
    >
      <div
        className={css({
          overflow: "hidden",
          borderRadius: "lg",
        })}
      >
        <img
          src={imageSrc}
          alt=""
          className={css({
            objectFit: "cover",
            objectPosition: "center",
            height: "100%",
          })}
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
