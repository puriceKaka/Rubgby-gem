(function () {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("loginUsername");
  const passwordInput = document.getElementById("loginPassword");
  const rememberMe = document.getElementById("rememberMe");
  const message = document.getElementById("loginMessage");

  const rememberedUsername = localStorage.getItem("rugbyGemRememberedUsername");
  if (rememberedUsername) {
    usernameInput.value = rememberedUsername;
    rememberMe.checked = true;
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!username || !password) {
      showMessage("Please enter both username and password.", "error");
      return;
    }

    if (username.length < 3) {
      showMessage("Username must be at least 3 characters.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("rugbyGemUsers") || "[]");
    const matchedUser = users.find(function (user) {
      const storedUsername = (user.username || user.fullName || user.email || "").trim().toLowerCase();
      return storedUsername === username && user.password === password;
    });

    if (!matchedUser) {
      showMessage("We could not match that username/password.", "error");
      return;
    }

    if (rememberMe.checked) {
      localStorage.setItem("rugbyGemRememberedUsername", username);
    } else {
      localStorage.removeItem("rugbyGemRememberedUsername");
    }

    localStorage.setItem("rugbyGemCurrentUser", username);
    showMessage("Login successful. Welcome back!", "success");
    setTimeout(function () {
      window.location.href = "home.html";
    }, 500);
  });
})();
