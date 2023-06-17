import { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Input, InputBox, Label, Title } from './AuthForm.style'

interface AuthFormProps {
    title: string;
    buttonTestId: string;
    buttonName: string;
    isDisabledButton: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onInputChange:(event: ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm = ({
    title,
    buttonTestId,
    buttonName,
    isDisabledButton,
    onSubmit,
    onInputChange,
  }: AuthFormProps) => {

    return (
      <Form onSubmit={onSubmit}>
        <Title>{title}</Title>
  
        <InputBox>
          <Label>이메일</Label>
          <Input id='email' type='text' data-testid="email-input" onChange={onInputChange} />
        </InputBox>
  
        <InputBox>
          <Label>비밀번호</Label>
          <Input id='password' type='password' data-testid="password-input" onChange={onInputChange} />
        </InputBox>
  
        <Button data-testid={buttonTestId} disabled={isDisabledButton}>{buttonName}</Button>
      </Form>
    );
  };
  
  export default AuthForm;
  