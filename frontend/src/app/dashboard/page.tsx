"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  createTodo,
  getTodos,
  deleteTodo,
  toggleTodoStatus,
} from "@/services/todo";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    const storedToken = Cookies.get("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);



  const fetchTodos = async () => {
    if (!user) return;

    try {
      const data = await getTodos(token || "");

      setTodos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTodo = async () => {
    if (!user) return;
    console.log(user.username);

    try {
      console.log(title, user.username);
      await createTodo(title, token || "");

      setTitle("");

      fetchTodos();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleToggleStatus = async (todoId: string, currentStatus: boolean) => {
    try {
      await toggleTodoStatus(todoId, currentStatus, token || "");

      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    console.log(todoId);
    try {
      await deleteTodo(todoId, token || "");

      fetchTodos();
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Todo Dashboard
            </h1>
  
            <p className="text-gray-400 mt-2">
              Manage your daily tasks efficiently 🚀
            </p>
          </div>
  
          <button
            onClick={() => {
              Cookies.remove("token", {
                path: "/",
              });
  
              localStorage.removeItem("user");
  
              window.location.replace("/signin");
            }}
            className="bg-white text-black px-5 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>
  
        {/* Add Todo Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-2xl mb-10">
          <h2 className="text-2xl font-semibold mb-5">
            Add New Todo
          </h2>
  
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="What do you want to do today?"
              className="flex-1 bg-black/30 border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-white text-white placeholder:text-gray-400 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
  
            <button
              onClick={handleCreateTodo}
              className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-xl"
            >
              Add Todo
            </button>
          </div>
        </div>
  
        {/* Todo List */}
        <div className="space-y-5">
          {todos.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-semibold text-gray-300">
                No Todos Yet
              </h2>
  
              <p className="text-gray-500 mt-2">
                Add your first task above ✨
              </p>
            </div>
          ) : (
            todos.map((todo: any) => (
              <div
                key={todo.documentId || todo.id}
                className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-xl hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      todo.isCompleted
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`}
                  />
  
                  <p
                    className={`text-lg font-medium ${
                      todo.isCompleted
                        ? "line-through text-gray-400"
                        : "text-white"
                    }`}
                  >
                    {todo.title || todo.attributes?.title}
                  </p>
                </div>
  
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleToggleStatus(
                        todo.documentId || todo.id,
                        todo.isCompleted
                      )
                    }
                    className={`px-5 py-2 rounded-2xl font-medium transition-all duration-300 ${
                      todo.isCompleted
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {todo.isCompleted
                      ? "Completed"
                      : "Pending"}
                  </button>
  
                  <button
                    onClick={() =>
                      handleDeleteTodo(
                        todo.documentId || todo.id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-2xl font-medium transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
