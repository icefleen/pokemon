import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Pokemons from "./components/Pokemons/Pokemons";
import Pokemon from "./components/Pokemon/Pokemon";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/pokemons" />
          <Redirect exact from="/pokemon" to="/pokemons" />

          <Route path="/pokemons" render={() => <Pokemons />} />
          <Route path="/pokemon/:id" render={() => <Pokemon />} />

          <Route path="*" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
