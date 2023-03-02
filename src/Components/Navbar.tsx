import {
  FreeCompanyIcon,
  GithubIcon,
  PlayerIcon,
} from "../Assets/Images/UI/index";

export const Navbar = () => {
  const Logo = () => {
    return (
      <div className="flex-1">
        <a href="/yggxiv" className="btn btn-ghost normal-case text-xl">
          Ygg XIV
        </a>
      </div>
    );
  };

  const Input = () => {
    return (
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered bg-base-100 focus:bg-gray-900"
        />
      </div>
    );
  };

  const MenuButton = () => {
    return (
      <button tabIndex={0} className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-5 h-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </button>
    );
  };

  type OptionProps = {
    name: string;
    url: string;
    icon?: object;
    newTag?: boolean;
  };

  const Option = (props: OptionProps) => {
    const { name, url, icon, newTag } = props;
    return (
      <li className="">
        <a href={`/yggxiv/${url}`} className="justify-between">
          <span className="flex gap-4">
            <>{icon && icon}</>
            <>{name}</>
          </span>
          {newTag && <span className="badge">New</span>}
        </a>
      </li>
    );
  };

  return (
    <div className="navbar bg-base-100">
      <Logo />
      <div className="flex-none gap-2">
        <Input />
        <div className="dropdown dropdown-end">
          <MenuButton />
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <Option
              name="Free Company"
              url="/FreeCompany"
              icon={<FreeCompanyIcon className="h-5 w-5" />}
            />
            <Option
              name="Player"
              url="/Player"
              newTag
              icon={<PlayerIcon className="h-5 w-5" />}
            />
            <div className="h-[1px] my-1 bg-white opacity-10"></div>
            <li>
              <a href="https://github.com/ygg-m/yggxiv">
                <GithubIcon className="h-5 w-5" />
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
