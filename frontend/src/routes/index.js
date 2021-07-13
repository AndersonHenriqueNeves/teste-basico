import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Route from './Route';

import Home from '../pages/Home';
import Salas from '../pages/Salas';
import Professores from '../pages/Professores';
import Alunos from '../pages/Alunos';

export default function Routes() {
  return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/salas" exact component={Salas} />
        <Route path="/professores" exact component={Professores} />
        <Route path="/alunos" exact component={Alunos} />
      </Switch> 
  )
}