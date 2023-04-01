import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Footer } from "../../Components";
import { useFreeCompany } from "../../Contexts/FreeCompanyContext";
import { Header, Navigator } from "./Components";

export const FreeCompany = () => {
  const { freeCompany, fetchFreeCompany, baseFetchLoad } = useFreeCompany();
  const { FreeCompany } = freeCompany;
  const { ActiveMemberCount } = FreeCompany;

  const { fcId } = useParams();

  const location = useLocation();
  const currentPath = location.pathname
    .split("/")
    .filter((e) => e !== "")
    .reverse()[0];
  const currentPage = location.pathname
    .split("/")
    .filter((e) => e !== "")
    .reverse()[1];
  const paths = ["Info", "Members", "Leaderboard", "Stats"];
  const isInDefault =
    !paths.includes(currentPath) && currentPage === "FreeCompany";

  const isFCDataEmpty = freeCompany.FreeCompany.ID === "0";
  const isFCDataDifferent = freeCompany.FreeCompany.ID !== fcId;

  const CoverImage = () => {
    return (
      <img
        src="https://img.finalfantasyxiv.com/lds/h/U/0P1ncRVYw3wO_6OEYE375vk-0I.jpg?_ga=2.111044928.472477140.1677699247-1091794286.1670936645"
        className="h-60 w-screen border-b border-neutral-500 object-cover"
        alt="Cover Image"
      />
    );
  };

  if (isFCDataDifferent || isFCDataEmpty) {
    fetchFreeCompany(fcId);
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <button className="loading btn">Getting free company info</button>
      </div>
    );
  }

  if (baseFetchLoad)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <button className="loading btn-square btn"></button>
      </div>
    );

  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-neutral-900">
      <CoverImage />
      <div className="flex w-screen max-w-screen-2xl flex-col px-2 pr-4 sm:px-8">
        <Header FreeCompany={FreeCompany} />
        <Navigator MemberCount={ActiveMemberCount} />
        <Outlet />
        {isInDefault && <Navigate to="Info" />}
      </div>
      <Footer />
    </div>
  );
};
