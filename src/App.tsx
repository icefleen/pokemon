import React, { useState } from "react";
import s from "./App.module.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Pokemons from "./components/Pokemons/Pokemons";
import Pokemon from "./components/Pokemon/Pokemon";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import List from "./components/List/List";

const App = () => {
  const [menuShowing, setMenuShowing] = useState(false);

  const openMenu = () => {
    setMenuShowing(true);
  };

  const closeMenu = () => {
    setMenuShowing(false);
  };

  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Menu isShowing={menuShowing} closeMenu={closeMenu} />
        <Header openMenu={openMenu} />
        <div className={s.main}>
          <div className={s.main__wrapper}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Redirect exact from="/pokemon" to="/home" />

              <Route path="/home" render={() => <Pokemons limit={8} />} />
              <Route path="/pokemon/:id" render={() => <Pokemon />} />
              <Route path="/list" render={() => <List />} />

              <Route path="*" render={() => <div>404</div>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
