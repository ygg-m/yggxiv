import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Tab = ({ path, name }: { path: string; name: string }) => (
  <NavLink
    to={path}
    key={uuid()}
    className={({ isActive }) =>
      isActive
        ? "tab-active tab duration-300"
        : "tab tabs-boxed bg-transparent duration-300 hover:bg-base-200"
    }
  >
    {name}
  </NavLink>
);

export const SubTabs = ({ isDefaultPath }: { isDefaultPath: boolean }) => {
  return (
    <nav className="tabs tabs-boxed grid h-fit w-fit rounded-lg bg-base-100 p-1 md:grid-cols-2">
      <NavLink
        to="Mounts"
        key={uuid()}
        className={({ isActive }) =>
          isActive || isDefaultPath
            ? "tab-active tab tab-lifted duration-300"
            : "tab tab-lifted duration-300"
        }
      >
        Mounts
      </NavLink>

      <Tab path="Minions" name="Minions" />
    </nav>
  );
};
