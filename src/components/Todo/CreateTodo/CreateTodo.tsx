import { ChangeEvent } from "react";
import { Button, Input, Wrapper } from "./CreateTodo.style"

interface CreateTodoProps {
    newTodoValue: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}


const CreateTodo = ({ newTodoValue, onChange, onClick}: CreateTodoProps) => {
    return (
      <Wrapper>
        <Input data-testid="new-todo-input" value={newTodoValue} onChange={onChange}/>
        <Button data-testid="new-todo-add-button" onClick={onClick}>추가</Button>
      </Wrapper>
    );
  };
  
  export default CreateTodo;
  