import {
  DiscordIcon,
  GithubIcon,
  KofiIcon,
  PaypalIcon,
  TwitterIcon,
} from "../Assets/Images/UI";
export const Footer = () => {
  return (
    <footer className="footer gap-2 items-center p-4 px-8 bg-neutral text-neutral-content justify-center md:justify-between">
      <div className="items-center grid-flow-col">
        <img src="https://www.divine-pride.net/img/items/item/iRO/607" alt="" />
        <p>
          Website by{" "}
          <a href="https://linktr.ee/yggm" className="link">
            Ygor Goulart
          </a>{" "}
          using{" "}
          <a href="https://xivapi.com/" className="link">
            XIVAPI
          </a>
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://github.com/ygg-m/yggxiv"
          className="btn btn-square hover:bg-primary hover:text-neutral-200"
        >
          <GithubIcon className="h-8 w-8" />
        </a>
        <div className="divider divider-horizontal m-0"></div>
        <a
          href="https://twitter.com/yggm_"
          className="btn btn-square hover:bg-primary hover:text-neutral-200"
        >
          <TwitterIcon className="h-8 w-8" />
        </a>
        <a
          href="https://discord.com/invite/ZapfK82Fjk"
          className="btn btn-square hover:bg-primary hover:text-neutral-200"
        >
          <DiscordIcon className="h-8 w-8" />
        </a>
        <div className="divider divider-horizontal m-0"></div>
        <a
          href="https://ko-fi.com/yggm_"
          className="btn btn-square hover:bg-primary hover:text-neutral-200"
        >
          <KofiIcon className="h-8 w-8" />
        </a>
        <a
          href="https://www.paypal.com/donate/?business=3GPA48HHRS6Y6&no_recurring=0&item_name=Thank+you+so+much+for+your+kindness%21%0AYou%27re+helping+to+make+my+project+bright%21&currency_code=BRL"
          className="btn btn-square hover:bg-primary hover:text-neutral-200"
        >
          <PaypalIcon className="h-8 w-8" />
        </a>
      </div>
    </footer>
  );
};
