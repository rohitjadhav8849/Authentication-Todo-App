import API from "@/lib/axios";

export const getTodos = async (
  token: string
) => {
  const response = await API.get(
    "/todos",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createTodo = async (
  title: string,
  token: string
) => {
  const response = await API.post(
    "/todos",
    {
      data: {
        title,
        isCompleted: false,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteTodo = async (
  todoId: string,
  token: string
) => {
  const response = await API.delete(
    `/todos/${todoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const toggleTodoStatus = async (
  todoId: string,
  isCompleted: boolean,
  token: string
) => {
  const response = await API.put(
    `/todos/${todoId}`,
    {
      data: {
        isCompleted: !isCompleted,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};