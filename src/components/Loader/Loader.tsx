import React, { FC } from "react";
import s from "./Loader.module.scss";
import Spinner from "./Spinner/Spinner";

type PropsType = {
  show: boolean;
};

export const Loader: FC<PropsType> = ({ show }) => {
  return (
    <>
      {show && (
        <div className={s.loader}>
          <Spinner />
        </div>
      )}
    </>
  );
};
