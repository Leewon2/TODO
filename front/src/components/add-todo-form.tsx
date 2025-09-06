import { useState } from "react";
import { Plus } from "lucide-react";

interface AddTodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm">
      <h2 className="flex items-center gap-2 font-bold mb-4">
        <Plus className="h-5 w-5 text-primary" />
        새 할 일 추가
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="할 일을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        {isExpanded && (
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              상세 설명
            </label>
            <textarea
              id="description"
              placeholder="상세 설명을 입력하세요 (선택사항)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50"
          >
            추가
          </button>
          {isExpanded && (
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setDescription("");
              }}
              className="px-3 py-1 border rounded"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
