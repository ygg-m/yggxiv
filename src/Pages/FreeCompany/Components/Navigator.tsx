import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Tab = ({ path, name }: { path: string; name: string }) => (
  <NavLink
    to={path}
    key={uuidv4()}
    className={({ isActive }) =>
      isActive
        ? "tab tab-lifted tab-active tab-lg duration-300"
        : "tab tab-lifted tab-lg duration-300"
    }
  >
    {name}
  </NavLink>
);

interface NavigatorProps {
  MemberCount: number;
  isDefaultPath: boolean;
}

export const Navigator = ({ MemberCount, isDefaultPath }: NavigatorProps) => {
  const MemberCountStr = `Members (${MemberCount})`;

  return (
    <nav className="flex">
      <div className="tabs">
        <NavLink
          to="Info"
          key={uuidv4()}
          className={({ isActive }) =>
            isActive || isDefaultPath
              ? "tab tab-lifted tab-active tab-lg duration-300"
              : "tab tab-lifted tab-lg duration-300"
          }
        >
          Info
        </NavLink>

        <Tab path="Members" name={MemberCountStr} />
        <Tab path="Leaderboard" name="Leaderboard" />
        <Tab path="Stats" name="Stats" />
      </div>
    </nav>
  );
};
