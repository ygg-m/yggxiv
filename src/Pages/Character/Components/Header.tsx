import { TreatedCharData } from "@/Types";

export const Header = ({ char }: { char: TreatedCharData }) => {
  const ProfilePic = () => {
    const { Avatar, Name } = char.Profile;

    return (
      <div className="relative -mt-16 h-32 w-32 overflow-hidden rounded-xl shadow-2xl outline outline-1 outline-neutral-500">
        <img src={Avatar} alt={Name} className="h-full w-full" />
      </div>
    );
  };

  const ProfileName = () => {
    const { Name, Title } = char.Profile;

    return (
      <div className="grid">
        <h1 className="flex items-center gap-4 text-5xl font-bold">{Name}</h1>
        {Title.Name.length > 0 ? <span>{Title.Name}</span> : null}
      </div>
    );
  };

  const ProfileServer = () => {
    const {
      DataCenter: { Name, Server },
    } = char.Data;
    const DataCenter = Name.replace("]", "");
    return (
      <div className="flex items-center gap-2 md:mt-4">
        <div className="badge badge-md bg-neutral-800 py-3">{DataCenter}</div>
        <div className="text-rose-200 badge-primary badge badge-md py-3">
          {Server}
        </div>
      </div>
    );
  };

  return (
    <header className="mb-8 flex w-full max-w-screen-2xl flex-col items-center gap-4 md:flex-row md:gap-8">
      <ProfilePic />
      <ProfileName />
      <ProfileServer />
    </header>
  );
};
