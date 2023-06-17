import TodoItem from "../components/Todo/TodoItem"
import TodoList from "../components/Todo/TodoList";
import TodoLayout from "../Layout/TodoLayout/TodoLayout";

const TodoPage = () => {
  return (
    <TodoLayout>
      <TodoList>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
      </TodoList>
    </TodoLayout>
  )
}

export default TodoPage;