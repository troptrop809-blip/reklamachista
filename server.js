const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const PUBLIC_DIR = path.join(__dirname, "public");
const REPORTS_FILE = path.join(DATA_DIR, "reports.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(REPORTS_FILE)) fs.writeFileSync(REPORTS_FILE, "[]", "utf-8");

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));

const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 1024 * 1024 * 2 }
});

const DICTIONARY = {
  "sale": {
    "translation": "распродажа",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "discount": {
    "translation": "скидка",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "offer": {
    "translation": "предложение",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "deal": {
    "translation": "выгодное предложение",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "clearance": {
    "translation": "ликвидация",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "coupon": {
    "translation": "купон",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "promo": {
    "translation": "промо",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "promotion": {
    "translation": "продвижение / акция",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "bonus": {
    "translation": "бонус",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "cashback": {
    "translation": "кэшбэк / возврат",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "gift": {
    "translation": "подарок",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "free": {
    "translation": "бесплатно",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "special": {
    "translation": "специальный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "exclusive": {
    "translation": "эксклюзивный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "limited": {
    "translation": "ограниченный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "price": {
    "translation": "цена",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "pricing": {
    "translation": "ценообразование",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "cost": {
    "translation": "стоимость",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "cheap": {
    "translation": "дешевый",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "premium": {
    "translation": "премиальный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "luxury": {
    "translation": "люксовый",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "economy": {
    "translation": "экономичный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "value": {
    "translation": "ценность",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "save": {
    "translation": "сэкономить",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "saving": {
    "translation": "экономия",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "voucher": {
    "translation": "ваучер",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "rebate": {
    "translation": "возмещение / скидка",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "bargain": {
    "translation": "выгодная покупка",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "flash": {
    "translation": "мгновенный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "specialty": {
    "translation": "специализация",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "hot": {
    "translation": "горячий",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "mega": {
    "translation": "мега",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "super": {
    "translation": "супер",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "ultra": {
    "translation": "ультра",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "best": {
    "translation": "лучший",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "top": {
    "translation": "топ / лучший",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "favorite": {
    "translation": "любимый",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "popular": {
    "translation": "популярный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "viral": {
    "translation": "вирусный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "must": {
    "translation": "обязательно",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "trend": {
    "translation": "тренд",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "trending": {
    "translation": "в тренде",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "new": {
    "translation": "новый",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "fresh": {
    "translation": "свежий",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "now": {
    "translation": "сейчас",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "today": {
    "translation": "сегодня",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "weekend": {
    "translation": "выходные",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "season": {
    "translation": "сезон",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "launch": {
    "translation": "запуск",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "drop": {
    "translation": "дроп / выпуск",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "release": {
    "translation": "релиз / выпуск",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "edition": {
    "translation": "издание / версия",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "bundle": {
    "translation": "набор",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "pack": {
    "translation": "пакет",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "starter": {
    "translation": "стартовый",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "trial": {
    "translation": "пробный",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "sample": {
    "translation": "образец",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "reward": {
    "translation": "награда",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "loyalty": {
    "translation": "лояльность",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "member": {
    "translation": "участник",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "membership": {
    "translation": "членство",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "club": {
    "translation": "клуб",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "subscription": {
    "translation": "подписка",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "subscribe": {
    "translation": "подписаться",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "unsubscribe": {
    "translation": "отписаться",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "marketing": {
    "translation": "маркетинг",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "branding": {
    "translation": "брендинг",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "brand": {
    "translation": "бренд",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "strategy": {
    "translation": "стратегия",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "tactic": {
    "translation": "тактика",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "campaign": {
    "translation": "кампания",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "creative": {
    "translation": "креатив",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "concept": {
    "translation": "концепция",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "brief": {
    "translation": "бриф",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "research": {
    "translation": "исследование",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "insight": {
    "translation": "инсайт",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "positioning": {
    "translation": "позиционирование",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "awareness": {
    "translation": "узнаваемость",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "consideration": {
    "translation": "рассмотрение",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "conversion": {
    "translation": "конверсия",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "retention": {
    "translation": "удержание",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "acquisition": {
    "translation": "привлечение",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "engagement": {
    "translation": "вовлеченность",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "funnel": {
    "translation": "воронка",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "touchpoint": {
    "translation": "точка контакта",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "persona": {
    "translation": "персона клиента",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "avatar": {
    "translation": "аватар / образ клиента",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "audience": {
    "translation": "аудитория",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "target": {
    "translation": "цель / целевая аудитория",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "segment": {
    "translation": "сегмент",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "segmentation": {
    "translation": "сегментация",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "niche": {
    "translation": "ниша",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "market": {
    "translation": "рынок",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "benchmark": {
    "translation": "эталон / ориентир",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "analysis": {
    "translation": "анализ",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "analytics": {
    "translation": "аналитика",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "metric": {
    "translation": "метрика",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "kpi": {
    "translation": "ключевой показатель",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "roi": {
    "translation": "окупаемость инвестиций",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "romi": {
    "translation": "окупаемость маркетинга",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "cpa": {
    "translation": "стоимость действия",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "cpc": {
    "translation": "стоимость клика",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "cpm": {
    "translation": "стоимость тысячи показов",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "ctr": {
    "translation": "кликабельность",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "ltv": {
    "translation": "пожизненная ценность клиента",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "arpu": {
    "translation": "средний доход на пользователя",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "lead": {
    "translation": "лид",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "prospect": {
    "translation": "потенциальный клиент",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "customer": {
    "translation": "клиент",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "client": {
    "translation": "клиент",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "buyer": {
    "translation": "покупатель",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "shopper": {
    "translation": "покупатель",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "consumer": {
    "translation": "потребитель",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "offerwall": {
    "translation": "стена предложений",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "roadmap": {
    "translation": "дорожная карта",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "vision": {
    "translation": "видение",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "mission": {
    "translation": "миссия",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "goal": {
    "translation": "цель",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "objective": {
    "translation": "задача",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "growth": {
    "translation": "рост",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "scaling": {
    "translation": "масштабирование",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "expansion": {
    "translation": "расширение",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "competitive": {
    "translation": "конкурентный",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "competitor": {
    "translation": "конкурент",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "share": {
    "translation": "доля",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "advantage": {
    "translation": "преимущество",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "proposal": {
    "translation": "предложение",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "storytelling": {
    "translation": "сторителлинг",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "message": {
    "translation": "сообщение",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "tone": {
    "translation": "тон",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "voice": {
    "translation": "голос бренда",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "identity": {
    "translation": "идентичность",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "guideline": {
    "translation": "гайдлайн",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "brandbook": {
    "translation": "брендбук",
    "category": "Маркетинг и стратегия",
    "risk": "high"
  },
  "advertising": {
    "translation": "реклама",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "ad": {
    "translation": "объявление / реклама",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "ads": {
    "translation": "объявления / реклама",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "banner": {
    "translation": "баннер",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "display": {
    "translation": "дисплейная реклама / показ",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "native": {
    "translation": "нативный",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "programmatic": {
    "translation": "программатик",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "remarketing": {
    "translation": "ремаркетинг",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "retargeting": {
    "translation": "ретаргетинг",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "traffic": {
    "translation": "трафик",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "click": {
    "translation": "клик / нажатие",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "impression": {
    "translation": "показ",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "reach": {
    "translation": "охват",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "frequency": {
    "translation": "частота",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "placement": {
    "translation": "размещение",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "inventory": {
    "translation": "рекламный инвентарь",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "publisher": {
    "translation": "издатель",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "landing": {
    "translation": "лендинг",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "landingpage": {
    "translation": "посадочная страница",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "website": {
    "translation": "веб-сайт",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "webpage": {
    "translation": "веб-страница",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "page": {
    "translation": "страница",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "homepage": {
    "translation": "главная страница",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "headline": {
    "translation": "заголовок",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "subtitle": {
    "translation": "подзаголовок",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "copy": {
    "translation": "рекламный текст",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "copywriting": {
    "translation": "копирайтинг",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "copywriter": {
    "translation": "копирайтер",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "cta": {
    "translation": "призыв к действию",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "button": {
    "translation": "кнопка",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "form": {
    "translation": "форма",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "popup": {
    "translation": "всплывающее окно",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "widget": {
    "translation": "виджет",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "pixel": {
    "translation": "пиксель",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "tracking": {
    "translation": "отслеживание",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "tag": {
    "translation": "тег",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "script": {
    "translation": "скрипт",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "code": {
    "translation": "код",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "seo": {
    "translation": "поисковая оптимизация",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "sem": {
    "translation": "поисковый маркетинг",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "smm": {
    "translation": "маркетинг в соцсетях",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "email": {
    "translation": "электронная почта",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "newsletter": {
    "translation": "рассылка",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "push": {
    "translation": "пуш-уведомление",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "notification": {
    "translation": "уведомление",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "automation": {
    "translation": "автоматизация",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "crm": {
    "translation": "система работы с клиентами",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "cdn": {
    "translation": "сеть доставки контента",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "app": {
    "translation": "приложение",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "application": {
    "translation": "приложение",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "mobile": {
    "translation": "мобильный",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "desktop": {
    "translation": "настольный",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "tablet": {
    "translation": "планшет",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "browser": {
    "translation": "браузер",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "session": {
    "translation": "сеанс",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "bounce": {
    "translation": "отказ",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "scroll": {
    "translation": "прокрутка",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "heatmap": {
    "translation": "тепловая карта",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "abtest": {
    "translation": "A/B тест",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "multivariate": {
    "translation": "многовариантный",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "test": {
    "translation": "тест",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "experiment": {
    "translation": "эксперимент",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "variant": {
    "translation": "вариант",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "control": {
    "translation": "контроль",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "winner": {
    "translation": "победитель",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "optimization": {
    "translation": "оптимизация",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "performance": {
    "translation": "эффективность",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "dashboard": {
    "translation": "панель",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "report": {
    "translation": "отчет",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "reporting": {
    "translation": "отчетность",
    "category": "Реклама и digital",
    "risk": "high"
  },
  "content": {
    "translation": "контент",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "creator": {
    "translation": "создатель",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "influencer": {
    "translation": "инфлюенсер",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "blogger": {
    "translation": "блогер",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "blog": {
    "translation": "блог",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "post": {
    "translation": "пост",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "story": {
    "translation": "история / сторис",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "stories": {
    "translation": "истории / сторис",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "reel": {
    "translation": "рилс / ролик",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "reels": {
    "translation": "рилсы / ролики",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "shorts": {
    "translation": "короткие ролики",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "video": {
    "translation": "видео",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "live": {
    "translation": "прямой эфир",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "stream": {
    "translation": "трансляция",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "channel": {
    "translation": "канал",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "feed": {
    "translation": "лента",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "comment": {
    "translation": "комментарий",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "like": {
    "translation": "лайк",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "follow": {
    "translation": "подписаться",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "follower": {
    "translation": "подписчик",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "community": {
    "translation": "сообщество",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "ugc": {
    "translation": "пользовательский контент",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "hashtag": {
    "translation": "хэштег",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "mention": {
    "translation": "упоминание",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "bio": {
    "translation": "описание профиля",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "profile": {
    "translation": "профиль",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "cover": {
    "translation": "обложка",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "thumbnail": {
    "translation": "миниатюра",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "caption": {
    "translation": "подпись",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "hook": {
    "translation": "хук / зацепка",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "teaser": {
    "translation": "тизер",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "review": {
    "translation": "отзыв",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "feedback": {
    "translation": "обратная связь",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "rating": {
    "translation": "оценка",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "score": {
    "translation": "балл",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "podcast": {
    "translation": "подкаст",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "webinar": {
    "translation": "вебинар",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "broadcast": {
    "translation": "трансляция",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "chat": {
    "translation": "чат",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "messenger": {
    "translation": "мессенджер",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "direct": {
    "translation": "директ / напрямую",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "dm": {
    "translation": "личные сообщения",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "collab": {
    "translation": "коллаборация",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "giveaway": {
    "translation": "розыгрыш",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "challenge": {
    "translation": "челлендж",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "format": {
    "translation": "формат",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "series": {
    "translation": "серия",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "episode": {
    "translation": "эпизод",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "playlist": {
    "translation": "плейлист",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "clip": {
    "translation": "клип",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "highlight": {
    "translation": "выделение / хайлайт",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "pinned": {
    "translation": "закрепленный",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "moderation": {
    "translation": "модерация",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "commenting": {
    "translation": "комментирование",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "reaction": {
    "translation": "реакция",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "sticker": {
    "translation": "стикер",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "filter": {
    "translation": "фильтр",
    "category": "Соцсети и контент",
    "risk": "high"
  },
  "shop": {
    "translation": "магазин",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "store": {
    "translation": "магазин",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "ecommerce": {
    "translation": "электронная коммерция",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "marketplace": {
    "translation": "маркетплейс",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "catalog": {
    "translation": "каталог",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "sku": {
    "translation": "товарная позиция",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "product": {
    "translation": "товар",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "item": {
    "translation": "предмет / товар",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "card": {
    "translation": "карточка",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "checkout": {
    "translation": "оформление заказа",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "cart": {
    "translation": "корзина",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "basket": {
    "translation": "корзина",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "order": {
    "translation": "заказ",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "preorder": {
    "translation": "предзаказ",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "booking": {
    "translation": "бронирование",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "reserve": {
    "translation": "зарезервировать",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "payment": {
    "translation": "оплата",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "invoice": {
    "translation": "счет",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "receipt": {
    "translation": "чек",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "shipping": {
    "translation": "доставка",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "delivery": {
    "translation": "доставка",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "pickup": {
    "translation": "самовывоз",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "warehouse": {
    "translation": "склад",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "stock": {
    "translation": "запас / наличие",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "instock": {
    "translation": "в наличии",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "outofstock": {
    "translation": "нет в наличии",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "restock": {
    "translation": "пополнение",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "supplier": {
    "translation": "поставщик",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "vendor": {
    "translation": "продавец",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "seller": {
    "translation": "продавец",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "wholesale": {
    "translation": "опт",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "retail": {
    "translation": "розница",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "franchise": {
    "translation": "франшиза",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "franchisee": {
    "translation": "франчайзи",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "franchising": {
    "translation": "франчайзинг",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "upsell": {
    "translation": "допродажа",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "crosssell": {
    "translation": "перекрестная продажа",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "addon": {
    "translation": "дополнение",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "warranty": {
    "translation": "гарантия",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "return": {
    "translation": "возврат",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "refund": {
    "translation": "возврат денег",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "exchange": {
    "translation": "обмен",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "support": {
    "translation": "поддержка",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "service": {
    "translation": "сервис / услуга",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "request": {
    "translation": "запрос",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "ticket": {
    "translation": "тикет / обращение",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "helpdesk": {
    "translation": "служба поддержки",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "operator": {
    "translation": "оператор",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "manager": {
    "translation": "менеджер",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "consultant": {
    "translation": "консультант",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "expert": {
    "translation": "эксперт",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "partner": {
    "translation": "партнер",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "reseller": {
    "translation": "реселлер",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "distributor": {
    "translation": "дистрибьютор",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "affiliate": {
    "translation": "партнер",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "referral": {
    "translation": "реферальный",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "commission": {
    "translation": "комиссия",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "margin": {
    "translation": "маржа",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "profit": {
    "translation": "прибыль",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "revenue": {
    "translation": "выручка",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "gmv": {
    "translation": "общий оборот",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "average": {
    "translation": "средний",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "averagecheck": {
    "translation": "средний чек",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "repeat": {
    "translation": "повторный",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "repurchase": {
    "translation": "повторная покупка",
    "category": "Продажи и ecommerce",
    "risk": "high"
  },
  "feature": {
    "translation": "функция",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "benefit": {
    "translation": "преимущество",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "solution": {
    "translation": "решение",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "problem": {
    "translation": "проблема",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "pain": {
    "translation": "боль клиента",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "need": {
    "translation": "потребность",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "desire": {
    "translation": "желание",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "ux": {
    "translation": "пользовательский опыт",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "ui": {
    "translation": "интерфейс",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "design": {
    "translation": "дизайн",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "layout": {
    "translation": "макет",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "prototype": {
    "translation": "прототип",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "wireframe": {
    "translation": "каркас интерфейса",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "mockup": {
    "translation": "макет",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "interface": {
    "translation": "интерфейс",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "usability": {
    "translation": "удобство использования",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "onboarding": {
    "translation": "введение",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "flow": {
    "translation": "сценарий",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "journey": {
    "translation": "путь пользователя",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "map": {
    "translation": "карта",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "friction": {
    "translation": "трение / препятствие",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "signup": {
    "translation": "регистрация",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "signin": {
    "translation": "вход",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "login": {
    "translation": "вход",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "logout": {
    "translation": "выход",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "account": {
    "translation": "аккаунт",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "settings": {
    "translation": "настройки",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "plan": {
    "translation": "тариф / план",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "demo": {
    "translation": "демо",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "preview": {
    "translation": "предпросмотр",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "beta": {
    "translation": "бета-версия",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "alpha": {
    "translation": "альфа-версия",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "update": {
    "translation": "обновление",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "upgrade": {
    "translation": "улучшение / обновление",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "downgrade": {
    "translation": "понижение",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "survey": {
    "translation": "опрос",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "interview": {
    "translation": "интервью",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "consent": {
    "translation": "согласие",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "privacy": {
    "translation": "конфиденциальность",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "policy": {
    "translation": "политика",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "terms": {
    "translation": "условия",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "security": {
    "translation": "безопасность",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "trust": {
    "translation": "доверие",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "proof": {
    "translation": "доказательство",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "guarantee": {
    "translation": "гарантия",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "testimonial": {
    "translation": "отзыв",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "case": {
    "translation": "кейс",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "portfolio": {
    "translation": "портфолио",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "showcase": {
    "translation": "витрина / демонстрация",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "freebie": {
    "translation": "бесплатный бонус",
    "category": "Продукт и UX",
    "risk": "high"
  },
  "beauty": {
    "translation": "красота",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "fashion": {
    "translation": "мода",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "style": {
    "translation": "стиль",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "look": {
    "translation": "образ",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "outfit": {
    "translation": "комплект одежды",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "collection": {
    "translation": "коллекция",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "showroom": {
    "translation": "шоурум",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "boutique": {
    "translation": "бутик",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "makeup": {
    "translation": "макияж",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "skincare": {
    "translation": "уход за кожей",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "hair": {
    "translation": "волосы",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "hairstyle": {
    "translation": "прическа",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "nails": {
    "translation": "ногти",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "barber": {
    "translation": "барбер / парикмахер",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "spa": {
    "translation": "спа",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "wellness": {
    "translation": "велнес / забота о здоровье",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "fitness": {
    "translation": "фитнес",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "yoga": {
    "translation": "йога",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "sport": {
    "translation": "спорт",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "lounge": {
    "translation": "лаунж",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "relax": {
    "translation": "расслабление",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "comfort": {
    "translation": "комфорт",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "home": {
    "translation": "дом",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "decor": {
    "translation": "декор",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "interior": {
    "translation": "интерьер",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "kids": {
    "translation": "детский",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "baby": {
    "translation": "для малышей",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "women": {
    "translation": "женский",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "men": {
    "translation": "мужской",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "unisex": {
    "translation": "унисекс",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "casual": {
    "translation": "повседневный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "original": {
    "translation": "оригинальный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "natural": {
    "translation": "натуральный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "organic": {
    "translation": "органический",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "eco": {
    "translation": "эко",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "clean": {
    "translation": "чистый",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "deluxe": {
    "translation": "делюкс",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "signature": {
    "translation": "фирменный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "artisan": {
    "translation": "ремесленный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "handmade": {
    "translation": "ручная работа",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "custom": {
    "translation": "индивидуальный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "tailored": {
    "translation": "персонализированный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "personal": {
    "translation": "личный",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "studio": {
    "translation": "студия",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "master": {
    "translation": "мастер",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "atelier": {
    "translation": "ателье",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "event": {
    "translation": "событие",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "party": {
    "translation": "вечеринка",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "brunch": {
    "translation": "бранч",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "coffee": {
    "translation": "кофе",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "dessert": {
    "translation": "десерт",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "menu": {
    "translation": "меню",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "chef": {
    "translation": "шеф",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "food": {
    "translation": "еда",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "burger": {
    "translation": "бургер",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "high"
  },
  "online": {
    "translation": "онлайн",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "offline": {
    "translation": "офлайн",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "digital": {
    "translation": "цифровой",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "smart": {
    "translation": "умный",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "tech": {
    "translation": "технологии",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "startup": {
    "translation": "стартап",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "saas": {
    "translation": "облачный сервис по подписке",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "platform": {
    "translation": "платформа",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "cloud": {
    "translation": "облако",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "integration": {
    "translation": "интеграция",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "api": {
    "translation": "интерфейс программирования",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "bot": {
    "translation": "бот",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "chatbot": {
    "translation": "чат-бот",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "assistant": {
    "translation": "ассистент",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "plugin": {
    "translation": "плагин",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "extension": {
    "translation": "расширение",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "tool": {
    "translation": "инструмент",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "generator": {
    "translation": "генератор",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "scanner": {
    "translation": "сканер",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "checker": {
    "translation": "проверка / инструмент проверки",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "status": {
    "translation": "статус",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "monitoring": {
    "translation": "мониторинг",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "server": {
    "translation": "сервер",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "hosting": {
    "translation": "хостинг",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "domain": {
    "translation": "домен",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "ssl": {
    "translation": "сертификат безопасности",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "backup": {
    "translation": "резервная копия",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "sync": {
    "translation": "синхронизация",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "storage": {
    "translation": "хранилище",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "database": {
    "translation": "база данных",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "appstore": {
    "translation": "магазин приложений",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "android": {
    "translation": "андроид",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "iphone": {
    "translation": "айфон",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "ios": {
    "translation": "айос",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "laptop": {
    "translation": "ноутбук",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "smartphone": {
    "translation": "смартфон",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "device": {
    "translation": "устройство",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "gadget": {
    "translation": "гаджет",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "screen": {
    "translation": "экран",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "speed": {
    "translation": "скорость",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "fast": {
    "translation": "быстрый",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "instant": {
    "translation": "мгновенный",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "express": {
    "translation": "экспресс / быстрый",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "pro": {
    "translation": "про / профессиональный",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "max": {
    "translation": "макс / максимум",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "mini": {
    "translation": "мини",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "plus": {
    "translation": "плюс",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "lite": {
    "translation": "облегченный",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "basic": {
    "translation": "базовый",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "advanced": {
    "translation": "расширенный",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "enterprise": {
    "translation": "корпоративный",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "team": {
    "translation": "команда",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "office": {
    "translation": "офис",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "director": {
    "translation": "директор",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "owner": {
    "translation": "владелец",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "founder": {
    "translation": "основатель",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "meeting": {
    "translation": "встреча",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "call": {
    "translation": "звонок",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "consulting": {
    "translation": "консалтинг",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "network": {
    "translation": "сеть",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "pitch": {
    "translation": "презентация / питч",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "deck": {
    "translation": "презентация",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "summary": {
    "translation": "краткое содержание",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "overview": {
    "translation": "обзор",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "focus": {
    "translation": "фокус",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "priority": {
    "translation": "приоритет",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "pipeline": {
    "translation": "воронка / пайплайн",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "insights": {
    "translation": "инсайты",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "forecast": {
    "translation": "прогноз",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "planning": {
    "translation": "планирование",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "workshop": {
    "translation": "воркшоп",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "sprint": {
    "translation": "спринт",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "task": {
    "translation": "задача",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "deadline": {
    "translation": "срок",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "teamlead": {
    "translation": "тимлид",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "growthhack": {
    "translation": "прием роста",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "framework": {
    "translation": "подход / рамка",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "northstar": {
    "translation": "главная метрика",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "baseline": {
    "translation": "базовый уровень",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "uplift": {
    "translation": "прирост",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "incremental": {
    "translation": "дополнительный",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "cohort": {
    "translation": "когорта",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "churn": {
    "translation": "отток",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "activation": {
    "translation": "активация",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "stickiness": {
    "translation": "привычность использования",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "monetization": {
    "translation": "монетизация",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "paywall": {
    "translation": "платный доступ",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "attribution": {
    "translation": "атрибуция",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "incrementality": {
    "translation": "инкрементальность",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "affinity": {
    "translation": "предпочтение",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "brandlift": {
    "translation": "рост узнаваемости",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "whitespace": {
    "translation": "свободная зона рынка",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "playbook": {
    "translation": "инструкция / playbook",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "slogan": {
    "translation": "слоган",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "tagline": {
    "translation": "слоган",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "naming": {
    "translation": "нейминг",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "localization": {
    "translation": "локализация",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "global": {
    "translation": "глобальный",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "regional": {
    "translation": "региональный",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "seasonal": {
    "translation": "сезонный",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "sticky": {
    "translation": "привязанный / удерживающий",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "briefing": {
    "translation": "брифинг",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "kickoff": {
    "translation": "стартовая встреча",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "recap": {
    "translation": "итоги",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "syncup": {
    "translation": "сверка",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "brainstorm": {
    "translation": "мозговой штурм",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "audit": {
    "translation": "аудит",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "trackingplan": {
    "translation": "план трекинга",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "play": {
    "translation": "подход / сценарий",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "marginmix": {
    "translation": "структура маржи",
    "category": "Маркетинг и стратегия",
    "risk": "medium"
  },
  "subscribers": {
    "translation": "подписчики",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "followers": {
    "translation": "подписчики",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "creatorhub": {
    "translation": "центр авторов",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "mediakit": {
    "translation": "медиакит",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "branddeal": {
    "translation": "рекламная интеграция",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "partnership": {
    "translation": "партнерство",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "shooting": {
    "translation": "съемка",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "editing": {
    "translation": "монтаж",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "montage": {
    "translation": "монтаж",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "scripted": {
    "translation": "по сценарию",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "voiceover": {
    "translation": "закадровый голос",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "coverstory": {
    "translation": "главная история",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "livestream": {
    "translation": "прямой эфир",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "socialproof": {
    "translation": "социальное доказательство",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "communitymanager": {
    "translation": "комьюнити-менеджер",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "moderator": {
    "translation": "модератор",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "engagementrate": {
    "translation": "уровень вовлеченности",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "reachout": {
    "translation": "контакт / аутрич",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "collaboration": {
    "translation": "сотрудничество",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "viralclip": {
    "translation": "вирусный ролик",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "contentplan": {
    "translation": "контент-план",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "contentmaker": {
    "translation": "создатель контента",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "editor": {
    "translation": "редактор",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "producer": {
    "translation": "продюсер",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "ugccreator": {
    "translation": "создатель UGC",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "videographer": {
    "translation": "видеограф",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "photographer": {
    "translation": "фотограф",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "scriptwriter": {
    "translation": "сценарист",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "captionwriter": {
    "translation": "автор подписей",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "contentstudio": {
    "translation": "контент-студия",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "posting": {
    "translation": "публикация",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "seeding": {
    "translation": "посев",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "crosspost": {
    "translation": "кросспостинг",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "duet": {
    "translation": "дуэт",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "remix": {
    "translation": "ремикс",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "behindthescenes": {
    "translation": "закулисье",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "soundtrack": {
    "translation": "звуковая дорожка",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "soundtrend": {
    "translation": "трендовый звук",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "thumbnailtest": {
    "translation": "тест обложек",
    "category": "Соцсети и контент",
    "risk": "medium"
  },
  "marketplacecard": {
    "translation": "карточка товара",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "productcard": {
    "translation": "карточка товара",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "size": {
    "translation": "размер",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "color": {
    "translation": "цвет",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "sellercenter": {
    "translation": "кабинет продавца",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "shipment": {
    "translation": "отгрузка",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "fulfillment": {
    "translation": "исполнение заказа",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "packaging": {
    "translation": "упаковка",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "label": {
    "translation": "этикетка",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "catalogue": {
    "translation": "каталог",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "merchant": {
    "translation": "торговец",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "buyback": {
    "translation": "обратный выкуп",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "returnrate": {
    "translation": "доля возвратов",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "sellout": {
    "translation": "продажи конечному покупателю",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "sellin": {
    "translation": "поставка в канал",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "orderform": {
    "translation": "форма заказа",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "reservation": {
    "translation": "бронирование",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "waitlist": {
    "translation": "лист ожидания",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "bookingform": {
    "translation": "форма бронирования",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "upsale": {
    "translation": "допродажа",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "crosssale": {
    "translation": "перекрестная продажа",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "merch": {
    "translation": "мерч",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "merchandise": {
    "translation": "товары / мерч",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "giftbox": {
    "translation": "подарочный набор",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "restockalert": {
    "translation": "уведомление о наличии",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "fastcheckout": {
    "translation": "быстрое оформление",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "skuunit": {
    "translation": "товарная единица",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "conversioncheckout": {
    "translation": "конверсия в оплату",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "abandonedcart": {
    "translation": "брошенная корзина",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "reorder": {
    "translation": "повторный заказ",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "onetime": {
    "translation": "разовый",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "subscriptionbox": {
    "translation": "подписной набор",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "packshot": {
    "translation": "предметная съемка",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "productpage": {
    "translation": "страница товара",
    "category": "Продажи и ecommerce",
    "risk": "medium"
  },
  "adset": {
    "translation": "набор объявлений",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "adgroup": {
    "translation": "группа объявлений",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "creativehub": {
    "translation": "центр креативов",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "subheadline": {
    "translation": "подзаголовок",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "visual": {
    "translation": "визуал",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "render": {
    "translation": "рендер",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "bannerpack": {
    "translation": "пакет баннеров",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "gif": {
    "translation": "гифка",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "carousel": {
    "translation": "карусель",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "fullscreen": {
    "translation": "полноэкранный",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "preload": {
    "translation": "предзагрузка",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "redirect": {
    "translation": "перенаправление",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "atc": {
    "translation": "добавление в корзину",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "leadform": {
    "translation": "лид-форма",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "firstparty": {
    "translation": "собственные данные",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "cookie": {
    "translation": "cookie",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "server2server": {
    "translation": "серверная передача",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "eventmatch": {
    "translation": "сопоставление событий",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "lookalike": {
    "translation": "похожая аудитория",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "broad": {
    "translation": "широкая аудитория",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "remarket": {
    "translation": "ремаркетинг",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "viewthrough": {
    "translation": "просмотр без клика",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "clickthrough": {
    "translation": "клик-переход",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "engagementcampaign": {
    "translation": "кампания на вовлечение",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "trafficcampaign": {
    "translation": "кампания на трафик",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "conversionscampaign": {
    "translation": "кампания на конверсии",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "leadcampaign": {
    "translation": "кампания на лиды",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "reachcampaign": {
    "translation": "кампания на охват",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "awarenesscampaign": {
    "translation": "кампания на узнаваемость",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "creativepack": {
    "translation": "пакет креативов",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "storyboard": {
    "translation": "раскадровка",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "adcopy": {
    "translation": "рекламный текст",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "conceptboard": {
    "translation": "доска концептов",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "brandformance": {
    "translation": "бренд+перфоманс",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "adserver": {
    "translation": "рекламный сервер",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "utmtag": {
    "translation": "UTM-метка",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "deep link": {
    "translation": "глубокая ссылка",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "deeplink": {
    "translation": "глубокая ссылка",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "eventcode": {
    "translation": "код события",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "trackinglink": {
    "translation": "трек-ссылка",
    "category": "Реклама и digital",
    "risk": "medium"
  },
  "workspace": {
    "translation": "рабочее пространство",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "notebook": {
    "translation": "блокнот / ноутбук",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "featureflag": {
    "translation": "переключатель функции",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "realtime": {
    "translation": "в реальном времени",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "uptime": {
    "translation": "доступность",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "latency": {
    "translation": "задержка",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "frontend": {
    "translation": "фронтенд",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "backend": {
    "translation": "бэкенд",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "fullstack": {
    "translation": "фулстек",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "deploy": {
    "translation": "развертывание",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "build": {
    "translation": "сборка",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "version": {
    "translation": "версия",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "signinpage": {
    "translation": "страница входа",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "signupform": {
    "translation": "форма регистрации",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "search": {
    "translation": "поиск",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "upload": {
    "translation": "загрузка",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "download": {
    "translation": "скачивание",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "export": {
    "translation": "экспорт",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "import": {
    "translation": "импорт",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "validator": {
    "translation": "валидатор",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "monitor": {
    "translation": "монитор",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "tracker": {
    "translation": "трекер",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "autofill": {
    "translation": "автозаполнение",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "copypaste": {
    "translation": "копировать-вставить",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "workspacehub": {
    "translation": "центр рабочего пространства",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "quickstart": {
    "translation": "быстрый старт",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "setup": {
    "translation": "настройка",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "wizard": {
    "translation": "мастер настройки",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "autosave": {
    "translation": "автосохранение",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "multiuser": {
    "translation": "многопользовательский",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "shared": {
    "translation": "общий",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "admin": {
    "translation": "администратор",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "owneraccess": {
    "translation": "доступ владельца",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "workspaceinvite": {
    "translation": "приглашение в рабочее пространство",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "securitycheck": {
    "translation": "проверка безопасности",
    "category": "Технологии и сервис",
    "risk": "medium"
  },
  "beautybox": {
    "translation": "бьюти-бокс",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "giftset": {
    "translation": "подарочный набор",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "hairtreatment": {
    "translation": "уход для волос",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "skinroutine": {
    "translation": "уходовая рутина",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "spaweekend": {
    "translation": "спа-выходные",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "softtouch": {
    "translation": "мягкое прикосновение",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "signaturelook": {
    "translation": "фирменный образ",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "glow": {
    "translation": "сияние",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "glowup": {
    "translation": "преображение",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "refresh": {
    "translation": "обновление",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "selfcare": {
    "translation": "забота о себе",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "bodycare": {
    "translation": "уход за телом",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "facecare": {
    "translation": "уход за лицом",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "mustwear": {
    "translation": "то, что стоит носить",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "dresscode": {
    "translation": "дресс-код",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "lookbook": {
    "translation": "лукбук",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "wishlist": {
    "translation": "список желаний",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "beautycorner": {
    "translation": "уголок красоты",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "showcasewindow": {
    "translation": "витрина",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  },
  "fashiondrop": {
    "translation": "дроп одежды",
    "category": "Бьюти, мода, лайфстайл",
    "risk": "medium"
  }
};

const PHRASES = {
  "best price": {
    "translation": "лучшая цена",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "hot price": {
    "translation": "выгодная цена",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "special offer": {
    "translation": "специальное предложение",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "limited edition": {
    "translation": "ограниченная серия",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "new collection": {
    "translation": "новая коллекция",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "buy now": {
    "translation": "купить сейчас",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "shop now": {
    "translation": "перейти к покупке",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "new arrival": {
    "translation": "новое поступление",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "must have": {
    "translation": "стоит приобрести",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "top choice": {
    "translation": "лучший выбор",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "summer sale": {
    "translation": "летняя распродажа",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "winter sale": {
    "translation": "зимняя распродажа",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "black friday": {
    "translation": "черная пятница",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "flash sale": {
    "translation": "мгновенная распродажа",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "free gift": {
    "translation": "бесплатный подарок",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "gift card": {
    "translation": "подарочная карта",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "member price": {
    "translation": "цена для участников",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "special price": {
    "translation": "специальная цена",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "limited offer": {
    "translation": "ограниченное предложение",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "today only": {
    "translation": "только сегодня",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "last chance": {
    "translation": "последний шанс",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "best deal": {
    "translation": "лучшее предложение",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "mega sale": {
    "translation": "большая распродажа",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "sale price": {
    "translation": "цена со скидкой",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "bundle offer": {
    "translation": "предложение набором",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "exclusive offer": {
    "translation": "эксклюзивное предложение",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "save more": {
    "translation": "сэкономьте больше",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "free sample": {
    "translation": "бесплатный образец",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "loyalty bonus": {
    "translation": "бонус за лояльность",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "cash back": {
    "translation": "возврат части оплаты",
    "category": "Скидки и акции",
    "risk": "high"
  },
  "coffee to go": {
    "translation": "кофе с собой",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "food delivery": {
    "translation": "доставка еды",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "free delivery": {
    "translation": "бесплатная доставка",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "free shipping": {
    "translation": "бесплатная доставка",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "order online": {
    "translation": "заказать онлайн",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "fast delivery": {
    "translation": "быстрая доставка",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "open kitchen": {
    "translation": "открытая кухня",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "chef special": {
    "translation": "специальное блюдо от шефа",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "delivery service": {
    "translation": "служба доставки",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "fresh menu": {
    "translation": "свежее меню",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "family combo": {
    "translation": "семейный набор",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "take away": {
    "translation": "с собой",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "ready to eat": {
    "translation": "готово к употреблению",
    "category": "Еда и доставка",
    "risk": "high"
  },
  "beauty studio": {
    "translation": "студия красоты",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "fashion store": {
    "translation": "магазин одежды",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "beauty care": {
    "translation": "уход за красотой",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "skin care": {
    "translation": "уход за кожей",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "hair care": {
    "translation": "уход за волосами",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "nail studio": {
    "translation": "маникюрная студия",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "total look": {
    "translation": "полный образ",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "new look": {
    "translation": "новый образ",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "personal style": {
    "translation": "личный стиль",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "premium care": {
    "translation": "премиальный уход",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "spa day": {
    "translation": "день спа",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "beauty routine": {
    "translation": "бьюти-уход",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "signature look": {
    "translation": "фирменный образ",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "self care": {
    "translation": "забота о себе",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "gift set": {
    "translation": "подарочный набор",
    "category": "Красота и лайфстайл",
    "risk": "high"
  },
  "follow us": {
    "translation": "подписывайтесь на нас",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "link in bio": {
    "translation": "ссылка в профиле",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "swipe up": {
    "translation": "смахните вверх",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "direct message": {
    "translation": "личное сообщение",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "social proof": {
    "translation": "социальное доказательство",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "user generated content": {
    "translation": "пользовательский контент",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "content plan": {
    "translation": "контент-план",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "live stream": {
    "translation": "прямая трансляция",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "join now": {
    "translation": "присоединяйтесь сейчас",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "subscribe now": {
    "translation": "подпишитесь сейчас",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "watch now": {
    "translation": "смотрите сейчас",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "learn more": {
    "translation": "узнать больше",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "sign up": {
    "translation": "зарегистрироваться",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "log in": {
    "translation": "войти",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "call to action": {
    "translation": "призыв к действию",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "click here": {
    "translation": "нажмите здесь",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "shop online": {
    "translation": "покупать онлайн",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "online booking": {
    "translation": "онлайн-бронирование",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "customer review": {
    "translation": "отзыв клиента",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "brand story": {
    "translation": "история бренда",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "special campaign": {
    "translation": "специальная кампания",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "follow for more": {
    "translation": "подписывайтесь, чтобы увидеть больше",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "save this post": {
    "translation": "сохраните этот пост",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "send us a dm": {
    "translation": "напишите нам в личные сообщения",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "watch full video": {
    "translation": "смотрите полное видео",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "link below": {
    "translation": "ссылка ниже",
    "category": "Digital и соцсети",
    "risk": "high"
  },
  "brand awareness": {
    "translation": "узнаваемость бренда",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "marketing strategy": {
    "translation": "маркетинговая стратегия",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "conversion rate": {
    "translation": "коэффициент конверсии",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "customer journey": {
    "translation": "путь клиента",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "target audience": {
    "translation": "целевая аудитория",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "landing page": {
    "translation": "посадочная страница",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "sales funnel": {
    "translation": "воронка продаж",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "email marketing": {
    "translation": "email-маркетинг",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "lead generation": {
    "translation": "генерация лидов",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "performance marketing": {
    "translation": "маркетинг эффективности",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "digital campaign": {
    "translation": "digital-кампания",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "growth strategy": {
    "translation": "стратегия роста",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "customer support": {
    "translation": "поддержка клиентов",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "business solution": {
    "translation": "бизнес-решение",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "free consultation": {
    "translation": "бесплатная консультация",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "book now": {
    "translation": "забронировать сейчас",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "online service": {
    "translation": "онлайн-сервис",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "customer care": {
    "translation": "забота о клиентах",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "special event": {
    "translation": "специальное событие",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "brand new": {
    "translation": "совершенно новый",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "free trial": {
    "translation": "бесплатный пробный период",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "product launch": {
    "translation": "запуск продукта",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "case study": {
    "translation": "разбор кейса",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "customer success": {
    "translation": "успех клиента",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "social media": {
    "translation": "социальные сети",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "special project": {
    "translation": "специальный проект",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  },
  "business growth": {
    "translation": "рост бизнеса",
    "category": "Маркетинг и бизнес",
    "risk": "high"
  }
};

function normalizeWord(word) {
  return String(word || "")
    .toLowerCase()
    .replace(/[^a-z0-9+&'\-]/g, "");
}

function readReports() {
  try {
    return JSON.parse(fs.readFileSync(REPORTS_FILE, "utf-8"));
  } catch (error) {
    return [];
  }
}

function writeReports(reports) {
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), "utf-8");
}

function getRiskLabel(score) {
  if (score >= 18) return "Высокий";
  if (score >= 7) return "Средний";
  return "Низкий";
}

function analyzeText(inputText) {
  const text = String(inputText || "").trim();
  const lower = text.toLowerCase();

  const phraseMatches = [];
  for (const [phrase, info] of Object.entries(PHRASES)) {
    if (lower.includes(phrase)) {
      phraseMatches.push({
        type: "phrase",
        original: phrase,
        translation: info.translation,
        category: info.category,
        risk: info.risk || "high",
        description: "Обнаружена популярная англоязычная фраза в рекламе."
      });
    }
  }

  const rawWords = lower.match(/[a-z][a-z0-9+&'\-]*/g) || [];
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const counts = {};
  rawWords.forEach((word) => {
    counts[word] = (counts[word] || 0) + 1;
  });

  const uniqueWords = [...new Set(rawWords)];
  const wordMatches = uniqueWords.map((word) => {
    const normalized = normalizeWord(word);
    const known = DICTIONARY[normalized];

    if (known) {
      return {
        type: "word",
        original: word,
        translation: known.translation,
        category: known.category,
        risk: known.risk || "high",
        description: "Слово найдено в словаре маркетинговых и рекламных терминов.",
        count: counts[word] || 1
      };
    }

    return {
      type: "word",
      original: word,
      translation: "Проверьте контекст и замените русским аналогом",
      category: "Неизвестное слово на латинице",
      risk: word.length <= 3 ? "low" : "medium",
      description: "Слово написано латиницей и отсутствует в словаре. Его стоит проверить вручную.",
      count: counts[word] || 1
    };
  });

  const allMatches = [...phraseMatches, ...wordMatches];
  const deduped = new Map();
  allMatches.forEach((item) => {
    deduped.set(`${item.type}:${item.original.toLowerCase()}`, item);
  });

  const matches = [...deduped.values()];

  const score = matches.reduce((sum, item) => {
    if (item.risk === "high") return sum + 3;
    if (item.risk === "medium") return sum + 2;
    return sum + 1;
  }, 0);

  const riskLabel = getRiskLabel(score);

  const highlightedText = text.replace(/[A-Za-z][A-Za-z0-9+&'\-]*/g, (token) => {
    const normalized = normalizeWord(token);
    const known = DICTIONARY[normalized];
    const cls = known ? "mark-known" : "mark-unknown";
    return `<mark class="${cls}">${token}</mark>`;
  });

  const topCategoriesMap = {};
  matches.forEach((item) => {
    topCategoriesMap[item.category] = (topCategoriesMap[item.category] || 0) + 1;
  });

  const topCategories = Object.entries(topCategoriesMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([category, count]) => ({ category, count }));

  return {
    text,
    highlightedText,
    checkedAt: new Date().toISOString(),
    riskLabel,
    score,
    totalMatches: matches.length,
    phraseMatches: phraseMatches.length,
    wordCount,
    matches,
    topCategories
  };
}

app.post("/api/check", (req, res) => {
  const title = String(req.body.title || "").trim() || "Проверка без названия";
  const text = String(req.body.text || "");

  if (!text.trim()) {
    return res.status(400).json({ error: "Введите текст для проверки" });
  }

  const result = analyzeText(text);
  const reports = readReports();

  const report = {
    id: Date.now(),
    title,
    ...result
  };

  reports.unshift(report);
  writeReports(reports.slice(0, 100));

  res.json(report);
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не выбран" });
    }

    const ext = path.extname(req.file.originalname || "").toLowerCase();
    if (ext !== ".txt") {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Поддерживаются только TXT-файлы" });
    }

    const text = fs.readFileSync(req.file.path, "utf-8");
    const result = analyzeText(text);
    const reports = readReports();

    const report = {
      id: Date.now(),
      title: req.file.originalname || "TXT-файл",
      ...result
    };

    reports.unshift(report);
    writeReports(reports.slice(0, 100));

    fs.unlinkSync(req.file.path);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Не удалось обработать файл" });
  }
});

app.get("/api/reports", (req, res) => {
  res.json(readReports().slice(0, 15));
});

app.get("/api/stats", (req, res) => {
  const reports = readReports();
  const stats = {
    totalReports: reports.length,
    highRisk: reports.filter((report) => report.riskLabel === "Высокий").length,
    mediumRisk: reports.filter((report) => report.riskLabel === "Средний").length,
    lowRisk: reports.filter((report) => report.riskLabel === "Низкий").length,
    topWords: [],
    topCategories: []
  };

  const wordMap = {};
  const categoryMap = {};

  reports.forEach((report) => {
    (report.matches || []).forEach((match) => {
      wordMap[match.original.toLowerCase()] = (wordMap[match.original.toLowerCase()] || 0) + 1;
      categoryMap[match.category] = (categoryMap[match.category] || 0) + 1;
    });
  });

  stats.topWords = Object.entries(wordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([word, count]) => ({ word, count }));

  stats.topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([category, count]) => ({ category, count }));

  res.json(stats);
});

app.get("/api/dictionary", (req, res) => {
  const words = Object.entries(DICTIONARY)
    .map(([word, info]) => ({
      word,
      translation: info.translation,
      category: info.category,
      risk: info.risk || "high"
    }))
    .sort((a, b) => a.word.localeCompare(b.word));

  const phrases = Object.entries(PHRASES)
    .map(([phrase, info]) => ({
      phrase,
      translation: info.translation,
      category: info.category,
      risk: info.risk || "high"
    }))
    .sort((a, b) => a.phrase.localeCompare(b.phrase));

  res.json({
    wordsCount: words.length,
    phrasesCount: phrases.length,
    words,
    phrases
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});