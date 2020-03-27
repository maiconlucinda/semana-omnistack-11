// Importando o React
import React from 'react';

// Importando o React-router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Importando o Logon
import Logon from './pages/Logon';

// Importando o Register
import Register from './pages/Register';

// Importanto o Profile
import Profile from './pages/Profile';

// Importando o New Incident
import NewIncident from './pages/NewIncident';


// Exportando as rotas
export default function Routes() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Logon} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/incidents/new" component={NewIncident} />
    </Switch>
  </BrowserRouter>
  );
}