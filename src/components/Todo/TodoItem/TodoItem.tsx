import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { updateTodoItem } from '../../../api/todoFetcher';
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
 setTodoItems: Dispatch<SetStateAction<Todo[]>>;
 handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
 deleteTodoItemButonClick: (index: number) => void;
}

const TodoItem = ({
  data,
  index,
  setTodoItems,
  handleCheckboxChange,
  deleteTodoItemButonClick,
}: TodoItemProps) => {
  const { id, todo, isCompleted } = data;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modifyTodoItem, setModifyTodoItem] = useState<string>('');

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const submitUpdatedItem = async(indexToUpdate: number) => {
    const res = await updateTodoItem(id, modifyTodoItem, isCompleted);
    if(res.status === 200) {
      
      setTodoItems( prevTodoItems => prevTodoItems.map((data, index) => {
        if (indexToUpdate === index) {
          return res.data;
        }
        return data;
      }));
      setIsEdit(!isEdit);
    }
  }

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
          onChange={handleCheckboxChange}
        />
        {!isEdit ? <Span>{todo}</Span> : <Input data-testid="modify-input" onChange={handleModifyInputChange}/>}
      </Label>
      <ButtonWrapper>
        {!isEdit ? (
          <>
            <Button data-testid="modify-button" onClick={handleEdit}>
              수정
            </Button>
            <Button
              data-testid="delete-button"
              onClick={() => deleteTodoItemButonClick(index)}
            >
              삭제
            </Button>
          </>
        ) : (
          <>
            <Button data-testid="submit-button" onClick={()=>submitUpdatedItem(index)}>제출</Button>
            <Button data-testid="cancel-button" onClick={handleEdit}>
              취소
            </Button>
          </>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default TodoItem;
