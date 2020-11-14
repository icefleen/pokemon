import React, { FC } from "react";
import s from "../Block.module.scss";
import * as PokemonTypes from "../../../types/PokemonTypes";
import { MoveDetailedInfo } from "../../../types/MoveTypes";
import MovesTable from "./MovesTable/MovesTable";

type PropsType = {
  versions: Array<PokemonTypes.Ref>;
  selectedVersion: string | null;
  moves: Array<MoveDetailedInfo>;
  setSelectedVersion: (version: string) => void;
};

const MovesBlock: FC<PropsType> = ({
  versions,
  selectedVersion,
  moves,
  setSelectedVersion,
}) => {
  return (
    <div className={s.block}>
      <div className={s.block__title}>
        Game Version
        <select
          className={s.block__select}
          name=""
          id=""
          value={selectedVersion as string}
          onChange={(e) => setSelectedVersion(e.target.value)}
        >
          {versions.map((version) => (
            <option key={version.name} value={version.name}>
              {version.name}
            </option>
          ))}
        </select>
      </div>

      <MovesTable selectedVersion={selectedVersion} moves={moves} />
    </div>
  );
};

export default MovesBlock;
