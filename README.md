# wanted-pre-onboarding-frontend
원티드 프리온보딩 프론트엔드 과정 선발 과제

지원자의 성명
-----------
지원자 변성진

프로젝트의 실행 방법
-----------
```
$ npm install
$ npm run start
```

데모 영상
-----------
[배포링크](https://wanted-pre-onboarding-frontend-two-chi.vercel.app/)

<br />

# 기능설명

<br />

## 로그인 회원가입 기능

### 이메일, 비밀번호 유효성 검사

**요구사항**

- 이메일 조건: `@` 포함
- 비밀번호 조건: 8자 이상
- 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여

**구현방법**

- 이메일에 '@'가 포함되어 있지 않거나, 비밀번호의 길이가 8자 미만 true를 반환하는 함수를 만들었습니다.

```
export const validateEmailAndPassword = (email: string, password: string): boolean => {
    return !(/.*@.*/.test(email) && password.length >= 8);
}
```

- `validateEmailAndPassword` 함수 반환값 따른 button 비활성화 설정하였습니다.

```tsx
<AuthForm
      title={'회원가입'}
      buttonTestId={'signup-button'}
      buttonName={'회원가입'}
      onSubmit={handleSubmit}
      onInputChange={handleChange}
      isDisabledButton={validateEmailAndPassword(email, password)}
/>
```

**고민한 부분**

- `AuthForm` 컴포넌트에 `validateEmailAndPassword` 함수를  내장할지, 아니면 외부에서 호출할지에 대한 고민을 했습니다. 함수를 내장하면 컴포넌트와 해당 기능이 밀접하게 연결되므로, 버튼의 활성/비활성화 기능을 필요로 하지 않는 다른 상황에서는 이 컴포넌트를 재사용하기가 어려워집니다. 또한, 로직이 컴포넌트 내부에 숨겨져 있을 경우, 해당 컴포넌트의 주요 기능을 외부에서 명확하게 파악하기가 어렵습니다. 외부에서 사용 할 경우 기능의 명확성과 재사용성이 향상되므로 이 함수를 컴포넌트 외부에서 활용하는 방식을 선택하게 되었습니다.

<br />

### 회원가입 성공시 `/singin` 경로로 이동

**요구사항**

- 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동

**구현방법**

- `react-router-dom`의 `navigate`를 사용하여 `/sigin` 페이지로 이동시켰습니다.

```tsx
const navigate = useNavigate();
const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await signup(email, password);
        if (res?.status === 201) {
            navigate('/signin')
        }
}
```

<br />


### 로그인 성공시 `/todo` 경로로 이동

**요구사항**

- 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답
- 응답받은 JWT는 로컬 스토리지에 저장

**구현방법**

- `react-router-dom`의 `navigate`를 사용하여 `/todo` 페이지로 이동시켰습니다.
- 로그인 성공시 로컬스토리지에 토큰 저장합니다.

```tsx
const navigate = useNavigate();
const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const res = await singin(email, password);
        if (res?.status === 200) {
            setAccessToken('accessToken', res.data.access_token);
            navigate('/todo', { replace: true })
        }
}

// 토큰 저장
export const setAccessToken = (key: string, accessToken: string) => localStorage.setItem(key, accessToken);
```

- 로컬스토리지에 토큰 유무에 따른 해더에 토큰 추가하였습니다.

```tsx
const accessToken = getAccessToken('accessToken');

export const axiosClient = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
  headers: { 'Content-Type': 'application/json', Authorization: accessToken ? `Bearer ${accessToken}` : '' },
});
```

<br />

### 로그인 여부에 따른 리다이렉트 처리

**요구사항**

- 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트
- 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트

**구현방법**

- PublicRouter를 구현하여 토큰이 있을경우 `/todo`페이지로 교체하였고, 없을경우 `react-router-dom`의 `Outlet`을 사용하여 `Route`로 감싸져 있는 현재 경로(`/signup` 또는 `/signin`)에 머무르게 합니다.
- PrivateRouter를 구현하여 토큰이 있을 경우 Route로 감싸져 있는 `/todo` 페이지에 머무르게 하였고, 없을경우 `/singin` 페이지로  교체하였습니다.

```tsx
<BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route element={<PublicRouter/>}>
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signin" element={<SigninPage />} />
        </Route>
        <Route element={<PrivateRouter/>}>
          <Route path="/todo" element={<TodoPage />} />
        </Route>
      </Routes>
</BrowserRouter>

const PublicRouter = () => { 
  const accessToken = getAccessToken('accessToken');  
  return accessToken ? <Navigate to="/todo" replace /> : <Outlet/>;
}

const PrivateRouter = () => {
  const accessToken = getAccessToken('accessToken');  
  return accessToken ? <Outlet/> : <Navigate to="/signin" replace />;    
}
```

**고민한 부분**

- 기존에는 useEffect 훅에 토큰유무를 판단하여 페이지를 이동시키는 형식으로 구현하였습니다.이 방식으로 구현할 경우 페이지 이동시 눈에 띄는 깜빡임 현상이 발생했습니다. `react-router-dom`의 `Route`와 `Outlet`을 사용하면 전체 페이지의 리로드 없이 해당 컴포넌트만을 교체할 수 있어 깜빡이는 현상을 해결할 수 있었습니다.

<br />

## TODO LIST 기능

### TODO ITEM 생성

- TODO 내용을 작성할 수 있는 Input 태그와 생성할 수 있는 버튼을 포함한 CreateTodo 컴포넌트를 구현하였습니다.
- 생성 버튼 클릭시 TODO ITEM 생성 요청 API를 호출하고 성공했다면 todoItems 상태에 새로운 아이템이 추가됩니다.

```tsx

const [todoItems, setTodoItems] = useState<Todo[]>([]);
const [newTodoValue, setNewTodoValue] = useState<string>('');

const createTodoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoValue(event.target.value);
 }

  const createTodoItemButtonClick = async() => {
    const res = await createTodoItem(newTodoValue);
    if (res.status === 201){
      setTodoItems([...todoItems, res.data]);
      setNewTodoValue('');
    }
 }

<CreateTodo
      newTodoValue={newTodoValue}
      onChange={createTodoInputChange}
      onClick={createTodoItemButtonClick}
 />
```

<br />


### TODO ITEM 수정 삭제

- TodoItem 컴포넌트 내부에는 해당 아이템의 수정 삭제기능을 구현 하였습니다.
- 수정 버튼을 누르면 isEdit 상태값이 true로 변경 되며 제출, 취소버튼을 나타납니다. TODO 내용도 span 태그에서 input 태그로 변경됩니다.
- TODO 내용을 수정 후 제출 버튼을 누르면 수정 요청 API를 호출합니다. 성공하였다면 todoItems상태를 업데이트 시킵니다.
- 삭제 버튼을 누르면 해당 TODO ITEM의 id값을 사용하여 해당 아이템을 삭제 요청 API를 호출합니다. 삭제가 성공하였다면 todoItems상태를 업데이트 시킵니다.

**TodoItem 컴포넌트**

```tsx
// 수정
const submitUpdatedItem = async() => {
    const indexToUpdate = index;
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

// 삭제
const deleteTodoItemButonClick = async() => {
    const res = await deleteTodoItem(id);
    const indexToDelete = index;
    if (res.status === 204) {
      setTodoItems( prevTodoItems => prevTodoItems.filter((_, index) => index !== indexToDelete));
    }
  }
```

```tsx
<Wrapper>
    <Label>
          <CheckBox
            name={String(index)}
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
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
                onClick={deleteTodoItemButonClick}
              >
                삭제
              </Button>
            </>
          ) : (
            <>
              <Button data-testid="submit-button" onClick={submitUpdatedItem}>
                제출
              </Button>
              <Button data-testid="cancel-button" onClick={handleEdit}>
                취소
              </Button>
            </>
          )}
        </ButtonWrapper>
</Wrapper>
```
<br />

### 리팩토링

[이슈 링크](https://github.com/seounjin/wanted-pre-onboarding-frontend/issues/1)





