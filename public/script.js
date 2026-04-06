let currentReport = null;
let dictionaryData = { words: [], phrases: [], wordsCount: 0, phrasesCount: 0 };
let dictionaryMode = "words";

const titleInput = document.getElementById("titleInput");
const textInput = document.getElementById("textInput");
const checkBtn = document.getElementById("checkBtn");
const exampleBtn = document.getElementById("exampleBtn");
const clearBtn = document.getElementById("clearBtn");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const resultSection = document.getElementById("resultSection");
const resultTitle = document.getElementById("resultTitle");
const resultMeta = document.getElementById("resultMeta");
const riskLabel = document.getElementById("riskLabel");
const wordCount = document.getElementById("wordCount");
const matchesCount = document.getElementById("matchesCount");
const phraseMatches = document.getElementById("phraseMatches");
const highlightedText = document.getElementById("highlightedText");
const matchesList = document.getElementById("matchesList");
const historyList = document.getElementById("historyList");
const topWords = document.getElementById("topWords");
const topCategories = document.getElementById("topCategories");
const totalReports = document.getElementById("totalReports");
const highRisk = document.getElementById("highRisk");
const mediumRisk = document.getElementById("mediumRisk");
const lowRisk = document.getElementById("lowRisk");
const dictionaryList = document.getElementById("dictionaryList");
const dictionarySearch = document.getElementById("dictionarySearch");
const showWordsBtn = document.getElementById("showWordsBtn");
const showPhrasesBtn = document.getElementById("showPhrasesBtn");
const dictionaryCountBadge = document.getElementById("dictionaryCountBadge");
const phrasesCountBadge = document.getElementById("phrasesCountBadge");
const dictCountHero = document.getElementById("dictCountHero");
const phrasesCountHero = document.getElementById("phrasesCountHero");
const downloadBtn = document.getElementById("downloadBtn");

function escapeHtml(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleString("ru-RU");
}

function riskClass(label) {
  if (label === "Высокий") return "risk-high";
  if (label === "Средний") return "risk-medium";
  return "risk-low";
}

function renderReport(report) {
  currentReport = report;
  resultSection.classList.remove("hidden");
  resultTitle.textContent = report.title;
  resultMeta.textContent = `Проверка выполнена ${formatDate(report.checkedAt)}`;
  riskLabel.textContent = report.riskLabel;
  riskLabel.className = "";
  riskLabel.classList.add(riskClass(report.riskLabel));
  wordCount.textContent = report.wordCount;
  matchesCount.textContent = report.totalMatches;
  phraseMatches.textContent = report.phraseMatches;
  highlightedText.innerHTML = report.highlightedText || "Нет текста";

  if (!report.matches || !report.matches.length) {
    matchesList.innerHTML = '<div class="small-meta">Совпадения не найдены.</div>';
    return;
  }

  matchesList.innerHTML = report.matches.map((item) => `
    <div class="match-item">
      <strong>${escapeHtml(item.original)}</strong>
      <div class="small-meta">Замена: ${escapeHtml(item.translation)}</div>
      <div class="small-meta">Категория: ${escapeHtml(item.category)}</div>
      <div class="small-meta">${escapeHtml(item.description || "")}</div>
      <span class="risk-pill ${item.risk === "high" ? "risk-high" : item.risk === "medium" ? "risk-medium" : "risk-low"}">
        ${item.risk === "high" ? "Высокий риск" : item.risk === "medium" ? "Средний риск" : "Низкий риск"}
      </span>
    </div>
  `).join("");
}

async function loadStats() {
  const response = await fetch("/api/stats");
  const data = await response.json();

  totalReports.textContent = data.totalReports || 0;
  highRisk.textContent = data.highRisk || 0;
  mediumRisk.textContent = data.mediumRisk || 0;
  lowRisk.textContent = data.lowRisk || 0;

  topWords.innerHTML = (data.topWords || []).length
    ? data.topWords.map((item) => `<span class="tag">${escapeHtml(item.word)} · ${item.count}</span>`).join("")
    : '<span class="small-meta">Пока пусто</span>';

  topCategories.innerHTML = (data.topCategories || []).length
    ? data.topCategories.map((item) => `<span class="tag">${escapeHtml(item.category)} · ${item.count}</span>`).join("")
    : '<span class="small-meta">Пока пусто</span>';
}

