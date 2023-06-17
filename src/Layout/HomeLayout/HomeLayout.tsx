import { ReactNode } from "react";
import { HomeBoxShadow, Wrapper } from "./HomeLayout.style"


interface HomeLayoutProps {
    children: ReactNode;
  }
  
  const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
      <Wrapper>
        <HomeBoxShadow>
            {children}
        </HomeBoxShadow>
      </Wrapper>
    )
}

export default HomeLayout