import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { createTodoItem, deleteTodoItem } from "../api/todoFetcher";
import { Todo } from "../components/Todo/TodoItem/TodoItem";

const useCreateTodo = (
    todoItems: Todo[],
    setTodoItems: Dispatch<SetStateAction<Todo[]>>
  ) => {
    const [newTodoValue, setNewTodoValue] = useState<string>('');
  
    const createTodoItemButtonClick = async () => {
      const res = await createTodoItem(newTodoValue);
      if (res.status === 201) {
        setTodoItems([...todoItems, res.data]);
        setNewTodoValue('');
      }
    };

    const createTodoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTodoValue(event.target.value);
      }
    
  
    return { newTodoValue, createTodoItemButtonClick, createTodoInputChange };
  };
  

export default useCreateTodo;