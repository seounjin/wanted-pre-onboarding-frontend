import React from 'react';
import { ChangeEvent,  useState } from 'react';
import { Button, ButtonWrapper, CheckBox, Input, Label, Span, Wrapper } from './TodoItem.style'

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}


interface TodoItemProps {
 data: Todo;
 index: number;
 deleteTodoItemButonClick: (id: number, index: number)=> void;
 submitUpdatedItem: (id: number, index:number, isCompleted: boolean, modifyTodoItem:string) => void;
 handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>, id:number, index:number, todo: string) => void;
}

const TodoItem = ({
  data,
  index,
  deleteTodoItemButonClick,
  submitUpdatedItem,
  handleCheckboxChange
}: TodoItemProps) => {
  const { id, todo, isCompleted } = data;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modifyTodoItem, setModifyTodoItem] = useState<string>(todo);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleModifyInputChange = (evnet: ChangeEvent<HTMLInputElement>) => {
    setModifyTodoItem(evnet.target.value);
  }

  return (
    <Wrapper>
    <Label>
      <CheckBox
        name={String(index)}
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => handleCheckboxChange(e, id, index, todo)}
      />
      {!isEdit ? (
        <Span>{todo}</Span>
      ) : (
        <Input
          data-testid="modify-input"
          defaultValue={todo}
          onChange={handleModifyInputChange}
        />
      )}
    </Label>
    <ButtonWrapper>
      {!isEdit ? (
        <>
          <Button data-testid="modify-button" onClick={handleEdit}>
            수정
          </Button>
          <Button
            data-testid="delete-button"
            onClick={() => deleteTodoItemButonClick(id, index)}
          >
            삭제
          </Button>
        </>
      ) : (
        <>
          <Button data-testid="submit-button" onClick={() => {submitUpdatedItem(id, index, isCompleted, modifyTodoItem); setIsEdit(!isEdit)}}>
            제출
          </Button>
          <Button data-testid="cancel-button" onClick={handleEdit}>
            취소
          </Button>
        </>
      )}
    </ButtonWrapper>
  </Wrapper>
  );
};

export default React.memo(TodoItem);
