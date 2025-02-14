import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../components/title.tsx";
import { VigonotionLogo } from "../../components/vigonotion-logo.tsx";

export const Route = createFileRoute("/_layout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>About</Title>
      <div>
        <p>This page is built and maintained by Tom Schneider.</p>

        <ul>
          <li>
            <a
              className="underline"
              href="https://vigonotion.com/privacy-policy/"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              className="underline"
              href="https://vigonotion.com/legal-disclosure/"
            >
              Legal Disclosure
            </a>
          </li>
        </ul>

        <a href="https://vigonotion.com">
          <VigonotionLogo />
        </a>
      </div>
    </>
  );
}
