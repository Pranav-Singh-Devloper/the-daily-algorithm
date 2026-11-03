const d = new Date();
const line = d
  .toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  .toUpperCase();

export const TODAY_LINE = line;
