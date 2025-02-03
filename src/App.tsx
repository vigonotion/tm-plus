import { createRouter, Link, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { ImageLayout } from "./components/image-layout.tsx";
import { Title } from "./components/title.tsx";
import starship from "./assets/starship-above-mars.png";
import { BlockText } from "./components/block-text.tsx";
import { vstack } from "../styled-system/patterns";
import { TmpLogo } from "./components/tmp-logo.tsx";
import { css } from "../styled-system/css";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <ImageLayout imageSrc={starship}>
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
            <Title>Page not found</Title>
            <BlockText>
              It seems like you are lost! Go <Link to={"/"}>back home</Link>.
            </BlockText>
          </div>
          <div></div>
        </div>
      </ImageLayout>
    );
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
