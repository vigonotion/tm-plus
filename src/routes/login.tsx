import { createFileRoute, Link } from "@tanstack/react-router";
import { ImageLayout } from "../components/image-layout.tsx";
import { vstack } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import { TmpLogo } from "../components/tmp-logo.tsx";
import { Title } from "../components/title.tsx";
import { BlockText } from "../components/block-text.tsx";
import image from "../assets/mars-with-dome.png";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ImageLayout imageSrc={image}>
      <div
        className={vstack({
          alignItems: "start",
          justifyContent: "space-between",
          height: "100%",
        })}
      >
        <div className={css({ mb: "10" })}>
          <TmpLogo />
        </div>
        <div className={css({ mb: "20vh" })}>
          <Title>Login</Title>
          <BlockText>Blub</BlockText>
        </div>
        <div></div>
      </div>
    </ImageLayout>
  );
}
