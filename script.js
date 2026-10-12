let foundQRs = JSON.parse(localStorage.getItem("foundQRs")) || [];

let language = localStorage.getItem("language") || "et";

const params = new URLSearchParams(window.location.search);


// 🔄 Сброс прогресса
if (params.get("reset") === "1") {
    localStorage.removeItem("foundQRs");
    window.location.href = window.location.origin + window.location.pathname;
}


// 🌍 Тексты
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


// 🔎 Найти QR
function findQR(number) {

    const qr = document.getElementById("qr" + number);

    if (foundQRs.includes(number)) {
        return;
    }

    foundQRs.push(number);

    localStorage.setItem(
        "foundQRs",
        JSON.stringify(foundQRs)
    );

    if (qr) {
        qr.textContent =
            "✅ " + texts[language].qr + " " + number;
    }

    updateProgress();
}


// 📊 Прогресс
function updateProgress() {

    document.getElementById("progress").textContent =
        texts[language].progress + ": " + foundQRs.length + "/5";

    if (foundQRs.length === 8) {

        document.getElementById("complete").style.display = "block";

    } else {

        document.getElementById("complete").style.display = "none";

    }
}


// 🔓 Показываем найденные QR
function showFoundQRs() {

    foundQRs.forEach(function(number) {

        const qr = document.getElementById("qr" + number);

        if (qr) {

            qr.textContent =
                "✅ " + texts[language].qr + " " + number;

        }

    });

    updateProgress();
}


// 🌍 Применяем язык
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


    for (let i = 1; i <= 8; i++) {
        const qr = document.getElementById("qr" + i);

        if (qr && !foundQRs.includes(i)) {
            qr.textContent = "🔒 " + texts[language].qr + " " + i;
        }
    }

    showFoundQRs();
}


// 🇷🇺 Русский
document.getElementById("ru").onclick = function() {

    language = "ru";

    localStorage.setItem("language", language);

    applyLanguage();
};


// 🇪🇪 Eesti
document.getElementById("et").onclick = function() {

    language = "et";

    localStorage.setItem("language", language);

    applyLanguage();
};


// 📱 Проверяем QR в ссылке
const qrNumber = Number(params.get("qr"));

if (qrNumber >= 1 && qrNumber <= 5) {

    findQR(qrNumber);

}


// 🚀 Запускаем язык
applyLanguage();