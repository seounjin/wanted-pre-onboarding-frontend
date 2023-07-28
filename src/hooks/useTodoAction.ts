import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { deleteTodoItem, updateTodoItem } from "../api/todoFetcher";
import { Todo } from "../components/Todo/TodoItem/TodoItem";


const useTodoAction = (setTodoItems: Dispatch<SetStateAction<Todo[]>>) => {
    
    const deleteTodoItemButonClick = async (id: number, index: number) => {
      const res = await deleteTodoItem(id);
      const indexToDelete = index;
      if (res.status === 204) {
        setTodoItems((prevTodoItems) =>
          prevTodoItems.filter((_, index) => index !== indexToDelete)
        );
      }
    };
  
    const submitUpdatedItem = async (
      id: number,
      index: number,
      isCompleted: boolean,
      modifyTodoItem: string
    ) => {
      const indexToUpdate = index;
      const res = await updateTodoItem(id, modifyTodoItem, isCompleted);
      if (res.status === 200) {
        setTodoItems((prevTodoItems) =>
          prevTodoItems.map((data, index) => {
            if (indexToUpdate === index) {
              return res.data;
            }
            return data;
          })
        );
      }
    };
  
    const handleCheckboxChange = async (
      event: ChangeEvent<HTMLInputElement>,
      id: number,
      index: number,
      todo: string
    ) => {
      const checked = event.target.checked;
      const indexToUpdate = index;
      const res = await updateTodoItem(id, todo, checked);
      if (res.status === 200) {
        setTodoItems((prevTodoItems) =>
          prevTodoItems.map((data, index) => {
            if (indexToUpdate === index) {
              return res.data;
            }
            return data;
          })
        );
      }
    };
  
    return { deleteTodoItemButonClick, submitUpdatedItem, handleCheckboxChange };
  };
  
export default useTodoAction;