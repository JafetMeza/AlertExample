// eslint-disable-next-line prefer-regex-literals
export const password = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#,_$%)&*¡¿(^?-])(?=.{8,})"
);

const alphanumericPathern = /[^a-zA-Z\d\u00C0-\u00FF]/;
export const alphanumeric = new RegExp(alphanumericPathern);

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const email = new RegExp(emailPattern);

// eslint-disable-next-line prefer-regex-literals
export const phone = new RegExp(
  "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
);

const noNumbersPattern =
  /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
export const noNumbers = new RegExp(noNumbersPattern);

// eslint-disable-next-line prefer-regex-literals
export const noSpaces = new RegExp("^[A-Za-z0-9][A-Za-z0-9]*$");

// eslint-disable-next-line prefer-regex-literals
export const numbersOnly = new RegExp("^[0-9]*$");

// eslint-disable-next-line prefer-regex-literals
export const decimalNumbers = new RegExp("[0-9]+(.[0-9][0-9]?)?");

export const ProjectName = /^([zZ])([0-9]{2})([aA-zZ,ñÑ,&]{1})([0-9])+$/;

export const AssemblyName = /^([sS])([0-9])/;

export const PieceName = /^([sS])([0-9])/;

const rfcPattern =
  /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/;
export const rfc = new RegExp(rfcPattern);

const zipCodePattern = /^[0-9]{5}$/;
export const zipCode = new RegExp(zipCodePattern);
