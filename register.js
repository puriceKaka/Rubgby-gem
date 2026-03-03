(function () {
  const form = document.getElementById("registerForm");
  const usernameInput = document.getElementById("username");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("regPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsInput = document.getElementById("terms");
  const viewTermsBtn = document.getElementById("viewTermsBtn");
  const termsModal = document.getElementById("termsModal");
  const closeTermsBtn = document.getElementById("closeTermsBtn");
  const message = document.getElementById("registerMessage");

  function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
  }

  function openTermsModal() {
    if (!termsModal) {
      return;
    }
    termsModal.classList.add("visible");
    termsModal.setAttribute("aria-hidden", "false");
  }

  function closeTermsModal() {
    if (!termsModal) {
      return;
    }
    termsModal.classList.remove("visible");
    termsModal.setAttribute("aria-hidden", "true");
  }

  if (viewTermsBtn) {
    viewTermsBtn.addEventListener("click", openTermsModal);
  }

  if (closeTermsBtn) {
    closeTermsBtn.addEventListener("click", closeTermsModal);
  }

  if (termsModal) {
    termsModal.addEventListener("click", function (event) {
      if (event.target === termsModal) {
        closeTermsModal();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeTermsModal();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim().toLowerCase();
    const phone = phoneInput.value.trim().replace(/\s+/g, "");
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!username || !phone || !password || !confirmPassword) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    if (username.length < 3) {
      showMessage("Username must be at least 3 characters.", "error");
      return;
    }

    if (!/^\+?\d{10,15}$/.test(phone)) {
      showMessage("Enter a valid phone number (10 to 15 digits).", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    if (!termsInput.checked) {
      showMessage("You must agree to the terms.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("rugbyGemUsers") || "[]");
    const exists = users.some(function (user) {
      const storedUsername = (user.username || user.fullName || user.email || "").trim().toLowerCase();
      return storedUsername === username || user.phone === phone;
    });

    if (exists) {
      showMessage("That username or phone is already registered. Please log in.", "error");
      return;
    }

    users.push({
      username: username,
      fullName: username,
      phone: phone,
      password: password,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem("rugbyGemUsers", JSON.stringify(users));
    showMessage("Registration complete. Redirecting to login...", "success");
    form.reset();

    setTimeout(function () {
      window.location.href = "login.html";
    }, 1200);
  });
})();
