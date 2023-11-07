import pkg from "../../../package.json";
import {
  COMMONWEALTH_URL,
  DOCS_SMART_CONTRACTS_URL,
  PRIVACY_POLICY_URL,
} from "constants-helper";
import {
  CodeIcon,
  CommonWealthIcon,
  DiscordIcon,
  GithubIcon,
  TelegramIcon,
  TwitterIcon,
} from "icons";
import { ConsentModalButton } from "./ConsentModalButton";

export const Footer = () => {
  return (
    <footer className="text-gray-700 mb-10 mt-10 space-y-2 lg:space-y-0 font-display flex lg:justify-between flex-col lg:flex-row items-center">
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
          <h1>Version: main - {pkg.version}</h1>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.coingecko.com"
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
            href="https://github.com/tharsis/evmos"
            aria-label="github evmos"
          >
            <GithubIcon />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/evmosorg"
            aria-label="twitter evmos"
          >
            <TwitterIcon width={20} height={20} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://discord.com/invite/evmos"
            aria-label="discord evmos"
          >
            <DiscordIcon />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://t.me/EvmosOrg"
            aria-label="discord telegram"
          >
            <TelegramIcon />
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
              href="https://evmos.org/terms-of-service"
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

          <ConsentModalButton />
        </div>
      </div>
    </footer>
  );
};
