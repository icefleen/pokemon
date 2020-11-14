import React, { FC } from "react";
import classnames from "classnames";
import s from "./Menu.module.scss";
import closeIcon from "../../assets/icons/close.svg";
import { NavLink } from "react-router-dom";

type PropsType = {
  isShowing: boolean;
  closeMenu: () => void;
};

const Menu: FC<PropsType> = ({ isShowing, closeMenu }) => {
  return (
    <>
      <div
        onClick={closeMenu}
        className={classnames(s.overlay, {
          [s.overlay_hidden]: !isShowing,
        })}
      ></div>
      <nav className={classnames(s.menu, { [s.menu_hidden]: !isShowing })}>
        <img
          onClick={() => closeMenu()}
          className={s.menu__closeButton}
          src={closeIcon}
          alt="close"
        />
        <ul className={s.menu__list}>
          <li className={s.menu__item}>
            <NavLink to="/home">
              <span onClick={closeMenu} className={s.menu__itemLabel}>
                Home
              </span>
            </NavLink>
          </li>
          <li className={s.menu__item}>
            <NavLink to="/list">
              <span onClick={closeMenu} className={s.menu__itemLabel}>
                List
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
