import { ChangeEvent } from "react";
import { Button, Input, Wrapper } from "./CreateTodo.style"

interface CreateTodoProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}


const CreateTodo = ({ onChange, onClick}: CreateTodoProps) => {
    return (
      <Wrapper>
        <Input data-testid="new-todo-input" onChange={onChange}/>
        <Button data-testid="new-todo-add-button" onClick={onClick}>추가</Button>
      </Wrapper>
    );
  };
  
  export default CreateTodo;
  