import { ReactNode } from "react";
import { Wrapper } from "./TodoList.style";

interface TodoListProps {
    children: ReactNode
}

const TodoList = ({ children }: TodoListProps) => {
  return (
    <Wrapper>{children}</Wrapper>
  )
}

export default TodoList;