import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Tab = ({ path, name }: { path: string; name: string }) => (
  <NavLink
    to={path}
    key={uuidv4()}
    className={({ isActive }) =>
      isActive
        ? "tab-lifted tab tab-active tab-lg duration-300"
        : "tab-lifted tab tab-lg duration-300"
    }
  >
    {name}
  </NavLink>
);

interface NavigatorProps {
  MemberCount: number;
}

export const Navigator = () => {
  return (
    <nav className="flex">
      <div className="tabs">
        <Tab path="Info" name="Info" />
        <Tab path="Jobs" name="Jobs" />
        <Tab path="Gear" name="Gear" />
        <Tab path="Collection" name="Collection" />
        <Tab path="Achievements" name="Achievements" />
        <Tab path="Stats" name="Stats" />
      </div>
    </nav>
  );
};
