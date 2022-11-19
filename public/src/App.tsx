import React from 'react';
import { XyzTransitionGroup } from '@animxyz/react';

import '@/index.css';
import { Route, Router, Routes } from 'react-router';
import Layout from '@/format/Layout';
import Home from './routes/Home';

// colors: https://coolors.co/ef3e36-17bebb-2e282a-edb88b-fad8d6

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>

);

export default App;
