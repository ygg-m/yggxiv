import { useCharacter } from "@/Contexts/CharacterContext";
import { TreatedAchievementData } from "@/Types";
import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  filterByCategoryCheck,
  filterObtained,
  filterUnobtained,
  getCategories,
} from "./helpers";

interface GroupProps {
  Name: string;
  List: TreatedAchievementData[];
}

const Item = ({ data }: { data: TreatedAchievementData }) => {
  const { Obtained, Date } = data;
  const { Name, Icon, Description, Points, FFXIVCollectData } = data.Data;

  FFXIVCollectData.Reward && console.log(FFXIVCollectData.Reward);

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
        className={`grid grid-cols-[3rem_.4fr_1fr_3rem_5.1rem_4.2rem] items-center gap-4 p-2 text-neutral-content ${
          Obtained
            ? "hover:bg-base-300 hover:text-primary"
            : "opacity-30 hover:bg-neutral"
        }`}
      >
        <ShowIcon Icon={Icon} Name={Name} />
        <div>{Name}</div>
        <div>{Description}</div>
        {FFXIVCollectData.Reward ? <ShowIcon Icon={Icon} Name={Name} /> : <div className="w-16 h-16" />}
        {Obtained ? <ShowDate Date={Date} /> : <div />}
        <div className="grid text-right">
          <span>{Points} Points</span>
          <span>{FFXIVCollectData?.Owned}</span>
        </div>
      </div>
    </div>
  );
};

interface LabelProps {
  Filter: string;
  checkedKeys: string[];
  setCheckedKeys: Function;
}

const Label = ({ Filter, checkedKeys, setCheckedKeys }: LabelProps) => {
  const changeCheckFilter = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) setCheckedKeys([...checkedKeys, value]);
    else setCheckedKeys(checkedKeys.filter((key) => key !== value));
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-2 rounded-lg px-3">
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
};

interface FiltersProps {
  List: TreatedAchievementData[];
  Group: string;
  checkedKeys: string[];
  setCheckedKeys: Function;
  showOnlyObtained: boolean;
  setShowOnlyObtained: Function;
  showOnlyUnobtained: boolean;
  setShowOnlyUnobtained: Function;
}

const Filters = ({
  List,
  Group,
  checkedKeys,
  setCheckedKeys,
  showOnlyObtained,
  setShowOnlyObtained,
  showOnlyUnobtained,
  setShowOnlyUnobtained,
}: FiltersProps) => {
  const Categories = getCategories(List.filter((e) => e.Data.Group === Group));

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

      <div className="dropdown-hover dropdown">
        <label
          tabIndex={0}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-base-100 p-2 px-4 duration-100 hover:bg-primary hover:text-neutral"
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 512 512"
          >
            <path d="M0 416c0-17.7 14.3-32 32-32l54.7 0c12.3-28.3 40.5-48 73.3-48s61 19.7 73.3 48L480 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-246.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 448c-17.7 0-32-14.3-32-32zm192 0a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-32-80c32.8 0 61 19.7 73.3 48l54.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-54.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l246.7 0c12.3-28.3 40.5-48 73.3-48zM192 64a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm73.3 0L480 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-214.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 128C14.3 128 0 113.7 0 96S14.3 64 32 64l86.7 0C131 35.7 159.2 16 192 16s61 19.7 73.3 48z" />
          </svg>
          Filter by Category
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box max-h-[70vh] w-52 flex-nowrap overflow-auto bg-base-300 p-2 shadow outline outline-1 outline-gray-600"
        >
          {Categories.map((source) => {
            return (
              <Label
                key={uuid()}
                Filter={source}
                checkedKeys={checkedKeys}
                setCheckedKeys={setCheckedKeys}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const Group = ({ Name, List }: GroupProps) => {
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

  return (
    <article className="rounded-lg outline outline-1 outline-base-100">
      <Header />

      {showList && (
        <>
          <Filters
            List={List}
            Group={Name}
            checkedKeys={checkedKeys}
            setCheckedKeys={setCheckedKeys}
            showOnlyObtained={showOnlyObtained}
            setShowOnlyObtained={setShowOnlyObtained}
            showOnlyUnobtained={showOnlyUnobtained}
            setShowOnlyUnobtained={setShowOnlyUnobtained}
          />
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
