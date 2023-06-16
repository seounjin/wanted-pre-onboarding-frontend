import { ReactNode } from "react"
import { Wrapper } from "./MainLayout.style"


interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Wrapper>{children}</Wrapper>
  )
}

export default MainLayout;