import { format, parse } from "date-fns";
import { EDateFormats } from "../Interfaces/general.interface";

export const formatISODate = (ISODate: string) =>
  format(Date.parse(ISODate), EDateFormats.shortDateWithTime);

export const joinDatesWithTime = (refDate: Date, timeString: string) => {
  const parsedTime = parse(timeString, "HH:mm", new Date());
  const startHours = parsedTime.getHours();
  const startMinutes = parsedTime.getMinutes();

  const transformedDate = new Date(refDate.valueOf());
  transformedDate.setHours(startHours);
  transformedDate.setMinutes(startMinutes);
  return transformedDate;
};
