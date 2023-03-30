export function capitalizeText(str: string) {
    const split = str.split(" ");
    const capitalize = split.map((s) => s.charAt(0).toUpperCase() + s.slice(1));
    const result = capitalize.join(" ");
  
    return result;
  }