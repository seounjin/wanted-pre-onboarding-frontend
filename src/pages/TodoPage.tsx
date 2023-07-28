import CreateTodo from "../components/Todo/CreateTodo/CreateTodo";
import TodoItem from "../components/Todo/TodoItem/TodoItem"
import TodoList from "../components/Todo/TodoList/TodoList";
import useCreateTodo from "../hooks/useCreateTodo";
import useTodoAction from "../hooks/useTodoAction";
import useTodos from "../hooks/useTodos";
import TodoLayout from "../Layout/TodoLayout/TodoLayout";


const TodoPage = () => {
  const { todoItems, setTodoItems } = useTodos();
  const { newTodoValue, createTodoItemButtonClick, createTodoInputChange} = useCreateTodo(todoItems, setTodoItems);
  const { deleteTodoItemButonClick, submitUpdatedItem, handleCheckboxChange } = useTodoAction(setTodoItems);

  
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