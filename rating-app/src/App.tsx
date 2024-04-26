import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Board from './pages/rating-board/Board';
import CreateUpdateCard from './pages/create-update/CreateUpdateCard';
import { Layout } from './layouts/main-layout/Layout';
import { RequireAuthPage } from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Board />} />
            <Route path="board" element={<Board />} />
            <Route path="edit/:id" element={
              <RequireAuthPage>
                <CreateUpdateCard />
              </RequireAuthPage>
            } />
            <Route path="add" element={
              <RequireAuthPage>
                <CreateUpdateCard />
              </RequireAuthPage>
            } />
            <Route path="*" element={<Board />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
