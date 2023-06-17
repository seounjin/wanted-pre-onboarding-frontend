import { ChangeEvent } from 'react';
import { Button, ButtonWrapper, Input, Label, Span, Wrapper } from './TodoItem.style'

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
        <ButtonWrapper>
          <Button data-testid="modify-button">수정</Button>
          <Button data-testid="delete-button">삭제</Button>
        </ButtonWrapper>
    </Wrapper>
  )
}

export default TodoItem;