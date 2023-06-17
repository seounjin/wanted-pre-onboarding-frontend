import { ChangeEvent, useEffect, useState } from "react";
import { createTodoItem, deleteTodoItem, getTodoItems } from "../api/todoFetcher";
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
      setTodoItems([...todoItems, res.data])
    }
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const index = Number(event.target.name);
    
    const newTodoItems = [...todoItems];
    newTodoItems[index] = { ...todoItems[index], isCompleted: checked };
    
    setTodoItems(newTodoItems);
  }

  const deleteTodoItemButonClick = async(indexToDelete: number) => {
    const todoItemId = todoItems[indexToDelete].id;
    const res = await deleteTodoItem(todoItemId);
    if (res.status === 204) {
      setTodoItems(todoItems.filter((_, index) => index !== indexToDelete));
    }
  }


  return (
    <TodoLayout>
      <CreateTodo onChange={createTodoInputChange} onClick={createTodoItemButtonClick}/>
      <TodoList>
        {todoItems &&
          todoItems.map((data, index) => (
            <TodoItem
              key={data.id}
              index={index}
              data={data}
              handleCheckboxChange={handleCheckboxChange}
              deleteTodoItemButonClick={deleteTodoItemButonClick}
            />
          ))}
      </TodoList>
    </TodoLayout>
  );
};

export default TodoPage;