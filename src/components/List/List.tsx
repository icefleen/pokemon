import React, { FC, useEffect } from "react";
import s from "./List.module.scss";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store/store";
import { loadItems } from "../../store/listPage/listReducer";
import { connect } from "react-redux";
import * as PokemonTypes from "../../types/PokemonTypes";
import {
  getListPageIsLoading,
  getPokemonsRefs,
} from "../../store/listPage/listSelectors";
import { Loader } from "../Loader/Loader";

type PropsType = {
  isLoading: boolean;
  pokemons: Array<PokemonTypes.Ref>;
  loadItems: () => void;
};

const List: FC<PropsType> = ({ isLoading, pokemons, loadItems }) => {
  const history = useHistory();

  useEffect(() => {
    if (!pokemons.length) loadItems();
  }, [pokemons, loadItems]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;

    if (element.dataset.url)
      history.push(
        "/pokemon/" + element.dataset.url.split("/").slice(-2, -1).join("")
      );
  };

  return (
    <>
      <Loader show={isLoading} />
      <div className={s.list} onClick={handleClick}>
        {pokemons.map((pokemon) => (
          <div
            className={s.list__item}
            key={pokemon.name}
            data-url={pokemon.url}
          >
            {pokemon.name}
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: getListPageIsLoading(state),
  pokemons: getPokemonsRefs(state),
});

export default connect(mapStateToProps, { loadItems })(List);
