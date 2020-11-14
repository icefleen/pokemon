import React, { FC } from "react";
import s from "../Block.module.scss";
import * as PokemonTypes from "../../../types/PokemonTypes";

type PropsType = {
  stats: Array<PokemonTypes.Stat>;
};

const StatsBlock: FC<PropsType> = ({ stats }) => {
  return (
    <div className={s.block}>
      <div className={s.block__title}>Stats</div>
      {stats.map((stat) => (
        <div className={s.block__line}>
          <span className={s.block__key}>{stat.stat.name}:</span>
          <span className={s.block__value}>{stat.base_stat}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBlock;
