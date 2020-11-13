import React, { FC } from "react";
import s from "./Card.module.scss";

type PropTypes = {
  image: string;
  title: string;
};

const Card: FC<PropTypes> = ({ image, title }) => {
  return (
    <div className={s.card}>
      <div className={s.card__imageWrapper}>
        <div className={s.card__imageFixer}>
          <img className={s.card__image} src={image} alt="pokemon" />
        </div>
      </div>
      <div className={s.card__title}>{title}</div>
    </div>
  );
};

export default Card;
