import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Tab = ({ path, name }: { path: string; name: string }) => (
  <NavLink
    to={path}
    key={uuidv4()}
    className={({ isActive }) =>
      isActive
        ? "tab-active tab tab-lifted tab-lg duration-100"
        : "tab tab-lifted tab-lg duration-100"
    }
  >
    {name}
  </NavLink>
);

export const Navigator = ({ isDefaultPath }: { isDefaultPath: boolean }) => {
  return (
    <nav className="flex">
      <div className="tabs">
        <NavLink
          to="Info"
          key={uuidv4()}
          className={({ isActive }) =>
            isActive || isDefaultPath
              ? "tab-active tab tab-lifted tab-lg duration-100"
              : "tab tab-lifted tab-lg duration-100"
          }
        >
          Info
        </NavLink>
        <Tab path="Jobs" name="Jobs" />
        <Tab path="Gear" name="Gear" />
        <Tab path="Collection" name="Collection" />
        <Tab path="Achievements" name="Achievements" />
        <Tab path="Stats" name="Stats" />
      </div>
    </nav>
  );
};
