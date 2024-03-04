import { AlertTypes } from ".";

export interface IAlertModal {
  icon: string;
  className: string;
}

export const GetAlertModalValues = (type: AlertTypes): IAlertModal => {
  if (type === AlertTypes.danger)
    return { icon: "skull-crossbones", className: "is-black" };
  else if (type === AlertTypes.delete)
    return { icon: "trash-can", className: "is-danger" };
  else if (type === AlertTypes.warning)
    return { icon: "circle-exclamation", className: "is-warning" };
  else if (type === AlertTypes.success)
    return { icon: "circle-check", className: "is-success" };

  return { icon: "", className: "" };
};
