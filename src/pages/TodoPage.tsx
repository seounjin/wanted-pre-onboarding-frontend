import { ChangeEvent, useEffect, useState } from "react";
import { createTodoItems, getTodoItems } from "../api/todoFetcher";
import CreateTodo from "../components/Todo/CreateTodo/CreateTodo";
import TodoItem, { Todo } from "../components/Todo/TodoItem/TodoItem"
import TodoList from "../components/Todo/TodoList/TodoList";
import TodoLayout from "../Layout/TodoLayout/TodoLayout";


const TodoPage = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [createTodoItem, setCreateTodoItem] = useState<string>('');
  
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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const index = Number(event.target.name);
    
    const newTodoItems = [...todoItems];
    newTodoItems[index] = { ...todoItems[index], isCompleted: checked };
    
    setTodoItems(newTodoItems);
  }


  return (
    <TodoLayout>
      <CreateTodo onChange={createTodoInputChange} onClick={createTodoButtonClick}/>
      <TodoList>
        {todoItems &&
          todoItems.map((data, index) => (
            <TodoItem
              key={data.id}
              index={index}
              data={data}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
      </TodoList>
    </TodoLayout>
  );
};

export default TodoPage;