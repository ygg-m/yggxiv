import { memo } from "react";

type props = {
  value: number;
};

export const FetchProgress = ({ value }: props) => {
  return (
    <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
      <nav className="navbar grid bg-base-100 rounded-lg h-fit">
        <button className="btn loading">Getting members info ({value}%)</button>
      </nav>
    </section>
  );
};

export const MemoizedFetchProgress = memo(FetchProgress);
