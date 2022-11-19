import React from 'react';
import { XyzTransitionGroup } from '@animxyz/react';

import '@/index.css';
import { Route, Router, Routes } from 'react-router';
import Location from '@/routes/Location';
import Layout from '@/format/Layout';
import Home from './routes/Home';
import Send from './routes/Send';
import View from './routes/View';

// colors: https://coolors.co/ef3e36-17bebb-2e282a-edb88b-fad8d6

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="send" element={<Send />} />
      <Route path="view" element={<View />} />
      <Route path="loc" element={<Location />} />
    </Route>
  </Routes>

);

export default App;
