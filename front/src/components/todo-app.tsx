// src/components/todo-app.tsx
import { useEffect, useMemo, useState } from "react";
import { LogOut } from "lucide-react";
import { AddTodoForm } from "./add-todo-form";
import { RankingSidebar } from "./ranking-sidebar";
import { TodoList } from "./todo-list";

type Todo = {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  userId?: string;           // 서버 응답에 따라 없을 수 있음
  createdAt?: string | null; // 선택
  completedAt?: string | null;
};

interface TodoAppProps {
  currentUser: string;
  onLogout: () => void;
}

const API = "http://localhost:8080";
const URL = {
  list: `${API}/api/todo`,
  create: `${API}/api/todo/create`,
  complete: (id: number) => `${API}/api/todo/complete?id=${id}`,
  undo: (id: number) => `${API}/api/todo/completeUndo?id=${id}`,
};

function normalize(raw: any, usernameHint?: string): Todo {
  const userId =
    raw?.userId ??
    raw?.username ??
    raw?.user?.username ??
    usernameHint ??
    "me";
  return {
    id: Number(raw?.id),
    title: String(raw?.title ?? raw?.name ?? ""),
    description:
      raw?.description ?? raw?.desc ?? null,
    completed: Boolean(raw?.completed ?? raw?.done ?? false),
    userId,
    createdAt: raw?.createdAt ?? null,
    completedAt: raw?.completedAt ?? null,
  };
}

export function TodoApp({ currentUser, onLogout }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [msg, setMsg] = useState("");

  const toast = (t: string) => {
    setMsg(t);
    setTimeout(() => setMsg(""), 1600);
  };

  const loadTodos = async () => {
    const res = await fetch(URL.list, { credentials: "include" });
    if (!res.ok) return;
    const data = await res.json();

    let list: Todo[] = [];
    if (Array.isArray(data)) {
      // case A) Todo[] 또는 AllTodoList[]
      if (data.length && data[0]?.todos && Array.isArray(data[0]?.todos)) {
        // AllTodoList[]: [{ username, todos: [...]}, ...]
        list = data.flatMap((u: any) =>
          (u.todos || []).map((t: any) => normalize(t, u.username))
        );
      } else {
        // Todo[]
        list = data.map((t: any) => normalize(t));
      }
    } else if (data?.todos) {
      // case B) { username, todos: [...] }
      list = (data.todos || []).map((t: any) => normalize(t, data.username));
    }
    setTodos(list);
  };

  useEffect(() => {
    loadTodos();
  }, [currentUser]);

  const handleAddTodo = async (title: string, description: string) => {
    const body: any = { title, description };
    // CreateTodoDto가 id 필드를 가질 수도 있으나, 세션을 쓰면 없어도 매핑될 가능성이 큼
    const res = await fetch(URL.create, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      toast("할 일 추가됨");
      await loadTodos();
    } else {
      toast("할 일 추가 실패");
    }
  };

  const handleToggleTodo = async (id: number, next: boolean) => {
    const res = await fetch(next ? URL.complete(id) : URL.undo(id), {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      // 낙관적 업데이트
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: next } : t))
      );
      toast(next ? "완료 처리" : "완료 취소");
    } else {
      toast("권한 없음 또는 처리 실패");
    }
  };

  // 랭킹(프론트 계산)
  const userStats = useMemo(() => {
    const map = new Map<
      string,
      { completed: number; total: number }
    >();
    for (const t of todos) {
      const uid = t.userId || "me";
      const stat = map.get(uid) || { completed: 0, total: 0 };
      stat.total += 1;
      if (t.completed) stat.completed += 1;
      map.set(uid, stat);
    }
    const arr = Array.from(map.entries()).map(([userId, s]) => ({
      userId,
      completedTodos: s.completed,
      totalTodos: s.total,
      completionRate: s.total === 0 ? 0 : Math.round((s.completed / s.total) * 100),
    }));
    arr.sort(
      (a, b) =>
        b.completionRate - a.completionRate ||
        b.completedTodos - a.completedTodos
    );
    return arr;
  }, [todos]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">투두리스트</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              안녕하세요, <span className="font-medium">{currentUser}</span>님
            </span>
            <button onClick={onLogout} className="px-3 py-1.5 rounded border text-sm inline-flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {msg && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-1.5 rounded">
          {msg}
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <AddTodoForm onAddTodo={handleAddTodo} />
            <TodoList
              todos={todos as any}
              currentUser={currentUser}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={() => {}}
              onUpdateTodo={() => {}}
            />
          </div>
          <div className="lg:col-span-1">
            <RankingSidebar userStats={userStats} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
