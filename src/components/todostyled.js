import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 800px;
  flex-direction: column;
  margin: 30px auto;
  justify-content: center;
`;
export const Title = styled.h1`
  text-align: center;
`;
const TodoInput = styled.input`
  width: 50%;
  height: 40px;
`;
const Button = styled.button`
  padding: 6px 12px;
  margin-left: 10px;
  border: 1px solid black;
  border-radius: 3px;
  background-color: white;
`;

const ToggleButton = styled(Button)`
  background-color: white;
  border-color: #0d6efd;
  color: #0d6efd;
  :hover {
    color: white;
    background-color: #0d6efd;
    transition: 0.3s;
  }
`;
const RedButton = styled(Button)`
  background: red;
  color: white;
  border: none;
`;
const IsDoneButton = styled(Button)`
  :hover {
  }
`;
const TodoContent = styled.div`
  font-size: 18px;
  color: #333;
  max-width: 300px;
  word-wrap: break-word;
  text-decoration: ${(props) => props.isDone && "line-through"};
`;
const TodosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 10px;
  max-width: 70%;
  border: 1px solid #333;
  border-radius: 5px;
`;

export function TodoFilter({
  handleFilterButton,
  deleteAllTodos,
  filterValue,
}) {
  return (
    <div
      style={{
        flexDirection: "row",
        marginTop: "10px",
      }}
    >
      <RedButton onClick={() => deleteAllTodos()}>清空 Todo</RedButton>
      <ToggleButton onClick={() => handleFilterButton("all")}>
        全部
      </ToggleButton>
      <ToggleButton
        filterValue={filterValue}
        onClick={() => handleFilterButton("done")}
      >
        已完成
      </ToggleButton>
      <ToggleButton
        filterValue={filterValue}
        onClick={() => handleFilterButton("undone")}
      >
        未完成
      </ToggleButton>
    </div>
  );
}
export function Todos({
  todos,
  handleDeleteTodo,
  handleIsDone,
  filterValue,
  handleEdited,
  editedId,
  handleEditedComplete,
  handleEditedOnChange,
  editedValue,
}) {
  return todos.map((todo) => {
    if (filterValue === "done" && !todo.isDone) return;
    if (filterValue === "undone" && todo.isDone) return;
    return (
      <TodosContainer key={todo.id}>
        {editedId === todo.id ? (
          <TodoContent
            id={"editedInput"}
            onChange={(e) => handleEditedOnChange(e)}
            as="input"
            value={editedValue}
          />
        ) : (
          <TodoContent isDone={todo.isDone}>{todo.content}</TodoContent>
        )}
        <div>
          <IsDoneButton onClick={() => handleIsDone(todo.id)}>
            {todo.isDone ? "已完成" : "未完成"}
          </IsDoneButton>
          <Button onClick={() => handleDeleteTodo(todo.id)}>刪除</Button>
          {editedId === todo.id ? (
            <Button onClick={() => handleEditedComplete(todo.id)}>完成</Button>
          ) : (
            <Button onClick={() => handleEdited(todo.id, todo.content)}>
              編輯
            </Button>
          )}
        </div>
      </TodosContainer>
    );
  });
}
export function AddTodo({ handleAddTodo, handleInputChange, inputValue }) {
  return (
    <div style={{ display: "flex" }}>
      <TodoInput onChange={(e) => handleInputChange(e)} value={inputValue} />
      <Button onClick={() => handleAddTodo(inputValue)}>Add Todo</Button>
    </div>
  );
}
