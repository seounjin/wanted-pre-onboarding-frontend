import { ChangeEvent, useEffect, useState } from "react";
import { createTodoItem, deleteTodoItem, getTodoItems, updateTodoItem } from "../api/todoFetcher";
import CreateTodo from "../components/Todo/CreateTodo/CreateTodo";
import TodoItem, { Todo } from "../components/Todo/TodoItem/TodoItem"
import TodoList from "../components/Todo/TodoList/TodoList";
import TodoLayout from "../Layout/TodoLayout/TodoLayout";


const TodoPage = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [newTodoValue, setNewTodoValue] = useState<string>('');
  
  const fetchTodoItems = async() => {
    const res = await getTodoItems();
    if (res.status === 200) {
      setTodoItems(res.data);
    }
  }


  useEffect(() => {
    fetchTodoItems();
  }, []);

  const createTodoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoValue(event.target.value);
  }

  const createTodoItemButtonClick = async() => {
    const res = await createTodoItem(newTodoValue);
    if (res.status === 201){
      setTodoItems([...todoItems, res.data]);
      setNewTodoValue('');
    }
  }

  const deleteTodoItemButonClick = async(id: number, index: number) => {
    const res = await deleteTodoItem(id);
    const indexToDelete = index;
    if (res.status === 204) {
      setTodoItems( prevTodoItems => prevTodoItems.filter((_, index) => index !== indexToDelete));
    }
  }


  const submitUpdatedItem = async(id: number, index:number, isCompleted: boolean, modifyTodoItem:string) => {
    const indexToUpdate = index;
    const res = await updateTodoItem(id, modifyTodoItem, isCompleted);
    if(res.status === 200) {
      
      setTodoItems( prevTodoItems => prevTodoItems.map((data, index) => {
        if (indexToUpdate === index) {
          return res.data;
        }
        return data;
      }));
    }
  }

  const handleCheckboxChange = async(event: ChangeEvent<HTMLInputElement>, id:number, index:number, todo: string) => {
    const checked = event.target.checked;
    const indexToUpdate = index;
    const res = await updateTodoItem(id, todo, checked);
    if(res.status === 200) {
      
      setTodoItems( prevTodoItems => prevTodoItems.map((data, index) => {
        if (indexToUpdate === index) {
          return res.data;
        }
        return data;
      }));
    }
  }

  return (
    <TodoLayout>
      <CreateTodo
        newTodoValue={newTodoValue}
        onChange={createTodoInputChange}
        onClick={createTodoItemButtonClick}
      />
      <TodoList>
        {todoItems &&
          todoItems.map((data, index) => (
            <TodoItem
              key={data.id}
              index={index}
              data={data}
              deleteTodoItemButonClick={deleteTodoItemButonClick}
              submitUpdatedItem={submitUpdatedItem}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
      </TodoList>
    </TodoLayout>
  );
};

export default TodoPage;