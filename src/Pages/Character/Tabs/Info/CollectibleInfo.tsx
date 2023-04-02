import { Collectible } from "@/Types";

interface Props {
  data: {
    Mounts: Collectible[];
    Minions: Collectible[];
  };
}

export const CollectibleInfo = ({ data }: Props) => {
  return <section className=""></section>;
};
