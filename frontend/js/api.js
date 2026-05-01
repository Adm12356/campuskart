const BASE_URL = "http://localhost:8080";

// ─── Token Helpers ───────────────────────────────────────────
function getToken() {
    return localStorage.getItem("token");
}

function isLoggedIn() {
    return !!getToken();
}

function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

function getLoggedInUser() {
    const token = getToken();
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub; // email
    } catch (e) {
        return null;
    }
}

// ─── Auth Headers ────────────────────────────────────────────
function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    };
}

function publicHeaders() {
    return {
        "Content-Type": "application/json"
    };
}

// ─── Auth API ────────────────────────────────────────────────
function apiRegister(name, email, password) {
    return fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: publicHeaders(),
        body: JSON.stringify({ name, email, password })
    }).then(res => {
        if (!res.ok) throw new Error("Registration failed");
        return res.text();
    });
}

function apiLogin(email, password) {
    return fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: publicHeaders(),
        body: JSON.stringify({ email, password })
    }).then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.text(); // returns JWT token
    });
}

// ─── Product API ─────────────────────────────────────────────
function apiGetAllProducts() {
    return fetch(`${BASE_URL}/api/products`, {
        headers: authHeaders()
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    });
}
function apiGetMyProducts() {
    return fetch(`${BASE_URL}/api/products/my`, {
        headers: authHeaders()
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch your listings");
        return res.json();
    });
}

function apiGetByCategory(category) {
    return fetch(`${BASE_URL}/api/products/category/${category}`, {
        headers: authHeaders()
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch by category");
        return res.json();
    });
}

function apiGetByLocation(location) {
    return fetch(`${BASE_URL}/api/products/location/${location}`, {
        headers: authHeaders()
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch by location");
        return res.json();
    });
}

function apiAddProduct(title, description, price, location, category) {
    return fetch(`${BASE_URL}/api/products`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ title, description, price, location, category })
    }).then(res => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
    });
}
function apiDeleteProduct(id) {
    return fetch(`${BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    }).then(res => {
        if (!res.ok) throw new Error("Failed to delete product");
        return res.text();
    });
}