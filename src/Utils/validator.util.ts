// import { IClientGet } from '../Interfaces/Core/client.interface';
import { MANTINE_COLORS } from "@mantine/core";
import { IActor } from "../Interfaces/general.interface";
import {
  differenceInDays,
  format,
  getDay,
  getYear,
  isThisYear,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";

export const isValidEmail = (email_address: string) =>
  /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email_address);

export const sanitizePhoneNumber = (phoneNumber: string) =>
  phoneNumber.trim().replace("0", "254");

export const unSanitizePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace("254", "0");

export const isValidPhoneNumber = (rawPhoneNumber: string) => {
  const phoneNumber = rawPhoneNumber.trim();
  if (phoneNumber.length !== 10) {
    return false;
  }
  if (!phoneNumber.startsWith("07") && !phoneNumber.startsWith("01")) {
    return false;
  }
  return true;
};

export const capitalize = (val: string) => {
  const lower = val.trim().toLowerCase();
  return lower.replace(lower.charAt(0), lower.charAt(0).toUpperCase());
};

export const getNames = (user: IActor | null | undefined) => {
  if (user == null) return "-";
  return `${user.first_name} ${user.last_name}`;
};

export const getRandomColor = () => {
  let col =
    MANTINE_COLORS[Math.floor(Math.random() * (MANTINE_COLORS.length - 1))];
  if (col === "gray") {
    col = getRandomColor();
  }
  return col;
};

export const formatChatDate = (
  dateString: string,
  withTodayString = false,
  weekNameInFull = false
) => {
  const date = parseISO(dateString);
  if (isToday(date)) {
    return withTodayString ? "Today" : format(date, "hh:mm aa");
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  if (differenceInDays(new Date(), date) < 7) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const fullDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekNameInFull
      ? fullDaysOfWeek[getDay(date)]
      : daysOfWeek[getDay(date)];
  }
  if (isThisYear(date)) {
    return format(date, "dd/MM");
  }
  return getYear(date);
};
