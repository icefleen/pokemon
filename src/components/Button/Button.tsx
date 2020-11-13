import React, { FC } from "react";
import classnames from "classnames";
import s from "./Button.module.scss";

type PropsType = {
  text: string;
  variant?: "primary";
  disabled?: boolean;
  onClick?: () => void;
};

const Button: FC<PropsType> = ({
  text,
  variant,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={classnames(s.button, {
        [s.button_primary]: variant === "primary",
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
