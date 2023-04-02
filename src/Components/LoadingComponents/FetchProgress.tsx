import { getRandomString } from "@/Helpers";
import { useEffect, useState } from "react";

export const FetchProgress = ({ arr }: { arr: string[] }) => {
  const [phrase, setPhrase] = useState<string>(getRandomString(arr));
  useEffect(() => {
    setInterval(() => setPhrase(getRandomString(arr)), 10000);
  }, []);

  const Spinner = () => (
    <div className="flex items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );

  return (
    <section className="grid min-h-[calc(100vh-448px)] gap-4 pb-8">
      <nav className="navbar grid h-fit place-items-center gap-3 rounded-lg bg-base-100 p-4">
        <Spinner />
        {phrase}
      </nav>
    </section>
  );
};
