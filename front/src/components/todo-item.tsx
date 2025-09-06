// src/components/todo-item.tsx
import { useState } from "react";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";

type TodoItem = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId?: string;
  createdAt?: string;
  completedAt?: string;
};

interface TodoItemProps {
  todo: TodoItem;
  currentUser: string;
  onToggle: (id: number, nextCompleted: boolean) => void;
  // 편집/삭제는 백엔드 엔드포인트가 없어 일단 미구현
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, title: string, description: string) => void;
  canEdit: boolean; // 내 할 일 여부에 따라 체크박스 활성화
}

export function TodoItemComponent({
  todo,
  currentUser,
  onToggle,
  canEdit,
}: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(d);
  };

  return (
    <div className={`border rounded p-4 ${todo.completed ? "opacity-75" : ""}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={todo.completed}
            disabled={!canEdit}
            onChange={() => canEdit && onToggle(todo.id, !todo.completed)}
            className="h-5 w-5"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium text-sm flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="h-6 w-6 flex items-center justify-center">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 mb-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(todo.createdAt)}</span>
            </div>
            {todo.completed && todo.completedAt && (
              <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100">
                완료: {formatDate(todo.completedAt)}
              </span>
            )}
          </div>

          {isExpanded && todo.description && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{todo.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
