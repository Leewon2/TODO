// src/App.jsx
import { useEffect, useState } from "react";
import { LoginForm } from "./components/login-form";
import { TodoApp } from "./components/todo-app";

// ✅ 단순모드: 로그인 성공 시 바로 전환
const USE_TODOS_PROBE = false; // ← 여기 false로 고정

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleLogin = (userId) => {
    console.log("[App] handleLogin", userId);
    setCurrentUser(userId || "me");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser("");
    setIsAuthenticated(false);
  };

  return isAuthenticated
    ? <TodoApp currentUser={currentUser} onLogout={handleLogout} />
    : <LoginForm onLogin={handleLogin} />;
}
