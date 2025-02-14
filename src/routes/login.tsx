import { createFileRoute } from "@tanstack/react-router";
import { ImageLayout } from "../components/image-layout.tsx";
import { TmpLogo } from "../components/tmp-logo.tsx";
import { Title } from "../components/title.tsx";
import image from "../assets/mars-with-dome.png";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ImageLayout imageSrc={image}>
      <div>
        <div>
          <TmpLogo />
        </div>
        <div>
          <Title>Login</Title>
          <p>Blub</p>
        </div>
        <div></div>
      </div>
    </ImageLayout>
  );
}
