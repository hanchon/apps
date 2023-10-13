// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { DOCS_SMART_CONTRACTS_URL, COMMONWEALTH_URL } from "constants-helper";

import {
  TwitterIcon,
  TelegramIcon,
  GithubIcon,
  DiscordIcon,
  CommonWealthIcon,
  CodeIcon,
} from "icons";
import { PRIVACY_POLICY_URL } from "constants-helper";
import { FEEDBACK_URL } from "constants-helper";

export const Footer = ({
  onClickFeedback,
  handleCookies,
  version,
}: {
  onClickFeedback?: React.MouseEventHandler<HTMLAnchorElement>;
  handleCookies?: React.MouseEventHandler<HTMLButtonElement>;
  version: string;
}) => {
  function getVersion() {
    const app_env = process.env.NEXT_PUBLIC_EVMOS_APP_ENV ?? "staging";
    if (app_env === "production") {
      return version;
    }
    return "main - " + version;
  }

  return (
    <footer className=" text-pink-200 mb-10 mt-10 space-y-2 font-[IBM] flex lg:justify-between flex-col lg:flex-row items-center">
      <div className="flex flex-col items-center space-y-3 lg:flex-row lg:space-x-10 lg:space-y-0">
        <Link
          href={DOCS_SMART_CONTRACTS_URL}
          className="flex items-center space-x-3"
          target="_blank"
          rel="noreferrer"
        >
          <CodeIcon width={30} height={30} />
          <span className="text-sm"> Build With Us</span>
        </Link>
        <div className="flex flex-col space-y-1 text-center lg:text-left">
          <p>Version: {getVersion()}</p>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.coingecko.com"
            aria-label="coingecko"
            className="text-sm"
          >
            Data by Coingecko API
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-2 lg:space-y-0">
        <div className="flex items-center space-x-5 opacity-50 mt-2 lg:mt-0">
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/tharsis/evmos"
            aria-label="github evmos"
          >
            <GithubIcon />
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/evmosorg"
            aria-label="twitter evmos"
          >
            <TwitterIcon />
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://discord.com/invite/evmos"
            aria-label="discord evmos"
          >
            <DiscordIcon />
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://t.me/EvmosOrg"
            aria-label="discord telegram"
          >
            <TelegramIcon />
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={COMMONWEALTH_URL}
            aria-label="commonwealth evmos"
          >
            <CommonWealthIcon />
          </Link>
        </div>

        <div className="flex flex-grow flex-col items-center space-y-2 opacity-50  lg:flex-row lg:space-x-5 lg:space-y-0 lg:px-2">
          <p>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://evmos.org/terms-of-service"
              aria-label="terms of services"
            >
              Terms of Service
            </Link>
          </p>
          <p>
            <Link
              target="_blank"
              rel="noreferrer"
              href={PRIVACY_POLICY_URL}
              aria-label="privacy policy"
            >
              Privacy Policy
            </Link>
          </p>
          <p>
            <Link
              target="_blank"
              rel="noreferrer"
              href={FEEDBACK_URL}
              aria-label="feedback"
              onClick={onClickFeedback}
            >
              Feedback
            </Link>
          </p>
          <button onClick={handleCookies}>Cookies Settings</button>
        </div>
      </div>
    </footer>
  );
};
