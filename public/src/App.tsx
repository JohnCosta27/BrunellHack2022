import React from 'react';
import { XyzTransitionGroup } from '@animxyz/react';

import '@/index.css';
import { Route, Router, Routes } from 'react-router';
import Location from '@/routes/Location';
import Layout from '@/format/Layout';
import Home from './routes/Home';
import Map from './routes/map';

// colors: https://coolors.co/ef3e36-17bebb-2e282a-edb88b-fad8d6

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/" element={<Map />}>
      <Route index element={<Home />} />
      <Route path="loc" element={<Location />} />
      <Route path="map" element={<Map />} />
    </Route>
  </Routes>

);

export default App;
