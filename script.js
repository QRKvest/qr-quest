
let foundQRs = JSON.parse(localStorage.getItem("foundQRs")) || [];

let language = localStorage.getItem("language") || "et";

const params = new URLSearchParams(window.location.search);


// 🔄 Сброс прогресса через ?reset=1
if (params.get("reset") === "1") {
    localStorage.removeItem("foundQRs");

    window.location.href =
        window.location.pathname;

}


// 🌍 Тексты на двух языках
const texts = {
    ru: {
        title: "🔎 QR-Квест",
        description: "Найди все 8 QR-кодов по школе!",
        progress: "Прогресс",
        qr: "QR-код",
        completeTitle: "🎃 КВЕСТ ПРОЙДЕН!",
        completeText: "Ты нашёл все 8 QR-кодов!",
        completeWork: "Отличная работа 😎"
    },

    et: {
        title: "🔎 QR-KVEST",
        description: "Leia koolist kõik 8 QR-koodi!",
        progress: "Edenemine",
        qr: "QR-kood",
        completeTitle: "🎃 KVEST LÄBITUD!",
        completeText: "Leidsid kõik 8 QR-koodi!",
        completeWork: "Tubli töö 😎"
    }
};


// 🔎 Активируем QR-код
function findQR(number) {

    if (number < 1 || number > 8) {
        return;
    }

    if (foundQRs.includes(number)) {
        return;
    }

    foundQRs.push(number);

    localStorage.setItem(
        "foundQRs",
        JSON.stringify(foundQRs)
    );

    const qr = document.getElementById("qr" + number);

    if (qr) {
        qr.textContent =
            "✅ " + texts[language].qr + " " + number;
    }

    updateProgress();
}


// 📊 Обновляем прогресс
function updateProgress() {

    document.getElementById("progress").textContent =
        texts[language].progress + ": " +
        foundQRs.length + "/8";

    const complete = document.getElementById("complete");

    if (foundQRs.length === 8) {
        complete.style.display = "block";
    } else {
        complete.style.display = "none";
    }
}


// 🔓 Показываем найденные QR-коды
function showFoundQRs() {

    for (let i = 1; i <= 8; i++) {

        const qr = document.getElementById("qr" + i);

        if (!qr) {
            continue;
        }

        if (foundQRs.includes(i)) {

            qr.textContent =
                "✅ " + texts[language].qr + " " + i;

        } else {

            qr.textContent =
                "🔒 " + texts[language].qr + " " + i;

        }
    }

    updateProgress();
}


// 🌍 Применяем выбранный язык
function applyLanguage() {

    const t = texts[language];

    document.documentElement.lang =
        language === "ru" ? "ru" : "et";

    document.getElementById("title").textContent =
        t.title;

    document.getElementById("description").textContent =
        t.description;

    document.getElementById("complete-title").textContent =
        t.completeTitle;

    document.getElementById("complete-text").textContent =
        t.completeText;

    document.getElementById("complete-work").textContent =
        t.completeWork;

    showFoundQRs();
}


// 🇷🇺 Русский язык
document.getElementById("ru").onclick = function() {

    language = "ru";

    localStorage.setItem("language", language);

    applyLanguage();
};


// 🇪🇪 Эстонский язык
document.getElementById("et").onclick = function() {

    language = "et";

    localStorage.setItem("language", language);

    applyLanguage();
};


// 📱 Проверяем QR-код в ссылке
const qrNumber = Number(params.get("qr"));

if (params.has("qr") &&
    Number.isInteger(qrNumber) &&
    qrNumber >= 1 &&
    qrNumber <= 8) {

    findQR(qrNumber);
}


// 🚀 Запускаем сайт
applyLanguage();
