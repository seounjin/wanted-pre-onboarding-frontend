import { ChangeEvent, useEffect, useState } from "react";
import { createTodoItem, getTodoItems } from "../api/todoFetcher";
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



  return (
    <TodoLayout>
      <CreateTodo newTodoValue={newTodoValue} onChange={createTodoInputChange} onClick={createTodoItemButtonClick}/>
      <TodoList>
        {todoItems &&
          todoItems.map((data, index) => (
            <TodoItem
              key={data.id}
              index={index}
              data={data}
              setTodoItems={setTodoItems}
            />
          ))}
      </TodoList>
    </TodoLayout>
  );
};

export default TodoPage;