async function loadHistory() {
  const response = await fetch("/api/reports");
  const reports = await response.json();

  historyList.innerHTML = reports.length
    ? reports.map((report) => `
        <div class="history-item">
          <strong>${escapeHtml(report.title)}</strong>
          <div class="small-meta">${formatDate(report.checkedAt)}</div>
          <div class="small-meta">Риск: ${escapeHtml(report.riskLabel)} · Совпадений: ${report.totalMatches}</div>
        </div>
      `).join("")
    : '<div class="small-meta">История пока пустая.</div>';
}

function renderDictionary() {
  const query = dictionarySearch.value.trim().toLowerCase();
  const source = dictionaryMode === "words" ? dictionaryData.words : dictionaryData.phrases;

  const filtered = source.filter((item) => {
    const base = dictionaryMode === "words" ? item.word : item.phrase;
    return base.toLowerCase().includes(query) ||
      item.translation.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
  });

  dictionaryList.innerHTML = filtered.slice(0, 180).map((item) => {
    const base = dictionaryMode === "words" ? item.word : item.phrase;
    return `
      <div class="dictionary-item">
        <strong>${escapeHtml(base)}</strong>
        <div class="translation">${escapeHtml(item.translation)}</div>
        <div class="category">${escapeHtml(item.category)}</div>
      </div>
    `;
  }).join("");

  if (!filtered.length) {
    dictionaryList.innerHTML = '<div class="small-meta">Ничего не найдено.</div>';
  }
}

async function loadDictionary() {
  const response = await fetch("/api/dictionary");
  dictionaryData = await response.json();

  dictionaryCountBadge.textContent = `${dictionaryData.wordsCount} слов`;
  phrasesCountBadge.textContent = `${dictionaryData.phrasesCount} фраз`;
  dictCountHero.textContent = `${dictionaryData.wordsCount}+`;
  phrasesCountHero.textContent = `${dictionaryData.phrasesCount}+`;

  renderDictionary();
}

async function checkText() {
  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  if (!text) {
    alert("Введите текст для проверки");
    return;
  }

  const response = await fetch("/api/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, text })
  });

  const data = await response.json();
  if (!response.ok) {
    alert(data.error || "Ошибка проверки");
    return;
  }

  renderReport(data);
  await loadStats();
  await loadHistory();
}

async function uploadFile() {
  const file = fileInput.files[0];
  if (!file) {
    alert("Выберите TXT-файл");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    alert(data.error || "Ошибка загрузки");
    return;
  }

  renderReport(data);
  await loadStats();
  await loadHistory();
}

function fillExample() {
  titleInput.value = "Black Friday для fashion store";
  textInput.value = "Special offer! Black Friday sale в fashion store. Best price на new collection, free delivery, online booking, social media и customer support.";
}

function clearAll() {
  titleInput.value = "";
  textInput.value = "";
  fileInput.value = "";
}

function downloadReport() {
  if (!currentReport) return;

  const lines = [
    `Название: ${currentReport.title}`,
    `Дата: ${formatDate(currentReport.checkedAt)}`,
    `Риск: ${currentReport.riskLabel}`,
    `Слов в тексте: ${currentReport.wordCount}`,
    `Совпадений: ${currentReport.totalMatches}`,
    "",
    "Найденные слова и фразы:"
  ];

  (currentReport.matches || []).forEach((item, index) => {
    lines.push(`${index + 1}. ${item.original} -> ${item.translation} [${item.category}]`);
  });

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "reklamochist-report.txt";
  link.click();
  URL.revokeObjectURL(url);
}

checkBtn.addEventListener("click", checkText);
uploadBtn.addEventListener("click", uploadFile);
exampleBtn.addEventListener("click", fillExample);
clearBtn.addEventListener("click", clearAll);
downloadBtn.addEventListener("click", downloadReport);
dictionarySearch.addEventListener("input", renderDictionary);

showWordsBtn.addEventListener("click", () => {
  dictionaryMode = "words";
  showWordsBtn.className = "btn btn-primary small-btn";
  showPhrasesBtn.className = "btn btn-outline small-btn";
  renderDictionary();
});

showPhrasesBtn.addEventListener("click", () => {
  dictionaryMode = "phrases";
  showWordsBtn.className = "btn btn-outline small-btn";
  showPhrasesBtn.className = "btn btn-primary small-btn";
  renderDictionary();
});

Promise.all([loadStats(), loadHistory(), loadDictionary()]);