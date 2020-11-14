import React, { FC, useEffect } from "react";
import s from "./Pokemon.module.scss";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  loadPokemon,
  loadVersions,
  setSelectedVersion,
} from "../../store/pokemonPage/pokemonReducer";
import {
  getPokemonPageIsLoading,
  getMovesByVersion,
  getPokemon,
  getSelectedVersion,
  getVersions,
} from "../../store/pokemonPage/pokemonSelectors";
import { RootState } from "../../store/store";
import { MoveDetailedInfo } from "../../types/MoveTypes";
import * as PokemonTypes from "../../types/PokemonTypes";
import Card from "../Card/Card";
import SummaryBlock from "./SummaryBlock/SummaryBlock";
import StatsBlock from "./StatsBlock/StatsBlock";
import MovesBlock from "./MovesBlock/MovesBlock";
import { Loader } from "../Loader/Loader";

type PokemonParams = {
  id: string;
};

type PropsType = {
  isLoading: boolean;
  pokemon: PokemonTypes.Pokemon | null;
  versions: Array<PokemonTypes.Ref>;
  selectedVersion: string | null;
  moves: Array<MoveDetailedInfo>;
  match: OwnProps;
  loadPokemon: (id: number) => void;
  loadVersions: () => void;
  setSelectedVersion: (version: string) => void;
};

const Pokemon: FC<PropsType> = ({
  isLoading,
  pokemon,
  versions,
  selectedVersion,
  moves,
  match,
  loadPokemon,
  loadVersions,
  setSelectedVersion,
}) => {
  useEffect(() => {
    loadPokemon(+match.match.params.id);
  }, [loadPokemon, match]);

  useEffect(() => {
    if (!versions.length) loadVersions();
    else setSelectedVersion("crystal");
  }, [versions, loadVersions, setSelectedVersion]);

  return (
    <>
      <Loader show={isLoading} />
      {pokemon && (
        <div className={s.pokemonPage}>
          <div className={s.pokemon}>
            <Card
              image={pokemon.sprites.other["official-artwork"].front_default}
              title={pokemon.name}
            />

            <SummaryBlock
              abilities={pokemon.abilities}
              forms={pokemon.forms}
              height={pokemon.height}
              weight={pokemon.weight}
              base_experience={pokemon.base_experience}
              types={pokemon.types}
            />

            <StatsBlock stats={pokemon.stats} />
          </div>

          <MovesBlock
            versions={versions}
            selectedVersion={selectedVersion}
            moves={moves}
            setSelectedVersion={setSelectedVersion}
          />
        </div>
      )}
    </>
  );
};

type OwnProps = RouteComponentProps<PokemonParams>;

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  isLoading: getPokemonPageIsLoading(state),
  pokemon: getPokemon(state),
  versions: getVersions(state),
  selectedVersion: getSelectedVersion(state),
  moves: getMovesByVersion(state),
  match: ownProps,
});

export default withRouter(
  connect(mapStateToProps, { loadPokemon, loadVersions, setSelectedVersion })(
    Pokemon
  )
);
