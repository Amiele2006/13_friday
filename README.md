# React Context

- Use Context is a react hook used alongside Usestate to keep track of the state and data of what you want.

There are three steps Use Context is used:

1. you import it at the top of your file.

```ts

import { createContext } from "react";

```

2. you use createcontext and save it in a variable. Create your props and save it within your createcontext

```ts
const UserContext = createContext<string | null>(null);

```

3. Pass your context through the provider.

```ts

import { useState } from "react";
import { UserContext } from "./UserContext";
import Nav from "./Nav";

export default function App() {
  const [user] = useState("Emilie");

  return (
    <UserContext.Provider value={user}>
      <Nav />
    </UserContext.Provider>
  );
}

```

4. Now you can import it wherever you want in other files.

```ts

import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Nav() {
  const user = useContext(UserContext); // ✅ direct access to user
  return <p>Welcome, {user}</p>;
}

```