import React, { FC } from "react";
import classnames from "classnames";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import menuIcon from "../../assets/icons/menu.svg";

type PropsType = {
  openMenu: () => void;
};

const Header: FC<PropsType> = ({ openMenu }) => {
  return (
    <div className={s.header}>
      <div className={s.header__wrapper}>
        <NavLink className={s.nav__link} to="/home">
          <h1 className={s.header__brand}>Pokemon</h1>
        </NavLink>
        <img
          onClick={() => openMenu()}
          className={s.menuIcon}
          src={menuIcon}
          alt="menu"
        />
        <nav className={classnames(s.header__nav, s.nav)}>
          <ul className={s.nav__list}>
            <li className={s.nav__item}>
              <NavLink className={s.nav__link} to="/home">
                Home
              </NavLink>
            </li>
            <li className={s.nav__item}>
              <NavLink className={s.nav__link} to="/list">
                List
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
