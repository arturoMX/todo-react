import React from 'react'

// CUSTOM HOOKS

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() =>{
    setTimeout(() => {
      try {
        const localStorageItems = localStorage.getItem(itemName);
    
        let parsedItem;
    
        if (!localStorageItems) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItems);
          setItem(parsedItem);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }, 2000);
  }, []);

  const saveItems = (newItems) => {
    localStorage.setItem(itemName, JSON.stringify(newItems));
    setItem(newItems);
  };
  // Cuando se tiene que retornar más de dos elementos a retornar en vez de retornar en array, que se retorne como objeto
  return {
    item, 
    saveItems,
    loading,
    error
  };
}

export { useLocalStorage };

// localStorage.removeItem('listTodos');

    // const defaultTodos = [
    //     { text: "Cortar cebolla", completed: true },
    //     { text: "Terminar el curso", completed: false },
    //     { text: "Llorar con la llorona", completed: false },
    //     { text: "Tarea extra", completed: true }
    //   ];

    //   localStorage.setItem('listTodos', JSON.stringify(defaultTodos));