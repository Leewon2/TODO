// src/components/login-form.tsx
import { useState } from "react";

interface LoginFormProps {
  onLogin: (userId: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
        const params = new URLSearchParams({ password });
        const res = await fetch(`/api/user/login?${params}`, {
        method: 'POST',
        credentials: 'include',
        });

      if (!res.ok) {
        setError("비밀번호가 올바르지 않습니다.");
        return;
      }
      onLogin("me"); // 서버는 세션만 세팅하므로 표시용 id는 고정값 사용
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md border rounded-lg shadow-sm bg-white p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">투두리스트</h1>
          <p className="text-sm text-muted-foreground">로그인하여 할 일을 관리하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 rounded bg-primary text-white disabled:opacity-50"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
