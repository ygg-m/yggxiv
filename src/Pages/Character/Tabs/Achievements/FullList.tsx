import { useCharacter } from "@/Contexts/CharacterContext";
import { TreatedAchievementData } from "@/Types";
import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  filterByCategoryCheck,
  filterObtained,
  filterUnobtained,
  getCategories,
  getGroups,
} from "./helpers";

interface GroupProps {
  Name: string;
  List: TreatedAchievementData[];
}

const Item = ({ data }: { data: TreatedAchievementData }) => {
  const { Obtained, Date } = data;
  const { Name, Icon, Description, Points, FFXIVCollectData } = data.Data;

  const ShowIcon = ({ Icon, Name }: { Icon: string; Name: string }) => (
    <div>
      <img
        src={Icon}
        alt={Name}
        className={`mask mask-squircle ${Obtained ? "grayscale-50" : ""}`}
      />
    </div>
  );

  const ShowDate = ({ Date }: { Date: Date | undefined }) => {
    if (!Date) return null;

    const day = Date.getDate().toString().padStart(2, "0"); // get the day of the month and convert to a string, adding a leading zero if necessary
    const month = (Date.getMonth() + 1).toString().padStart(2, "0"); // get the month (0-11) and convert to a string, adding a leading zero if necessary
    const year = Date.getFullYear().toString(); // get the full year as a string

    return <div>{`${day}/${month}/${year}`}</div>;
  };

  return (
    <div className="border-b border-base-100 duration-100">
      <div
        className={`grid grid-cols-[3rem_.4fr_1fr_5.1rem_4.2rem] items-center gap-4 p-2 text-neutral-content ${
          Obtained
            ? "hover:bg-base-300 hover:text-primary"
            : "opacity-30 hover:bg-neutral"
        }`}
      >
        <ShowIcon Icon={Icon} Name={Name} />
        <div>{Name}</div>
        <div>{Description}</div>
        {Obtained ? <ShowDate Date={Date} /> : <div />}
        <div className="grid text-right">
          <span>{Points} Points</span>
          <span>{FFXIVCollectData?.Owned}</span>
        </div>
      </div>
    </div>
  );
};

const Group = ({ Name, List }: GroupProps) => {
  const obtainedList = List.filter((e) => e.Obtained === true);
  const percentage = Math.floor((obtainedList.length / List.length) * 100);

  const [showList, setShowList] = useState<boolean>(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [showOnlyObtained, setShowOnlyObtained] = useState<boolean>(true);
  const [showOnlyUnobtained, setShowOnlyUnobtained] = useState<boolean>(false);

  const list = useMemo(
    () =>
      showOnlyObtained
        ? filterObtained(filterByCategoryCheck(List, checkedKeys))
        : showOnlyUnobtained
        ? filterUnobtained(filterByCategoryCheck(List, checkedKeys))
        : filterByCategoryCheck(List, checkedKeys),
    [List, checkedKeys, showOnlyObtained, showOnlyUnobtained]
  );

  const changeCheckFilter = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) setCheckedKeys([...checkedKeys, value]);
    else setCheckedKeys(checkedKeys.filter((key) => key !== value));
  };

  const Header = () => (
    <div
      className="flex w-full cursor-pointer justify-between rounded-lg bg-neutral p-4 duration-100 hover:bg-base-100"
      onClick={() => setShowList(!showList)}
    >
      <span>{Name}</span>
      <span>
        {obtainedList.length}
        <span className="text-gray-500">
          {" "}
          / {List.length} ({percentage}%)
        </span>
      </span>
    </div>
  );

  const Label = ({ Filter }: { Filter: string }) => (
    <div className="form-control">
      <label className="label cursor-pointer gap-2 rounded-lg bg-base-300 px-3">
        <span className="label-text">{Filter}</span>
        <input
          type="checkbox"
          className="checkbox"
          value={Filter}
          checked={checkedKeys.includes(Filter)}
          onChange={changeCheckFilter}
        />
      </label>
    </div>
  );

  const Filters = () => {
    const Categories = getCategories(List);

    return (
      <div className="flex flex-wrap gap-2 p-2">
        <div className="form-control">
          <label className="label cursor-pointer gap-2 rounded-lg bg-base-300 px-3">
            <span className="label-text text-primary">Obtained Only</span>
            <input
              type="checkbox"
              className="checkbox-primary checkbox"
              value={"Obtained"}
              checked={showOnlyObtained ? true : false}
              onChange={() => {
                setShowOnlyUnobtained(false);
                setShowOnlyObtained(!showOnlyObtained);
              }}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer gap-2 rounded-lg bg-base-300 px-3">
            <span className="label-text text-primary">Unobtained Only</span>
            <input
              type="checkbox"
              className="checkbox-primary checkbox"
              value={"Obtained"}
              checked={showOnlyUnobtained ? true : false}
              onChange={() => {
                setShowOnlyObtained(false);
                setShowOnlyUnobtained(!showOnlyUnobtained);
              }}
            />
          </label>
        </div>
        {Categories.map((e) => (
          <Label key={uuid()} Filter={e} />
        ))}
      </div>
    );
  };

  return (
    <article className="rounded-lg outline outline-1 outline-base-100">
      <Header />

      {showList && (
        <>
          <Filters />
          <div className="grid grid-cols-[3rem_.4fr_1fr_5.1rem_4.2rem] items-center gap-4 p-2 text-sm text-gray-600">
            <div></div>
            <div>Name</div>
            <div>Description</div>
            <div>Date</div>
            <div className="grid text-right">
              <span>Points</span>
              <span>Owners</span>
            </div>
          </div>

          {list.map((e) => (
            <Item key={uuid()} data={e} />
          ))}
        </>
      )}
    </article>
  );
};

export const FullList = () => {
  const { List, Points, Public } = useCharacter().char.Achievements;

  const groupList = getGroups(List);

  return (
    <section className="grid gap-4">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl"></h1>
      </div>

      {groupList.map((e) => (
        <Group
          key={uuid()}
          Name={e}
          List={List.filter((a) => a.Data.Group === e)}
        />
      ))}
    </section>
  );
};
