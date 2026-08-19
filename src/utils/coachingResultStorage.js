const STORAGE_KEY = "coachingResults";

const readAll = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeAll = (entries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const sortKey = (entry) => entry.createdAt ?? entry.appliedAt;

export const getCoachingResults = () => {
  return [...readAll()].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
};

export const getCoachingResultById = (id) => {
  return readAll().find((entry) => entry.id === id) ?? null;
};

export const addCoachingResult = ({ company, role, result }) => {
  const now = new Date();
  const entry = {
    id: `${Date.now()}`,
    company,
    role,
    createdAt: now.toISOString(),
    appliedAt: now.toISOString().slice(0, 10),
    result,
  };
  try {
    writeAll([...readAll(), entry]);
  } catch (error) {
    console.warn("코칭 결과 저장 실패 (지원 내역 카드에 안 남을 수 있음):", error);
  }
  return entry;
};
