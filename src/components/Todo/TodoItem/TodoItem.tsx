import { ChangeEvent } from 'react';
import { Input, Label, Span, Wrapper } from './TodoItem.style'

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}


interface TodoItemProps {
 data: Todo;
 index: number;
 handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TodoItem = ({ data, index, handleCheckboxChange }: TodoItemProps) => {
  const { todo, isCompleted } = data;
  return (
    <Wrapper>
        <Label>
            <Input name={String(index)} type="checkbox" checked={isCompleted} onChange={handleCheckboxChange}/>
            <Span>{todo}</Span>
        </Label>
    </Wrapper>
  )
}

export default TodoItem;