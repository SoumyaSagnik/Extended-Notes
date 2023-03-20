# Context Api

First we need to inport { createContext } from react.

We then have to create a context for every group of components that you would like to be accessible throughout the application.

```javascript
// App.jsx
import "./App.css";
import { createContext, useState } from "react";
import Child from "./components/Child";

export const AppContext = createContext(null);

const App = () => {
  const [userName, setUserName] = useState("SSK");
  return (
    <AppContext.Provider value={{ userName, setUserName }}>
      <Child />
    </AppContext.Provider>
  );
};

export default App;
```

```javascript
// Child.jsx
import GrandChild from "./GrandChild";

const Child = () => {
  return <GrandChild />;
};

export default Child;
```

```javascript
// GrandChild
import { useContext } from "react";
import { AppContext } from "../App";

const GrandChild = () => {
  const { userName, setUserName } = useContext(AppContext);
  return (
    <div>
      <button
        onClick={() => {
          setUserName("Pedro");
        }}
      >
        {userName}
      </button>
    </div>
  );
};

export default GrandChild;
```

Accessing the state in grandchild

---

As application size grows, it's a good practice to create the context in a separate file.

```javascript
// Separate file UserContext.js

import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuth, setIsAuth] = useState(null);

  const login = () => {
    fetch("/login").then((res) => {
      setIsAuth(true);
      setUserInfo(res.user);
    });
  };
};

const logout = () => {
  fetch("/logout").then(() => {
    setIsAuth(false);
    setUserInfo(null);
  });
};

const value = {
  userInfo,
  setUserInfo,
  isAuth,
  setIsAuth,
  login,
  logout,
};

return <UserContext.Provider value={value}>{children}</UserContext.Provider>;

export default UserContext;
```

## Drawbacks of Context Api

- Every component wrapped inside the Context will change once the context changes.

```javascript
return (
  <AppContext.Provider value={{ userName, setUserName, count, setCount }}>
    <Child1 />
    <Child2 />
    <Child3 />
    <Child4 />
  </AppContext.Provider>
);
```

Suppose `userName` is only required inside Child1. whenever `userName` changes, all of the `four` child components will be re-rendered since the context changes. This leads to unnecessary re-rendering.

`If you have a state that's constantly gonna change, it's better not to put that inside of a context`
