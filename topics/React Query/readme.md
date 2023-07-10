# React Query

The first thing that you'll want to do is wrap the code where you want to use react-query with a **provider**

Next, we'll create a client and pass it to the provider.

## Basic Working

The main 2 things you can do in react-query is a **query** and a **mutation**.

query is getting data from somewhere.
mutation is changing some type of data.

### useQuery

useQuery takes in an object.
two important things in useQuery: **queryKey** and **queryFn**.

queryKey is a key that **uniquely** identifies the query. It always takes an array.

queryFn is the thing that's going to **run** to query our data. It always expects to return a promise.

In case of failures, react-query does multiple retries, before displaying the error message.

```javascript
import { useQuery, useMutation } from "@tanstack/react-query";

const Posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

const App = () => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...Posts]),
  });

  if (postQuery.isLoading) return <p>Loading...</p>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  function wait(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  return (
    <ul>
      {postQuery?.data.map((post) => (
        <li key={post?.id}>{post?.title}</li>
      ))}
    </ul>
  );
};

export default App;
```

---

### useMutation

useMutation also takes an object and you've to take care of only one thing here: mutationFn.

mutationFn returns a promise, just like useQueryFn.

useMutation just changes the underlying data. We need to show the updated data again after successful mutation.

for this we invalidate the query. React query will refetch the query that has been invalidated. For invaliating, we use the **useQueryClient** hook.

```javascript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

const App = () => {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...Posts]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        Posts.push({ id: crypto.randomUUID, title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) return <p>Loading...</p>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  function wait(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  return (
    <>
      <ul>
        {postQuery?.data.map((post) => (
          <li key={post?.id}>{post?.title}</li>
        ))}
      </ul>
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New Post")}
      >
        Add Post
      </button>
    </>
  );
};

export default App;
```
