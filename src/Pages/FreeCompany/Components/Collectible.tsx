import { SimpleLoading } from "@/Components/LoadingComponents/SimpleLoading";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { CollectibleTypes } from "@/Types";
import { v4 as uuidv4 } from "uuid";
import { ShowData } from "../Pages/Stats/ShowData";

interface CollectibleProps {
  data: CollectibleTypes;
  showOwners?: boolean;
  showCount?: boolean;
}

export const Collectible = ({
  data,
  showOwners,
  showCount,
}: CollectibleProps) => {
  const {
    freeCompany: {
      FreeCompany: { ActiveMemberCount },
    },
  } = useFreeCompany();

  const { Count, Owners } = data;
  const { Name, Icon } = data.Data;

  const percentage = Math.floor((Count / ActiveMemberCount) * 100);
  const dataValue = `${Count} (${percentage}%)`;

  if (!data.Data) return <SimpleLoading />;

  const MultipleOwners = () => {
    return (
      <div className="grid rounded-lg bg-neutral px-4 py-2">
        <span>Owners</span>
        <div className="grid grid-cols-3 place-items-center sm:grid-cols-8 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {Owners.map((owner) => {
            const { Name, Avatar } = owner;
            return (
              <div
                className="tooltip cursor-pointer rounded-lg p-2 duration-200 hover:bg-base-300"
                data-tip={Name}
                key={uuidv4()}
              >
                <img
                  src={Avatar}
                  alt={Name}
                  className="mask mask-squircle w-10"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const SingleOwner = () => {
    const { Name, Avatar } = Owners[0];

    return (
      <div className="flex flex-col items-center">
        <div className="divider m-0 mb-2"></div>
        <span className="opacity-70">Owner</span>
        <div className="grid cursor-pointer place-items-center gap-2 rounded-lg bg-transparent p-2 duration-200 hover:bg-neutral">
          <img src={Avatar} alt={Name} className="mask mask-squircle w-16" />
          <span className="text-center">{Name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-4 rounded-lg bg-base-200 p-4 pt-6 duration-300 hover:bg-base-300">
      <div className="grid place-items-center justify-center gap-2">
        <img
          src={`https://xivapi.com/${Icon}`}
          alt={Name}
          className="mask mask-squircle w-24"
        />
        <h4 className="text-center text-lg capitalize">{Name}</h4>
      </div>

      {showCount && (
        <div className="grid place-items-center">
          <span className="text-5xl font-bold text-primary">{Count}</span>
          <span className="opacity-70">owners ({percentage}%)</span>
        </div>
      )}

      {showOwners ? (
        Owners.length > 1 ? (
          <MultipleOwners />
        ) : (
          <SingleOwner />
        )
      ) : null}
    </div>
  );
};
