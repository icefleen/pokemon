import React, { FC } from "react";
import classnames from "classnames";
import s from "./Spinner.module.scss";

const Spinner: FC = () => {
  return (
    <div className={classnames(s["lds-roller"])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
