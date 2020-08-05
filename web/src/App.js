import React from 'react';
import { Route } from 'react-router-dom';

import Hero from './Hero';
import URLForm from './URLForm';
import GetURL from './GetURL';

const App = () => (
  <>
    <Route exact path="/">
      <Hero />
      <URLForm />
    </Route>
    <Route exact path="/:id" component={GetURL} />
  </>
);

export default App;
