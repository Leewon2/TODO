// src/components/ranking-sidebar.tsx
import { Trophy, Medal, Award, TrendingUp, Target, Calendar } from "lucide-react";

type UserStats = {
  userId: string;
  completedTodos: number;
  totalTodos: number;
  completionRate: number; // 0~100
};

interface RankingSidebarProps {
  userStats: UserStats[];
  currentUser: string;
}

export function RankingSidebar({ userStats, currentUser }: RankingSidebarProps) {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return (
          <div className="h-5 w-5 flex items-center justify-center text-xs font-bold text-muted-foreground">
            {index + 1}
          </div>
        );
    }
  };

  const getRankBadge = (index: number) => {
    const base = "inline-flex items-center rounded px-2 py-0.5 text-white text-[10px] leading-none";
    switch (index) {
      case 0:
        return <span className={`${base} bg-yellow-500`}>1위</span>;
      case 1:
        return <span className={`${base} bg-gray-400`}>2위</span>;
      case 2:
        return <span className={`${base} bg-amber-600`}>3위</span>;
      default:
        return (
          <span className="inline-flex items-center rounded border px-2 py-0.5 text-[10px] leading-none">
            {index + 1}위
          </span>
        );
    }
  };

  const currentUserStats = userStats.find((s) => s.userId === currentUser);
  const currentUserRank = userStats.findIndex((s) => s.userId === currentUser) + 1;

  return (
    <div className="space-y-4">
      {/* 내 통계 */}
      {currentUserStats && (
        <div className="rounded border border-primary/20 bg-primary/5">
          <div className="p-4 pb-2">
            <div className="flex items-center gap-2 text-base font-semibold">
              <Target className="h-4 w-4 text-primary" />
              내 통계
            </div>
          </div>
          <div className="p-4 pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">현재 순위</span>
              {getRankBadge(currentUserRank - 1)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>완료율</span>
                <span className="font-medium">{currentUserStats.completionRate}%</span>
              </div>
              {/* Progress */}
              <div className="h-2 w-full rounded bg-muted/60 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${currentUserStats.completionRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg p-2 bg-background/50">
                <div className="text-lg font-bold text-primary">{currentUserStats.completedTodos}</div>
                <div className="text-xs text-muted-foreground">완료</div>
              </div>
              <div className="rounded-lg p-2 bg-background/50">
                <div className="text-lg font-bold text-muted-foreground">{currentUserStats.totalTodos}</div>
                <div className="text-xs text-muted-foreground">전체</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 전체 랭킹 */}
      <div className="rounded border">
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 text-base font-semibold">
            <TrendingUp className="h-4 w-4 text-primary" />
            전체 랭킹
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {userStats.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground text-sm">아직 통계가 없습니다</div>
            ) : (
              userStats.map((stat, index) => {
                const highlight = stat.userId === currentUser;
                const rateColor =
                  stat.completionRate >= 80
                    ? "text-green-600"
                    : stat.completionRate >= 50
                    ? "text-yellow-600"
                    : "text-muted-foreground";
                return (
                  <div
                    key={stat.userId}
                    className={`relative p-3 rounded-lg border transition-all ${
                      highlight ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">{getRankIcon(index)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-medium text-sm truncate ${highlight ? "text-primary" : ""}`}>
                            {stat.userId}
                          </span>
                          {highlight && (
                            <span className="inline-flex items-center rounded bg-secondary px-1.5 py-0.5 text-[10px] text-white">
                              나
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {stat.completedTodos}/{stat.totalTodos} 완료
                          </span>
                          <span className={`text-xs font-medium ${rateColor}`}>{stat.completionRate}%</span>
                        </div>
                        {/* Progress */}
                        <div className="h-1.5 w-full rounded bg-muted/60 mt-1 overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${stat.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 성취 배지 */}
      <div className="rounded border">
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 text-base font-semibold">
            <Calendar className="h-4 w-4 text-primary" />
            성취 배지
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {currentUserStats && (
              <>
                {currentUserStats.completionRate === 100 && currentUserStats.totalTodos > 0 && (
                  <span className="rounded bg-green-500 text-white text-center py-2 text-xs">완벽주의자</span>
                )}
                {currentUserStats.completedTodos >= 10 && (
                  <span className="rounded bg-blue-500 text-white text-center py-2 text-xs">열정적</span>
                )}
                {currentUserStats.completedTodos >= 5 && (
                  <span className="rounded bg-purple-500 text-white text-center py-2 text-xs">꾸준함</span>
                )}
                {currentUserRank === 1 && userStats.length > 1 && (
                  <span className="rounded bg-yellow-500 text-white text-center py-2 text-xs">1위 달성</span>
                )}
              </>
            )}
            {(!currentUserStats ||
              (currentUserStats.completionRate < 100 &&
                currentUserStats.completedTodos < 5 &&
                currentUserRank !== 1)) && (
              <div className="col-span-2 text-center py-4 text-muted-foreground text-sm">
                더 많은 할 일을 완료하여
                <br />
                배지를 획득하세요!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
