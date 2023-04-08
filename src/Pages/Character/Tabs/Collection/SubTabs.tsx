import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

export const SubTabs = ({
  isDefaultPath,
  isMainPath,
}: {
  isDefaultPath: boolean;
  isMainPath?: boolean;
}) => {
  return (
    <nav className="tabs tabs-boxed grid h-fit w-fit rounded-lg bg-base-100 p-1 md:grid-cols-2">
      <NavLink
        to={isDefaultPath ? "FullList/Mounts" : "Mounts"}
        key={uuid()}
        className={({ isActive }) =>
          isActive || isDefaultPath || isMainPath
            ? "tab-active tab tab-lifted duration-100"
            : "tab tab-lifted duration-100"
        }
      >
        Mounts
      </NavLink>
      <NavLink
        to={isDefaultPath ? "FullList/Minions" : "Minions"}
        key={uuid()}
        className={({ isActive }) =>
          isActive
            ? "tab-active tab tab-lifted duration-100"
            : "tab tab-lifted duration-100"
        }
      >
        Minions
      </NavLink>
    </nav>
  );
};
