import { createRouter, Link, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { ImageLayout } from "./components/image-layout.tsx";
import { Title } from "./components/title.tsx";
import starship from "./assets/starship-above-mars.png";
import { TmpLogo } from "./components/tmp-logo.tsx";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <ImageLayout imageSrc={starship}>
        <div>
          <div>
            <TmpLogo />
          </div>
          <div>
            <Title>Page not found</Title>
            <p>
              It seems like you are lost! Go <Link to={"/"}>back home</Link>.
            </p>
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
