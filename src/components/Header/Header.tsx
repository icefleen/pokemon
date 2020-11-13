import React from "react";
import classnames from "classnames";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.header__wrapper}>
        <NavLink className={s.nav__link} to="/pokemons">
          <h1 className={s.header__brand}>Pokemon</h1>
        </NavLink>
        <nav className={classnames(s.header__nav, s.nav)}>
          <ul className={s.nav__list}>
            <li className={s.nav__item}>
              <NavLink className={s.nav__link} to="/pokemons">
                Home
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink className={s.nav__link} to="/contacts">
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
