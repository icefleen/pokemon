import React, { FC, useEffect } from "react";
import classnames from "classnames";
import s from "./Pokemons.module.scss";
import { connect } from "react-redux";
import { loadPokemons } from "../../store/homePage/homeReducer";
import { RootState } from "../../store/store";
import * as PokemonTypes from "../../types/PokemonTypes";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { NavLink } from "react-router-dom";
import {
  getCount,
  getHomePageIsLoading,
  getOffset,
  getPokemons,
} from "../../store/homePage/homeSelectors";
import { Loader } from "../Loader/Loader";

type PropsType = {
  isLoading: boolean;
  pokemons: Array<PokemonTypes.Pokemon>;
  count: number;
  limit: number;
  offset: number;
  loadPokemons: (limit: number, offset: number) => void;
};

const Pokemons: FC<PropsType> = ({
  isLoading,
  pokemons,
  count,
  limit,
  offset,
  loadPokemons,
}) => {
  useEffect(() => {
    if (!pokemons.length) loadPokemons(limit, 0);
  }, [loadPokemons, limit, pokemons]);

  const loadFirstPage = () => {
    loadPokemons(limit, 0);
  };

  const loadPrevPage = () => {
    loadPokemons(limit, offset - 8);
  };

  const loadNextPage = () => {
    loadPokemons(limit, offset + 8);
  };

  const loadLastPage = () => {
    loadPokemons(limit, Math.floor(count / limit) * limit);
  };

  return (
    <>
      <Loader show={isLoading} />
      <div className={s.gallery}>
        <div className={classnames(s.gallery__cards, s.cards)}>
          {pokemons.map((pokemon) => (
            <NavLink to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <Card
                image={pokemon.sprites.other["official-artwork"].front_default}
                title={pokemon.name}
              />
            </NavLink>
          ))}
        </div>
        <div className={s.gallery__buttons}>
          <Button
            className={s["d-sm-none"]}
            variant="primary"
            disabled={offset < limit}
            onClick={loadFirstPage}
          >
            &lt;&lt;<span className={s["d-sm-none"]}> First</span>
          </Button>
          <Button
            variant="primary"
            disabled={offset < limit}
            onClick={loadPrevPage}
          >
            &lt;<span className={s["d-sm-none"]}> Prev</span>
          </Button>
          <Button variant="primary">{`${offset / limit + 1} / ${Math.ceil(
            count / limit
          )}`}</Button>
          <Button
            variant="primary"
            disabled={offset + 8 >= count}
            onClick={loadNextPage}
          >
            <span className={s["d-sm-none"]}>Next </span>&gt;
          </Button>
          <Button
            className={s["d-sm-none"]}
            variant="primary"
            disabled={offset + 8 >= count}
            onClick={loadLastPage}
          >
            <span className={s["d-sm-none"]}>Last </span>&gt;&gt;
          </Button>
        </div>
      </div>
    </>
  );
};

type OwnProps = {
  limit: number;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  isLoading: getHomePageIsLoading(state),
  pokemons: getPokemons(state),
  count: getCount(state),
  offset: getOffset(state),
  limit: ownProps.limit,
});

export default connect(mapStateToProps, {
  loadPokemons,
})(React.memo(Pokemons));
