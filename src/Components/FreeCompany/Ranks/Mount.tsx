import { useFreeCompanyContext } from "../../../Contexts/FreeCompanyContext";

export const Mount = () => {
  const { MembersFullData } = useFreeCompanyContext();

  return <div>Mount</div>;
};
