import moment from "moment";

export const getActualMonth = (): string => {
  const momentDate = moment(new Date());
  return momentDate.format("YYYY-MM");
};

export const createDateForApi = (date: Date): string => {
  const momentDate = moment(date);
  return momentDate.format();
};

export const createDate = (date: Date): string => {
  const momentDate = moment(date);
  return momentDate.format("DD/MM/YYYY");
};

export const createDateWithHour = (date: Date): string => {
  const momentDate = moment(date);
  return momentDate.format("DD/MM/YYYY HH:mm:ss");
};

export const getHour = (date: Date): string => {
  const momentDate = moment(date);
  return momentDate.format("HH:mm:ss");
};
