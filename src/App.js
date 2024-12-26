import React from 'react';
import UserList from './Componentes/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import VisitCounter from "./Componentes/VisitCounter";

const App = () => {
  return (
    <div>
      <h1 className="text-center mt-4">Chamba YA!!!!</h1>
      <UserList />
      <VisitCounter />
    </div>
  );
};

export default App;

