import { monthsShort } from "../extras/month";

export const dateFormat = (
  date: Date | string | undefined,
  format?: "dateOfBirth",
) => {
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

  if (format == "dateOfBirth") {
    const date_of_birth =
      monthsShort[applyMonth] + " " + applyDate + ", " + applyYear;

    return date_of_birth;
  }

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
