import { useState, useEffect } from "react";
import { getTodoItems } from "../api/todoFetcher";
import { Todo } from "../components/Todo/TodoItem/TodoItem";


const useTodos = () => {
    const [todoItems, setTodoItems] = useState<Todo[]>([]);
  
    const fetchTodoItems = async () => {
      const res = await getTodoItems();
      if (res.status === 200) {
        setTodoItems(res.data);
      }
    };
  
    useEffect(() => {
      fetchTodoItems();
    }, []);
  
    return { todoItems, setTodoItems };
  };
  
  export default useTodos;
  