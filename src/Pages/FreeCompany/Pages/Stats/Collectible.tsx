import { SimpleLoading } from "@/Components/LoadingComponents/SimpleLoading";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { CollectibleTypes } from "@/Types";
import { v4 as uuidv4 } from "uuid";
import { ShowData } from "./ShowData";

interface CollectibleProps {
  data: CollectibleTypes;
  showOwners?: boolean;
}

export const Collectible = ({ data, showOwners }: CollectibleProps) => {
  const {
    freeCompany: {
      FreeCompany: { ActiveMemberCount },
    },
  } = useFreeCompany();

  const { count, owners } = data;
  const { Name, Icon } = data.collectibleData;

  const percentage = Math.floor((count / ActiveMemberCount) * 100);
  const dataValue = `${count} (${percentage}%)`;

  if (!data.collectibleData) return <SimpleLoading />;

  return (
    <div className="grid gap-2 rounded-lg bg-base-200 p-4 duration-200 hover:bg-base-300">
      <div className="grid place-items-center justify-center gap-2 p-4">
        <img
          src={`https://xivapi.com/${Icon}`}
          alt={Name}
          className="mask mask-squircle w-24"
        />
        <h4 className="text-center text-lg capitalize">{Name}</h4>
      </div>

      <div className="grid items-center rounded-lg bg-neutral px-4 py-2">
        <ShowData name="Owned" strValue={dataValue} />
      </div>

      {showOwners && (
        <div className="grid rounded-lg bg-neutral px-4 py-2">
          <span>Owners</span>
          <div className="flex flex-wrap">
            {owners.map((owner) => {
              const { Name, Avatar } = owner.Character;
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
      )}
    </div>
  );
};
