const STORAGE_KEY = 'memory-game-leaders';
const MAX_LEADERS = 10;

function getLeaders() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLeaders(leaders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leaders));
}

function getTopLeaders() {
  const leaders = getLeaders();
  leaders.sort((a, b) => {
    if (a.moves !== b.moves) return a.moves - b.moves;
    return new Date(a.date) - new Date(b.date);
  });
  return leaders.slice(0, MAX_LEADERS);
}

function saveScore(moves) {
  const leaders = getLeaders();
  leaders.push({ moves, date: new Date().toISOString() });
  writeLeaders(leaders);
}

export { getTopLeaders, saveScore };