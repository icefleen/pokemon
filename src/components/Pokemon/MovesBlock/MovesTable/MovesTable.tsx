import React, { FC } from "react";
import s from "./MovesTable.module.scss";
import { MoveDetailedInfo } from "../../../../types/MoveTypes";

type PropsType = {
  selectedVersion: string | null;
  moves: Array<MoveDetailedInfo>;
};

const MovesTable: FC<PropsType> = ({ selectedVersion, moves }) => {
  return (
    <table className={s.table}>
      <thead>
        <tr className={s.table__line}>
          <th>Move</th>
          <th>Level</th>
          <th>Accuracy</th>
          <th>Power</th>
          <th>PP</th>
          <th>Type</th>
          <th>Learn Method</th>
        </tr>
      </thead>
      <tbody>
        {moves.map((move) => (
          <tr className={s.table__line} key={move.move.name}>
            <td>
              <span>{move.move.name}</span>
            </td>

            <td>
              {move.version_group_details.find(
                (m) => m.version_group.name === selectedVersion
              )?.level_learned_at || "-"}
            </td>

            <td>{move.accuracy || "-"}</td>

            <td>{move.power || "-"}</td>

            <td>{move.pp || "-"}</td>

            <td>{move.type}</td>

            <td>
              {move.version_group_details.find(
                (m) => m.version_group.name === selectedVersion
              )?.move_learn_method.name || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovesTable;
