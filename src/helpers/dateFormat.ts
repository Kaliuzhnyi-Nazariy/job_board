import { monthsShort } from "../extras/month";

export const dateFormat = (date: Date | string | undefined) => {
  // console.log(date);

  if (!date) {
    return "No date";
  }
  // console.log(date.getMonth());

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  const applyDate = parsedDate.getDate();
  const applyMonth = parsedDate.getMonth();
  const applyYear = parsedDate.getFullYear();

  const applyHour = parsedDate.getHours() - 1;
  const applyMinutes = parsedDate.getMinutes();

  const applyingDate =
    monthsShort[applyMonth] +
    " " +
    applyDate +
    ", " +
    applyYear +
    " " +
    applyHour +
    ":" +
    applyMinutes;

  console.log(applyingDate);

  return applyingDate;
  // const timeValue = date.split("T")[1];
  // console.log(timeValue);
};
