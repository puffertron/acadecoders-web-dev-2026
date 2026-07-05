// flag: FLAG{h7ml_c0mm3nt_1n_1ndex} lives in index.html, this comment is not it.
// keep reading, this file has its own.

(function () {
  "use strict";

  // --- 1. base64 string, decode it yourself ---
  const encoded = "RkxBR3tqc19hdG9iX2Jhc2U2NF9zdHJpbmd9";
  // console.log(atob(encoded)); // uncomment if you're lazy. we won't judge.

  // --- 2. char-code obfuscation ---
  const codes = [70, 76, 65, 71, 123, 106, 115, 95, 99, 104, 97, 114, 95, 99,
    111, 100, 101, 95, 111, 98, 102, 117, 115, 99, 97, 116, 105, 111, 110, 125];
  const revealCharCodeFlag = () => String.fromCharCode(...codes);

  // --- 3. tucked into storage, never rendered anywhere ---
  try {
    localStorage.setItem("flag_lurker", "FLAG{localstorage_lurker}");
  } catch (e) {
    /* storage might be disabled, that's fine */
  }

  // --- 4. a network request to nowhere, carrying a flag in its payload ---
  // open devtools > Network tab, reload the page, and look for a POST
  // request that goes absolutely nowhere useful.
  function ghostRequest() {
    fetch("https://ctf-nowhere.invalid/collect", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "page_view",
        flag: "FLAG{network_tab_saw_me_first}",
        ts: Date.now(),
      }),
    }).catch(() => {
      // this will always fail (the domain doesn't resolve to anything real),
      // but the request itself, headers and body included, is visible in
      // the Network tab right up until it fails.
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ghostRequest();

    // decode the data-secret attribute on #clue-box, if present
    const box = document.getElementById("clue-box");
    if (box && box.dataset.secret) {
      try {
        const decoded = atob(box.dataset.secret);
        box.setAttribute("title", "psst: " + decoded);
      } catch (e) {
        /* not valid base64, ignore */
      }
    }
  });

  // exposed on purpose, for the curious who open the console
  window.__ctf = {
    revealCharCodeFlag,
    decodeBase64: (s) => atob(s),
    encoded,
  };
})();
