import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Tab = ({ path, name }: { path: string; name: string }) => (
  <NavLink
    to={path}
    key={uuidv4()}
    className={({ isActive }) =>
      isActive
        ? "tab tab-active tab-lg duration-300"
        : "tab tabs-boxed tab-lg bg-transparent duration-300 hover:bg-base-200"
    }
  >
    {name}
  </NavLink>
);

export const Tabs = ({ isDefaultPath }: { isDefaultPath: boolean }) => {
  return (
    <nav className="tabs tabs-boxed grid h-fit rounded-lg bg-base-100 p-2 sm:grid-cols-3 md:grid-cols-6">
      <NavLink
        to="Summary"
        key={uuidv4()}
        className={({ isActive }) =>
          isActive || isDefaultPath
            ? "tab tab-lifted tab-active tab-lg duration-300"
            : "tab tab-lifted tab-lg duration-300"
        }
      >
        Summary
      </NavLink>

      <Tab path="Character" name="Character" />
      <Tab path="Job" name="Job" />
      <Tab path="Mount" name="Mount" />
      <Tab path="Minion" name="Minion" />
      <Tab path="Achievement" name="Achievement" />
    </nav>
  );
};
