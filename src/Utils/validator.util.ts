// import { IClientGet } from '../Interfaces/Core/client.interface';
import { IActor } from "../Interfaces/general.interface";

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
