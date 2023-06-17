import { Input, Label, Span, Wrapper } from './TodoItem.style'

const TodoItem = () => {
  return (
    <Wrapper>
        <Label>
            <Input type="checkbox" />
            <Span>TODO 1</Span>
        </Label>
    </Wrapper>
  )
}

export default TodoItem;