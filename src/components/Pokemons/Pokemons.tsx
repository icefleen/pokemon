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
  getOffset,
  getPokemons,
} from "../../store/homePage/homeSelectors";

type PropTypes = {
  pokemons: Array<PokemonTypes.Pokemon>;
  count: number;
  limit: number;
  offset: number;
  loadPokemons: (limit: number, offset: number) => void;
};

const Pokemons: FC<PropTypes> = ({
  pokemons,
  count,
  limit,
  offset,
  loadPokemons,
}) => {
  useEffect(() => {
    loadPokemons(limit, 0);
  }, [loadPokemons, limit]);

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
    <div className={s.gallery}>
      <div className={classnames(s.gallery__cards, s.cards)}>
        {pokemons.map((pokemon) => (
          <NavLink to={`/pokemon/${pokemon.id}`}>
            <Card
              image={pokemon.sprites.other["official-artwork"].front_default}
              title={pokemon.name}
            />
          </NavLink>
        ))}
      </div>
      <div className={s.gallery__buttons}>
        <Button
          text="<< First"
          variant="primary"
          disabled={offset < limit}
          onClick={loadFirstPage}
        />
        <Button
          text="< Prev"
          variant="primary"
          disabled={offset < limit}
          onClick={loadPrevPage}
        />
        <Button
          text={`${offset / limit + 1} / ${Math.ceil(count / limit)}`}
          variant="primary"
        />
        <Button
          text="Next >"
          variant="primary"
          disabled={offset + 8 >= count}
          onClick={loadNextPage}
        />
        <Button
          text="Last >>"
          variant="primary"
          disabled={offset + 8 >= count}
          onClick={loadLastPage}
        />
      </div>
    </div>
  );
};

type OwnProps = {
  limit: number;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  pokemons: getPokemons(state),
  count: getCount(state),
  offset: getOffset(state),
  limit: ownProps.limit,
});

export default connect(mapStateToProps, {
  loadPokemons,
})(Pokemons);
