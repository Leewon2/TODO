"use client";

import type { TodoItem, UserStats } from "./types";

const API_BASE = "http://localhost:8080"; // 네 백엔드 주소

class TodoStore {
  async getAllTodos(): Promise<TodoItem[]> {
    const res = await fetch(`${API_BASE}/api/todo`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data = await res.json();
    return data;
  }

  async getTodosByUser(username: string): Promise<TodoItem[]> {
    const res = await fetch(`${API_BASE}/api/todo?username=${encodeURIComponent(username)}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch user todos");
    const data = await res.json();
    return data;
  }

  async addTodo(todo: { title: string; description: string; username: string }): Promise<TodoItem> {
    const res = await fetch(`${API_BASE}/api/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return res.json();
  }

  async updateTodo(id: number, updates: Partial<TodoItem>): Promise<TodoItem> {
    const res = await fetch(`${API_BASE}/api/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
  }

  async deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/todo/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete todo");
  }

  async toggleTodo(id: number): Promise<TodoItem> {
    const res = await fetch(`${API_BASE}/api/todo/${id}/toggle`, {
      method: "PATCH",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to toggle todo");
    return res.json();
  }

  async getUserStats(): Promise<UserStats[]> {
    const res = await fetch(`${API_BASE}/api/stats`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch user stats");
    return res.json();
  }
}

export const todoStore = new TodoStore();
