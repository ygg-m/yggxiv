import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Tab = ({ path, name }: { path: string; name: string }) => (
  <NavLink
    to={path}
    key={uuidv4()}
    className={({ isActive }) =>
      isActive
        ? "tab tab-active tab-lg duration-100"
        : "tabs-boxed tab tab-lg bg-transparent duration-100 hover:bg-base-200"
    }
  >
    {name}
  </NavLink>
);

export const Tabs = ({ isDefaultPath }: { isDefaultPath: boolean }) => {
  return (
    <nav className="tabs tabs-boxed grid h-fit rounded-lg bg-base-100 p-2 md:grid-cols-2">
      <NavLink
        to="FullList"
        key={uuidv4()}
        className={({ isActive }) =>
          isActive || isDefaultPath
            ? "tab tab-active tab-lg duration-100"
            : "tab tab-lg duration-100"
        }
      >
        Full List
      </NavLink>

      <Tab path="Expansion" name="Expansion" />
    </nav>
  );
};
