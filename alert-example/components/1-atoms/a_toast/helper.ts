import { ToastIcon } from ".";
import colors from "../../../styles/variables.module.scss";

export const getIcon = (
  icon: ToastIcon
): {
  icon: string;
  color: string;
} => {
  if (icon === ToastIcon.info)
    return {
      icon: "circle-info",
      color: "has-text-info",
    };
  else if (icon === ToastIcon.warning)
    return {
      icon: "circle-exclamation",
      color: "has-text-warning",
    };
  else if (icon === ToastIcon.error)
    return {
      icon: "circle-xmark",
      color: "has-text-danger",
    };
  else if (icon === ToastIcon.success)
    return {
      icon: "circle-check",
      color: "has-text-success",
    };

  return {
    icon: "",
    color: "",
  };
};

export const getColor = (icon: ToastIcon): string => {
  if (icon === ToastIcon.info) return colors.info;
  else if (icon === ToastIcon.error) return colors.danger;
  else if (icon === ToastIcon.success) return colors.success;
  else if (icon === ToastIcon.warning) return colors.warning;
  return "";
};
