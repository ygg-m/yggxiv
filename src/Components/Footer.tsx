import {
  BehanceIcon,
  DiscordIcon,
  GithubIcon,
  KofiIcon,
  PaypalIcon,
  TwitterIcon,
  WebIcon,
} from "../Assets/Images/UI";

import YggDrasilBerry from "@/Assets/Images/UI/yggdrasilberry.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer place-items-center bg-base-200 p-10 text-base-content">
      <div className="grid w-full max-w-screen-2xl gap-12 px-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="grid gap-3">
          <div className="flex items-center gap-3">
            <img src={YggDrasilBerry} alt="YggDrasil Berry" />
            <p>
              <Link
                to="/Character/29518378"
                className="link-hover link-primary"
              >
                Ygg Lart
              </Link>
              <br />
              Providing useful websites since 2022.
            </p>
          </div>

          <p>
            Ygg XIV was made with{" "}
            <a href="https://xivapi.com/" className="link">
              XIVAPI
            </a>{" "}
            and{" "}
            <a href="https://ffxivcollect.com/" className="link">
              FFXIV Collect
            </a>
            .
          </p>
        </div>
        <div className="grid w-full gap-1">
          <span className="footer-title m-0">About Me</span>
          <a
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-neutral hover:text-primary md:p-1 md:px-2"
            href=""
          >
            <WebIcon className="h-4 w-4" />
            Website
          </a>
          <a
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-neutral hover:text-primary md:p-1 md:px-2"
            href=""
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-neutral hover:text-primary md:p-1 md:px-2"
            href=""
          >
            <BehanceIcon className="h-4 w-4" />
            Behance
          </a>
          <a
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-neutral hover:text-primary md:p-1 md:px-2"
            href=""
          >
            <DiscordIcon className="h-4 w-4" />
            Discord
          </a>
        </div>
        <div className="grid w-full gap-1">
          <span className="footer-title m-0">Support Me</span>
          <a
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-neutral hover:text-primary md:p-1 md:px-2"
            href=""
          >
            <PaypalIcon className="h-4 w-4" />
            PayPal
          </a>
          <a
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-neutral hover:text-primary md:p-1 md:px-2"
            href=""
          >
            <KofiIcon className="h-4 w-4" />
            Ko-Fi
          </a>
        </div>
        <div className="grid w-full gap-1">
          <span className="footer-title m-0">Social</span>
          <a
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 duration-100 hover:bg-neutral hover:text-primary md:p-1 md:px-2"
            href=""
          >
            <TwitterIcon className="h-4 w-4" />
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};
