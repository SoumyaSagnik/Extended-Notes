# useReducer

useReducer allows us to manage state and re-render a component whenever that state changes. The idea behind useReducer is that it gives you a more concrete way to handle complex state.

The `useReducer()` takes in two parameetrs to start with. The first one is the reducer which is a function that we perform on our state to get new state and it's also gonna have an initial value (the second one).

In return we get two values. The first one is the state object. The second value is a function called dispatch which is essentially what we call in order to update our state. So it'll call the reducer function.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function increment() {
    dispatch({ type: "increment" });
  }

  function decrement() {
    dispatch({ type: "decrement" });
  }

  return (
    <div>
      <button onClick={decrement}>-</button>
      {state.count}
      <button onClick={increment}>+</button>
    </div>
  );
};
```

We could directly pass down 0 istead of passing an object. But generally if you're using useReducer the state will be more complex and hence we generally pass an objet.

The reducer function takes in two different parameters. The first one is the current state. The second parameter is called action. This action is what we pass into the dispatch function. So whenever we call dispatch, the value with which we called the dispatch is going to be set to this action variable.

In the switch case we're doing `action.type` since in dispatch we're setting an object with key `type`.

---

Instead of using hardcoded strings we could do something like this:

```javascript
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function increment() {
    dispatch({ type: ACTIONS.INCREMENT });
  }

  function decrement() {
    dispatch({ type: ACTIONS.DECREMENT });
  }

  return (
    <div>
      <button onClick={decrement}>-</button>
      {state.count}
      <button onClick={increment}>+</button>
    </div>
  );
};
```

---

useReducer is not that useful when state is not complex enough. Hence below is a more complex example.

```javascript
// App.jsx

import { useReducer, useState } from "react";
import "./App.css";
import Todo from "./Todo";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(todos, action) {
  todos = todos.filter((todo) => todo != null);
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  if (name.trim() !== "")
    return {
      id: Date.now(),
      name: name,
      complete: false,
    };
}

const App = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos
        .filter((todo) => todo != null)
        .map((todo) => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
        })}
    </>
  );
};

export default App;
```

```javascript
// Todo.jsx

import React from "react";
import { ACTIONS } from "./App";

const Todo = ({ todo, dispatch }) => {
  return (
    <div>
      <span style={{ color: todo.complete ? "green" : "red" }}>
        {todo.name}
      </span>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
        }
      >
        Toggle
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
```

`payload` is something that we send along with type of cation in dispatch. This `payload` is essentially an object which contains all the variables which we might need access to in order to change the state effectively.

In the above example we're sending the `todo.id` to the Todo element so that we can delete the Todo on clicking the delete button. If we don't send the id then we can't determine which todo we want removed.
