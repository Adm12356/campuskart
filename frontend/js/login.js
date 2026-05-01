function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const msg = document.getElementById("msg");

    if (!email || !password) {
        msg.innerText = "All fields are required.";
        msg.className = "msg error";
        return;
    }

    apiLogin(email, password)
        .then(token => {
            localStorage.setItem("token", token);
            msg.innerText = "Login successful!";
            msg.className = "msg success";
            setTimeout(() => window.location.href = "index.html", 1000);
        })
        .catch(err => {
            msg.innerText = "Login failed: " + err.message;
            msg.className = "msg error";
        });
}