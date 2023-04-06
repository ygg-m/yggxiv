import { useLocation } from "react-router-dom";
import { Tabs } from "./Tabs";

export const Collection = () => {
  const isDefaultPath = /Collection/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  return (
    <section>
      <Tabs isDefaultPath={isDefaultPath} />
    </section>
  );
};
