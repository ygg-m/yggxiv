import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Tab = ({ path, name }: { path: string; name: string }) => (
  <NavLink
    to={path}
    key={uuidv4()}
    className={({ isActive }) =>
      isActive
        ? "tab-active tab tab-lg duration-100"
        : "tab tabs-boxed tab-lg bg-transparent duration-100 hover:bg-base-200"
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
            ? "tab-active tab tab-lifted tab-lg duration-100"
            : "tab tab-lifted tab-lg duration-100"
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
