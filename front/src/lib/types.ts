export interface TodoItem {
  id: number; // JPA에서 Long -> number
  title: string;
  description: string;
  completed: boolean;

  // 백엔드에서 User 객체가 통째로 오니까 이렇게 맞춰줌
  user: {
    id: number;
    username: string;
  };

  createdAt: string;   // LocalDateTime -> string
  completedAt?: string; // LocalDateTime -> string | undefined
}

export interface UserStats {
  username: string;      // userId 대신 username 기반으로 보여주기
  totalTodos: number;
  completedTodos: number;
  completionRate: number; // 0~100 (%)
}