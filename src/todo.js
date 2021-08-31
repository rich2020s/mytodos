import "./todo.css";
import { useState, useRef, useEffect } from "react";
import { AddTodo, TodoFilter, Todos, Container, Title } from "./components";

function TodoList() {
  const id = useRef(3);
  const [editedId, setEditedId] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      content: "哈哈",
      isDone: true,
    },
    {
      id: 2,
      content: "按下編輯後，不按下完成就不能刪除或分類喔！",
      isDone: false,
    },
  ]);
  function deleteAllTodos() {
    if (editedId !== null) return;
    setTodos([]);
  }
  function handleEdited(id, content) {
    if (editedId === null) {
      setEditedId(id);
      setEditedValue(content);
    }
  }
  useEffect(() => {
    if (document.querySelector("#editedInput"))
      document.querySelector("#editedInput").focus();
  }, [editedId]);

  function handleEditedOnChange(e) {
    setEditedValue(e.target.value);
  }
  function handleEditedComplete(id) {
    setEditedId(null);
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id,
          content: editedValue,
          isDone: todo.isDone,
        };
      })
    );
  }
  function handleFilterButton(value) {
    if (editedId !== null) return;
    setFilterValue(value);
  }
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }
  function handleAddTodo(inputValue) {
    if (inputValue === "") return;
    setTodos([
      ...todos,
      {
        id: id.current,
        content: inputValue,
      },
    ]);
    id.current++;
    setInputValue("");
  }
  function handleDeleteTodo(id) {
    if (editedId !== null) return;
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  function handleIsDone(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id,
          content: todo.content,
          isDone: !todo.isDone,
        };
      })
    );
  }
  return (
    <Container>
      <Title>My todolist</Title>
      <AddTodo
        handleAddTodo={handleAddTodo}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
      />
      <TodoFilter
        handleFilterButton={handleFilterButton}
        deleteAllTodos={deleteAllTodos}
        filterValue={filterValue}
      />
      <Todos
        editedValue={editedValue}
        handleEditedOnChange={handleEditedOnChange}
        handleEditedComplete={handleEditedComplete}
        editedId={editedId}
        handleEdited={handleEdited}
        filterValue={filterValue}
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleIsDone={handleIsDone}
      />
    </Container>
  );
}
function Test() {
  return <div>hello</div>;
}
export default Test;
