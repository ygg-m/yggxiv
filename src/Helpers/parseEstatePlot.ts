export const parseEstatePlot = (plot: string) => {
  const regexp = /\((Large|Medium|Small)\)/;
  const arr = plot.replaceAll(" ", "").split(",");

  for (let [i, str] of arr.entries()) {
    const match = str.match(regexp);

    if (match) {
      const [prefix, suffix] = str.split(match[0]);
      arr.splice(i, 1, prefix.trim(), match[1], suffix.trim());
    }
  }

  const cleanArr = arr.filter((e) => e !== "");

  return {
    Size: cleanArr[3],
    City: cleanArr[2],
    Plot: cleanArr[0].replace("Plot", ""),
    Ward: cleanArr[1].replace("Ward", ""),
  };
};
