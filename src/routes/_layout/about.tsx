import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../components/title.tsx";
import { BlockText } from "../../components/block-text.tsx";
import { VigonotionLogo } from "../../components/vigonotion-logo.tsx";
import { css } from "../../../styled-system/css";

export const Route = createFileRoute("/_layout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Title>About</Title>
      <BlockText>
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

        <a
          href="https://vigonotion.com"
          className={css({ mt: "8", display: "inline-block" })}
        >
          <VigonotionLogo />
        </a>
      </BlockText>
    </>
  );
}
