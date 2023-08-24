import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css'

function TodoCounter() {
// Se le envia el contexto primero.
  const {completedTodos, totalTodos} = React.useContext(TodoContext);
    return (

      totalTodos === completedTodos ?

      <h1 className="TodoCounter"> Finalizaste los TODOs</h1>

      :

      <h1 className="TodoCounter">
        Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> TODOs
      </h1>
    );
  }

  export { TodoCounter };