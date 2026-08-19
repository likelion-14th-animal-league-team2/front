import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCoachingHistory } from "../../hooks/useCoachingHistory";
import { PATH } from "../../routes/paths";
import {
  IconDocument,
  IconSearch,
  IconPlus,
  IconSort,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from "../../components/common/icons";

const PAGE_SIZE = 3;
const SUMMARY_MAX_LENGTH = 80;

const summarize = (text) => {
  if (!text) return "";
  return text.length > SUMMARY_MAX_LENGTH
    ? `${text.slice(0, SUMMARY_MAX_LENGTH)}...`
    : text;
};

function CoachingHistory() {
  const { data: history, isLoading, isError } = useCoachingHistory();
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!history) return [];
    const keyword = query.trim().toLowerCase();
    const result = history.filter((item) => {
      if (!keyword) return true;
      return (
        item.company?.toLowerCase().includes(keyword) ||
        item.role?.toLowerCase().includes(keyword)
      );
    });
    const sortKey = (item) => item.createdAt ?? item.appliedAt;
    return [...result].sort((a, b) =>
      sortOrder === "latest"
        ? sortKey(b).localeCompare(sortKey(a))
        : sortKey(a).localeCompare(sortKey(b))
    );
  }, [history, query, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      <div className="flex items-center justify-between gap-4 mb-1">
        <h1 className="text-2xl font-bold text-slate-900">AI 코칭 내역</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </span>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="기업명 또는 직무 검색"
              className="w-64 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#1E2A47]"
            />
          </div>
          <Link
            to={PATH.RESUME_UPLOAD}
            className="flex items-center gap-1.5 bg-[#1E2A47] text-white text-sm font-semibold rounded-xl px-4 py-2.5 hover:bg-[#16203A] transition-colors whitespace-nowrap"
          >
            <IconPlus />
            새 코칭 받기
          </Link>
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-6">
        그동안 레주밍과 함께 진행한 이력서·자소서 코칭 기록을 한눈에 확인하세요.
      </p>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          총 <span className="font-extrabold text-[#1E2A47]">{filtered.length}건</span>의 코칭 기록
        </p>
        <div className="relative">
          <IconSort className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="appearance-none border border-slate-200 rounded-lg pl-7 pr-7 py-2 text-xs font-bold text-slate-600 outline-none cursor-pointer"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
          <IconChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {isLoading && <p className="text-sm text-slate-400 py-8 text-center">불러오는 중...</p>}
      {isError && (
        <p className="text-sm text-red-500 py-8 text-center">코칭 내역을 불러오지 못했어요.</p>
      )}
      {!isLoading && !isError && pageItems.length === 0 && (
        <p className="text-sm text-slate-400 py-8 text-center">
          {history?.length === 0 ? "아직 받은 코칭이 없어요." : "조건에 맞는 코칭 기록이 없어요."}
        </p>
      )}

      <div className="space-y-3">
        {pageItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#173B6B]/10 text-[#173B6B]">
                  <IconDocument width="18" height="18" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-extrabold text-slate-800 text-[15px]">{item.company}</p>
                    {item.role && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">
                        {item.role}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1.5">
                    {summarize(item.result?.personalizedCoachingInsight)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">{item.appliedAt}</span>
            </div>

            <div className="mt-4 flex items-center justify-end gap-4 flex-wrap">
              <Link
                to={`${PATH.COACHING_RESULT}?id=${item.id}`}
                className="flex items-center gap-1 text-xs font-bold text-[#1E2A47] hover:underline"
              >
                코칭 결과 보기
                <IconChevronRight />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-40"
          >
            <IconChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                p === currentPage
                  ? "bg-[#1E2A47] text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-40"
          >
            <IconChevronRight />
          </button>
        </div>
      )}

      <footer className="text-center text-xs text-slate-300 py-8">© 2026 레주밍</footer>
    </div>
  );
}

export default CoachingHistory;
