// ✅ Check auth on page load — redirect to login if no token
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

function login() {
    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.text();
    })
    .then(token => {
        localStorage.setItem("token", token);
        document.getElementById("msg").innerText = "Login successful";
        window.location.href = "index.html";
    })
    .catch(err => {
        document.getElementById("msg").innerText = "Login failed: " + err.message;
    });
}

// ✅ logout is now a top-level function, not trapped inside login()
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}