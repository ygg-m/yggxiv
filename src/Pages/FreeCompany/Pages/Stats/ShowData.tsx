interface ShowDataProps {
  name: string;
  value?: number;
  strValue?: string;
  icon?: any;
}

export const ShowData = ({ name, value, strValue, icon }: ShowDataProps) => {
  return (
    <div className="flex justify-between duration-200 hover:text-accent">
      <div className="flex items-center gap-2">
        {icon && icon}
        <span>{name}</span>
      </div>
      {strValue ? (
        <span>{strValue}</span>
      ) : (
        <span>{value === 0 ? "-" : value}</span>
      )}
    </div>
  );
};
