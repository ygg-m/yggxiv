import { shuffleArray } from "@/Helpers";
import { CharCardData } from "@/Types";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

export const OwnerList = ({
  List,
  query,
  index,
}: {
  List: CharCardData[];
  query: string;
  index: number;
}) => {
  const [indexes, setIndexes] = useState(0);
  const shuffledList = shuffleArray(List);
  const list = useMemo(
    () => shuffledList.slice(0, indexes),
    [shuffledList, indexes]
  );
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      const newSize = Math.floor(divRef.current.offsetWidth / 40);
      setIndexes(newSize);
    }

    const handleResize = () => {
      if (divRef.current) {
        const newSize = Math.floor(divRef.current.offsetWidth / 40);

        setIndexes(newSize);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [divRef]);

  const OwnerItem = ({ data }: any) => {
    const { Avatar, Name, ID } = data;
    const queryOwner =
      Name.toLowerCase().includes(query.toLowerCase()) && query.length > 0;

    return (
      <a
        className={`tooltip z-10 rounded-lg p-1 duration-300 hover:bg-neutral ${
          queryOwner ? "bg-primary text-neutral hover:text-neutral-content" : ""
        }`}
        data-tip={Name}
      >
        <img src={Avatar} alt={Name} className="mask mask-squircle w-8" />
      </a>
    );
  };

  const OwnerCard = ({ data }: any) => {
    const { Avatar, Name, ID } = data;
    const queryOwner =
      Name.toLowerCase().includes(query.toLowerCase()) && query.length > 0;

    const SplitName = Name.split(" ");

    return (
      <a
        className={`grid place-items-center rounded-lg p-2 text-center duration-300 hover:bg-neutral ${
          queryOwner ? "bg-primary text-neutral hover:text-neutral-content" : ""
        }`}
      >
        <img src={Avatar} alt={Name} className="mask mask-squircle w-12" />
        <span>{SplitName[0]}</span>
        <span>{SplitName[1]}</span>
      </a>
    );
  };

  const Modal = () => {
    const SeeAllButton = () => (
      <label
        htmlFor={`MountModal-${index}`}
        className="duration mx-4 w-16 cursor-pointer rounded-lg bg-base-100 p-2 text-center text-sm hover:bg-base-300"
      >
        +{List.length - indexes}
      </label>
    );

    const OwnerList = () => (
      <div className="grid grid-cols-4 items-center gap-2">
        {List.map((Owner) => (
          <OwnerCard key={uuid()} data={Owner} />
        ))}
      </div>
    );

    const CloseButton = () => (
      <label
        htmlFor={`MountModal-${index}`}
        className="btn-secondary btn-circle btn-lg btn fixed right-2 top-2"
      >
        ✕
      </label>
    );

    return (
      <>
        <SeeAllButton />
        <input
          type="checkbox"
          id={`MountModal-${index}`}
          className="modal-toggle"
        />

        <div className="modal">
          <div className="modal-box">
            <OwnerList />
          </div>
          <CloseButton />
        </div>
      </>
    );
  };

  return (
    <div className="col-span-1 flex items-center justify-between" ref={divRef}>
      <div className="flex items-center">
        {list.map((Owner) => (
          <OwnerItem key={uuid()} data={Owner} />
        ))}
      </div>
      {List.length > indexes ? <Modal /> : null}
    </div>
  );
};
