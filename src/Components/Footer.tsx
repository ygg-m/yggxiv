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
    <footer className="footer bg-base-200 p-10 text-base-content">
      <div className="flex items-center">
        <img src={YggDrasilBerry} alt="YggDrasil Berry" />
        <p>
          <Link to="/Character/29518378" className="link-hover link-primary">
            Ygg Lart
          </Link>
          <br />
          Providing useful websites since 2022.
          <br />
          Ygg XIV made with{" "}
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
      <div>
        <span className="footer-title m-0">About Me</span>
        <a
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 px-2 duration-100 hover:bg-neutral hover:text-primary"
          href=""
        >
          <WebIcon className="h-4 w-4" />
          Website
        </a>
        <a
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 px-2 duration-100 hover:bg-neutral hover:text-primary"
          href=""
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
        <a
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 px-2 duration-100 hover:bg-neutral hover:text-primary"
          href=""
        >
          <BehanceIcon className="h-4 w-4" />
          Behance
        </a>
        <a
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 px-2 duration-100 hover:bg-neutral hover:text-primary"
          href=""
        >
          <DiscordIcon className="h-4 w-4" />
          Discord
        </a>
      </div>
      <div>
        <span className="footer-title m-0">Support Me</span>
        <a
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 px-2 duration-100 hover:bg-neutral hover:text-primary"
          href=""
        >
          <PaypalIcon className="h-4 w-4" />
          PayPal
        </a>
        <a
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 px-2 duration-100 hover:bg-neutral hover:text-primary"
          href=""
        >
          <KofiIcon className="h-4 w-4" />
          Ko-Fi
        </a>
      </div>
      <div>
        <span className="footer-title m-0">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a
            className="flex cursor-pointer items-center gap-2 rounded-lg p-1 px-2 duration-100 hover:bg-neutral hover:text-primary"
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
