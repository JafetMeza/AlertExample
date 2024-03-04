import {
  noNumbers,
  noSpaces,
  numbersOnly,
  decimalNumbers,
  ProjectName,
  rfc,
  email,
  password,
  zipCode,
} from "./regex";

export const isOnlyLetters = (data: string): boolean => noNumbers.test(data);

export const isWithoutSpaces = (data: string): boolean => noSpaces.test(data);

export const isOnlyNumbers = (data: string): boolean => {
  if (data.includes("$"))
    data = Number(String(data).replace(/[^0-9.-]+/g, "")).toString();
  if (data.length > 0 && numbersOnly.test(data)) {
    return parseFloat(data) >= 0;
  }
  return false;
};

export const isOnlyNumbersDecimal = (
  data: string,
  negativeNumbers = false
): boolean => {
  if (data.includes("$"))
    data = Number(String(data).replace(/[^0-9.-]+/g, "")).toString();
  if (data.length > 0 && decimalNumbers.test(data)) {
    if (!negativeNumbers) return parseFloat(data) >= 0;
    else return true;
  }
  return false;
};

export const isEmpty = (data: string): boolean => {
  if (data !== "") return true;
  else return false;
};

export const isProjectName = (data: string): boolean => {
  if (data.length > 0) {
    if (noSpaces.test(data) && ProjectName.test(data)) return true;
    else return false;
  } else return false;
};

export const isRFC = (data: string): boolean => {
  if (isEmpty(data)) return rfc.test(data);
  else return false;
};

export const isEmail = (data: string): boolean => {
  if (isEmpty(data)) return email.test(data);
  else return false;
};

export const isPassword = (data: string): boolean => {
  if (isEmpty(data)) return password.test(data);
  else return false;
};

export const limitCharacters = (data: string, limit: number): boolean =>
  !(data.length > limit);

export const isZipCode = (data: string): boolean => {
  if (isEmpty(data)) return zipCode.test(data);
  else return false;
};
