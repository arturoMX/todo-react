import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
    // ESTADOS 
    // const [todos, saveTodos] = useLocalStorage('listTodos', []);
    // Para renombrar un elemenmto se ocupan los dos puntos
    const {
        item: todos,
        saveItems: saveTodos,
        loading,
        error
    } = useLocalStorage('listTodos', []);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    // Con la función filter, filtramos por algun valor en el Array
    // ESTADOS DERIVADOS
    const completedTodos = todos.filter(todo => todo.completed).length;
    const totalTodos = todos.length;

    // console.log('Log 1');
    // React.useEffect(() => {
    //   console.log('Log 2');
    // });
    // React.useEffect(() => {
    //   console.log('Log 2');
    // }, [totalTodos]);
    // console.log('Log 3');

    const searchedTodos = todos.filter(
        (todo) => {
            // SE CONVIERTE A MINUSCULAS PARA QUE EN LA BUSQUEDA TODO COINCIDA
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        }
    );

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false
        })
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return (
        // Todo lo que va en value se va a exponer en general a todos los componentes
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
        }}>
            {children}
        </TodoContext.Provider>
    );
}
export { TodoContext, TodoProvider };