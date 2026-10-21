(function () {
  var KEY = "financialPortalAuth";
  var page = document.body.getAttribute("data-page");

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function write(session) {
    localStorage.setItem(KEY, JSON.stringify(session));
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  var session = read();

  if (page === "login") {
    if (session && session.step === "documents") {
      location.replace("documents.html");
      return;
    }

    document.getElementById("login-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(event.currentTarget);
      var username = String(data.get("username") || "").trim();
      var password = String(data.get("password") || "");
      var error = document.getElementById("login-error");

      if (username === "omar" && password === "bridge123") {
        write({ step: "mfa", user: "omar" });
        location.href = "mfa.html";
        return;
      }

      error.hidden = false;
      error.textContent = "Those credentials are not valid.";
    });
    return;
  }

  if (page === "mfa") {
    if (!session || (session.step !== "mfa" && session.step !== "documents")) {
      location.replace("index.html");
      return;
    }
    if (session.step === "documents") {
      location.replace("documents.html");
      return;
    }

    var send = document.getElementById("send-code");
    var verify = document.getElementById("verify-form");
    var sent = document.getElementById("sent-note");
    var codeSent = false;

    function destination() {
      var picked = document.querySelector('input[name="method"]:checked');
      if (!picked) return "";
      return picked.value === "sms" ? "6177754868" : "oshoura@bridgeinvest.io";
    }

    document.querySelectorAll('input[name="method"]').forEach(function (input) {
      input.addEventListener("change", function () {
        codeSent = false;
        sent.hidden = true;
        verify.hidden = true;
        document.getElementById("code").value = "";
        document.getElementById("mfa-error").hidden = true;
      });
    });

    send.addEventListener("click", function () {
      var dest = destination();
      send.disabled = true;
      send.textContent = "Sending...";
      window.setTimeout(function () {
        codeSent = true;
        send.disabled = false;
        send.textContent = "Send code";
        sent.hidden = false;
        sent.textContent = "Code sent to " + dest + ".";
        verify.hidden = false;
        document.getElementById("code").focus();
      }, 600);
    });

    verify.addEventListener("submit", function (event) {
      event.preventDefault();
      var error = document.getElementById("mfa-error");
      if (!codeSent) {
        error.hidden = false;
        error.textContent = "Send a code first.";
        return;
      }
      var code = String(new FormData(verify).get("code") || "").trim();
      if (code === "hacker") {
        write({ step: "documents", user: "omar" });
        location.href = "documents.html";
        return;
      }
      error.hidden = false;
      error.textContent = "That code is not valid.";
    });
    return;
  }

  if (page === "documents") {
    if (!session || session.step !== "documents") {
      location.replace("index.html");
      return;
    }

    document.body.hidden = false;
    document.getElementById("sign-out").addEventListener("click", function () {
      clear();
      location.href = "index.html";
    });
  }
})();
