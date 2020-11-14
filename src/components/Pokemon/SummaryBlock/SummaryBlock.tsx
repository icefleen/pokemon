import React, { FC } from "react";
import classnames from "classnames";
import s from "../Block.module.scss";
import * as PokemonTypes from "../../../types/PokemonTypes";

type PropsType = {
  abilities: Array<PokemonTypes.Ability>;
  forms: Array<PokemonTypes.Ref>;
  height: number;
  weight: number;
  base_experience: number;
  types: Array<PokemonTypes.Type>;
};

const SummaryBlock: FC<PropsType> = ({
  abilities,
  forms,
  height,
  weight,
  base_experience,
  types,
}) => {
  return (
    <div className={s.block}>
      <div className={s.block__title}>Summary</div>
      <div className={s.block__line}>
        <span className={s.block__key}>Abilities:</span>
        {abilities.map((ab) => (
          <span className={classnames(s.tag, s.block__value)}>
            {ab.ability.name}
          </span>
        ))}
      </div>

      <div className={s.block__line}>
        <span className={s.block__key}>Forms:</span>
        {forms.map((form) => (
          <span className={classnames(s.tag, s.block__value)}>{form.name}</span>
        ))}
      </div>

      <div className={s.block__line}>
        <span className={s.block__key}>Height:</span>
        <span className={s.block__value}>{height / 10}m</span>
      </div>

      <div className={s.block__line}>
        <span className={s.block__key}>Weight:</span>
        <span className={s.block__value}>{weight / 10}kg</span>
      </div>

      <div className={s.block__line}>
        <span className={s.block__key}>Base Experience:</span>
        <span className={s.block__value}>{base_experience} exp</span>
      </div>

      <div className={s.block__line}>
        <span className={s.block__key}>Type:</span>
        {types.map((type) => (
          <span className={classnames(s.tag, s.block__value)}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SummaryBlock;
