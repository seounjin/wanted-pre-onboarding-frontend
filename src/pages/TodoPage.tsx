import { ChangeEvent, useEffect, useState } from "react";
import { createTodoItems, getTodoItems } from "../api/todoFetcher";
import CreateTodo from "../components/Todo/CreateTodo/CreateTodo";
import TodoItem, { Todo } from "../components/Todo/TodoItem/TodoItem"
import TodoList from "../components/Todo/TodoList/TodoList";
import TodoLayout from "../Layout/TodoLayout/TodoLayout";


const TodoPage = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [createTodoItem, setCreateTodoItem] = useState('');
  
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
    setCreateTodoItem(event.target.value);
  }

  const createTodoButtonClick = async() => {
    const res = await createTodoItems(createTodoItem);
    if (res.status === 201){
      setTodoItems([...todoItems, res.data])
    }
  }


  return (
    <TodoLayout>
      <CreateTodo onChange={createTodoInputChange} onClick={createTodoButtonClick}/>
      <TodoList>
        {todoItems &&
          todoItems.map((data) => <TodoItem key={data.id} data={data}/>)}
      </TodoList>
    </TodoLayout>
  );
};

export default TodoPage;