import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";

import { ThemeProvider } from "../containers/context/themeContext";

import PublicRoute from "./public";
import NotFound from "../pages/notFound";

const Routes = () => (
  <ThemeProvider>
    <Router>
      <Switch>
        {routes.map((route) => {
          return <PublicRoute key={route.path} {...route} />;
        })}
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default Routes;
