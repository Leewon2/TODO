// src/components/todo-list.tsx
import { CheckCircle2, Circle, Users } from "lucide-react";
import { TodoItemComponent } from "./todo-item";

type TodoItem = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;       // ISO string
  completedAt?: string;
};

interface TodoListProps {
  todos: TodoItem[];
  currentUser: string;
  onToggleTodo: (id: number, nextCompleted: boolean) => void;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, title: string, description: string) => void;
}

export function TodoList({
  todos,
  currentUser,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
}: TodoListProps) {
  const myTodos = todos.filter((t) => t.userId === currentUser);
  const otherTodos = todos.filter((t) => t.userId !== currentUser);

  const myCompletedCount = myTodos.filter((t) => t.completed).length;
  const myTotalCount = myTodos.length;

  return (
    <div className="space-y-6">
      {/* 내 할 일 */}
      <div className="rounded border bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              내 할 일
            </div>
            <span className="inline-flex items-center rounded border px-2 py-0.5 text-xs">
              {myCompletedCount}/{myTotalCount} 완료
            </span>
          </div>
        </div>
        <div className="p-4">
          {myTodos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Circle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>아직 할 일이 없습니다.</p>
              <p className="text-sm">위에서 새로운 할 일을 추가해보세요!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myTodos.map((todo) => (
                <TodoItemComponent
                  key={todo.id}
                  todo={todo}
                  currentUser={currentUser}
                  onToggle={(id, next) => onToggleTodo(id, next)}
                  onDelete={onDeleteTodo}
                  onUpdate={onUpdateTodo}
                  canEdit={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 다른 사용자 할 일 */}
      {otherTodos.length > 0 && (
        <div className="rounded border bg-white">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 font-semibold">
              <Users className="h-5 w-5 text-gray-500" />
              다른 사용자의 할 일
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {otherTodos.map((todo) => (
                <TodoItemComponent
                  key={todo.id}
                  todo={todo}
                  currentUser={currentUser}
                  onToggle={() => { /* 권한 없음: 토글 비활성화 */ }}
                  onDelete={() => { /* 권한 없음: 삭제 비활성화 */ }}
                  onUpdate={() => { /* 권한 없음: 수정 비활성화 */ }}
                  canEdit={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
