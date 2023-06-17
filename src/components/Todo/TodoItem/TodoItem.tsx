import { Input, Label, Span, Wrapper } from './TodoItem.style'

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}


interface TodoItemProps {
 data: Todo
}

const TodoItem = ({ data }: TodoItemProps) => {
  const { todo, isCompleted, userId } = data;
  return (
    <Wrapper>
        <Label>
            <Input type="checkbox" />
            <Span>{todo}</Span>
        </Label>
    </Wrapper>
  )
}

export default TodoItem;