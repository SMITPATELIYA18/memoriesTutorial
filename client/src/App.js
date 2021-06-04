import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Auth from "./Components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/auth" exact component={Auth}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
