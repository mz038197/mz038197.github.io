// 中英切換：<html lang> 決定顯示 .zh 或 .en（初始語言由 <head> 內的小段程式設定）
(function () {
  "use strict";

  var META = {
    zh: {
      title: "蔡鈞涵 Vans Tsai｜程式教育老師・AI 課程講師",
      desc: "蔡鈞涵 Vans Tsai，凡思超能力程式教育創辦人。10 年以上軟體工程經驗（大立光、鈦坦科技、宏碁），提供企業 AI 認證課程、高中 AI 實驗室課程與兒童 Scratch 程式教育。"
    },
    en: {
      title: "Vans Tsai | Coding Educator & AI Course Instructor",
      desc: "Vans Tsai, founder of Vans Coding. 10+ years as a software engineer (Largan, Titansoft, Acer), now teaching AI certification courses, high-school AI labs and Scratch for kids in Taiwan."
    }
  };

  function current() {
    return document.documentElement.getAttribute("lang") === "en" ? "en" : "zh";
  }

  function apply(lang) {
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-Hant");
    document.title = META[lang].title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", META[lang].desc);
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(current());

    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = current() === "en" ? "zh" : "en";
        apply(next);
        try { localStorage.setItem("lang", next); } catch (e) { }
        try {
          var url = new URL(location.href);
          url.searchParams.set("lang", next);
          history.replaceState(null, "", url);
        } catch (e) { }
      });
    });
  });
})();
