import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

//components
import Navbar from "./Components/layout/Navbar";
import Footer from './Components/layout/Footer'
import Main from "./Main";
//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Main />
            <Footer />
          </Fragment>
        </Router>
      </Provider>

  );
};

export default App;
