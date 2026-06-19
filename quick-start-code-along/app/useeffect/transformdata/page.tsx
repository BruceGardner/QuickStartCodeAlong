"use client"

import { useState } from "react";
import { initialTodos, createTodo } from "./todos.js";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [showActive, setShowActive] = useState(false);

  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>

      <NewTodo
        onAdd={(newTodo: Todo) => setTodos(prev => [...prev, newTodo])}
      />

      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>

      <footer>{activeTodos.length} todos left</footer>
    </>
  );
}

function NewTodo({ onAdd }: { onAdd: (todo: Todo) => void }) {
  const [text, setText] = useState("");

  function handleAddClick() {
    if (!text.trim()) return;

    onAdd(createTodo(text));
    setText("");
  }

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleAddClick}>Add</button>
    </>
  );
}