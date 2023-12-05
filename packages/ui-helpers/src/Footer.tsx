// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  DOCS_SMART_CONTRACTS_URL,
  COMMONWEALTH_URL,
  GITHUB_EVMOS_URL,
  MEDIUM_URL,
  PRIVACY_POLICY_URL,
  COINGECKO_URL,
  TWITTER_EVMOS_URL,
  DISCORD_EVMOS_URL,
  TELEGRAM_EVMOS_URL,
  TOS_EVMOS_URL,
} from "constants-helper";

import {
  TwitterIcon,
  TelegramIcon,
  GithubIcon,
  DiscordIcon,
  CommonWealthIcon,
  CodeIcon,
  MediumIcon,
} from "icons";

export const Footer = ({
  handleCookies,
  version,
}: {
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
    <footer className="text-gray-700 mb-10 mt-10 space-y-2 lg:space-y-0 flex lg:justify-between flex-col lg:flex-row items-center">
      <div className="flex flex-col items-center space-y-3 lg:flex-row lg:space-x-10 lg:space-y-0">
        <p>
          <a
            href={DOCS_SMART_CONTRACTS_URL}
            className="flex items-center space-x-3 text-sm"
            target="_blank"
            rel="noreferrer"
          >
            <CodeIcon
              width={30}
              height={30}
              className="text-gray-700 hover:text-gray-700"
            />
            <span>Build With Us</span>
          </a>
        </p>
        <div className="flex flex-col lg:flex-row space-x-2 text-center lg:text-left items-center space-y-2 lg:space-y-0">
          <h1>Version: {getVersion()}</h1>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={COINGECKO_URL}
              aria-label="coingecko"
              className="text-sm"
            >
              Data by Coingecko API
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-2 lg:space-y-0">
        <div className="flex items-center space-x-5 mt-2 lg:mt-0">
          <a
            target="_blank"
            rel="noreferrer"
            href={GITHUB_EVMOS_URL}
            aria-label="github evmos"
          >
            <GithubIcon />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={TWITTER_EVMOS_URL}
            aria-label="twitter evmos"
          >
            <TwitterIcon width={20} height={20} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={DISCORD_EVMOS_URL}
            aria-label="discord evmos"
          >
            <DiscordIcon />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={TELEGRAM_EVMOS_URL}
            aria-label="discord telegram"
          >
            <TelegramIcon />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={MEDIUM_URL}
            aria-label="medium evmos"
          >
            <MediumIcon width={24} height={24} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={COMMONWEALTH_URL}
            aria-label="commonwealth evmos"
          >
            <CommonWealthIcon />
          </a>
        </div>

        <div className="flex flex-grow flex-col items-center space-y-2 lg:flex-row lg:space-x-5 lg:space-y-0 lg:px-2">
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={TOS_EVMOS_URL}
              aria-label="terms of services"
            >
              Terms of Service
            </a>
          </p>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={PRIVACY_POLICY_URL}
              aria-label="privacy policy"
            >
              Privacy Policy
            </a>
          </p>

          <button onClick={handleCookies}>
            <p>Cookies Settings</p>
          </button>
        </div>
      </div>
    </footer>
  );
};
