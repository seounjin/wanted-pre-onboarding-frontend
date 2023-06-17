import { ReactNode } from 'react'
import { BoxShadow, Title, Wrapper } from './TodoLayout.style';

interface TodoLayoutProps {
    children: ReactNode;
}
  
const TodoLayout = ({ children }: TodoLayoutProps) => {
    return (
      <Wrapper>
        <BoxShadow>
          <Title>TODO</Title>
          {children}
        </BoxShadow>
      </Wrapper>
    );
  };
  
export default TodoLayout;
  