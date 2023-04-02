import {
  DiscordIcon,
  GithubIcon,
  KofiIcon,
  PaypalIcon,
  TwitterIcon,
} from "../Assets/Images/UI";

import YggDrasilBerry from "@/Assets/Images/UI/yggdrasilberry.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer items-center justify-center gap-2 bg-neutral p-4 px-8 text-neutral-content md:justify-between">
      <div className="grid-flow-col items-center">
        <img src={YggDrasilBerry} alt="YggDrasil Berry" />
        <p>
          Website by{" "}
          <a href="https://linktr.ee/yggm" className="link">
            Ygor Goulart
          </a>{" "}
          (<Link to="/Character/29518378" className="link">
            Ygg Lart
          </Link>){" "}
          using{" "}
          <a href="https://xivapi.com/" className="link">
            XIVAPI
          </a>{" "}
          and{" "}
          <a href="https://ffxivcollect.com/" className="link">
            FFXIV Collect
          </a>
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://github.com/ygg-m/yggxiv"
          className="btn-square btn hover:bg-primary hover:text-neutral"
        >
          <GithubIcon className="h-8 w-8" />
        </a>
        <div className="divider divider-horizontal m-0"></div>
        <a
          href="https://twitter.com/yggm_"
          className="btn-square btn hover:bg-primary hover:text-neutral"
        >
          <TwitterIcon className="h-8 w-8" />
        </a>
        <a
          href="https://discord.com/invite/ZapfK82Fjk"
          className="btn-square btn hover:bg-primary hover:text-neutral"
        >
          <DiscordIcon className="h-8 w-8" />
        </a>
        <div className="divider divider-horizontal m-0"></div>
        <a
          href="https://ko-fi.com/yggm_"
          className="btn-square btn hover:bg-primary hover:text-neutral"
        >
          <KofiIcon className="h-8 w-8" />
        </a>
        <a
          href="https://www.paypal.com/donate/?business=3GPA48HHRS6Y6&no_recurring=0&item_name=Thank+you+so+much+for+your+kindness%21%0AYou%27re+helping+to+make+my+project+bright%21&currency_code=BRL"
          className="btn-square btn hover:bg-primary hover:text-neutral"
        >
          <PaypalIcon className="h-8 w-8" />
        </a>
      </div>
    </footer>
  );
};
