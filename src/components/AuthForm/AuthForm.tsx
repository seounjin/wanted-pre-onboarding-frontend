import { Form, Button, Input, InputBox, Label, Title } from './AuthForm.style'

const AuthForm = () => {
  return (
    <Form>
        <Title>회원가입</Title>

        <InputBox>
            <Label>이메일</Label>
            <Input data-testid="email-input"/>
        </InputBox>
        
        <InputBox>
            <Label>비밀번호</Label>
            <Input data-testid="password-input"/>
        </InputBox>

        <Button data-testid="signup-button">회원가입</Button>
    </Form>
  )
}

export default AuthForm;