import React from "react";
import { Headline } from "../Headline";
import { VigonotionLogo } from "../VigonotionLogo";

export function About() {
  return (
    <div className="flex flex-col gap-16">
      <Headline>About</Headline>

      <div className="prose">
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
      </div>

      <a href="https://vigonotion.com">
        <VigonotionLogo />
      </a>
    </div>
  );
}
