function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const msg = document.getElementById("msg");

    if (!name || !email || !password) {
        msg.innerText = "All fields are required.";
        msg.className = "msg error";
        return;
    }

    if (password.length < 6) {
        msg.innerText = "Password must be at least 6 characters.";
        msg.className = "msg error";
        return;
    }

    apiRegister(name, email, password)
        .then(() => {
            msg.innerText = "Account created! Redirecting to login...";
            msg.className = "msg success";
            setTimeout(() => window.location.href = "login.html", 1500);
        })
        .catch(err => {
            msg.innerText = "Error: " + err.message;
            msg.className = "msg error";
        });
}