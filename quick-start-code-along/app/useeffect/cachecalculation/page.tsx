"use client"

import { useState, useMemo } from "react";
import { initialTodos, createTodo, getVisibleTodos } from "./todos";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, showActive);
  }, [todos, showActive]);

  function handleAddClick() {
    if (!text.trim()) return;

    setTodos([...todos, createTodo(text)]);
    setText("");
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>

      <input value={text} onChange={(e) => setText(e.target.value)} />

      <button onClick={handleAddClick}>Add</button>

      <ul>
        {visibleTodos.map((todo: Todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}