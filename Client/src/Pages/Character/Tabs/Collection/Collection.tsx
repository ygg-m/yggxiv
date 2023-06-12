import { Outlet, useLocation } from "react-router-dom";
import { FullList } from "./FullList";
import { Tabs } from "./Tabs";

export const Collection = () => {
  const isDefaultPath = /Collection/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  return (
    <section className="grid gap-2 mb-8">
      <Tabs isDefaultPath={isDefaultPath} />
      <Outlet />
      {isDefaultPath ? <FullList /> : null}
    </section>
  );
};
