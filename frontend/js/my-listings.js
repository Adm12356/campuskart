requireAuth(); // redirect if not logged in

const currentUser = getLoggedInUser(); // email from JWT

document.addEventListener("DOMContentLoaded", () => {
    loadMyListings();
});

function loadMyListings() {
    apiGetMyProducts()
        .then(products => {
            const grid = document.getElementById("products");
            const empty = document.getElementById("empty-state");
            const subtitle = document.getElementById("subtitle");

            if (products.length === 0) {
                subtitle.style.display = "none";
                empty.style.display = "block";
                return;
            }

            subtitle.innerText = `You have ${products.length} active listing${products.length > 1 ? "s" : ""}`;

            grid.innerHTML = products.map(p => `
                <div class="card" id="card-${p.id}">
                    <div class="card-body">
                        <span class="badge">${p.category}</span>
                        <h3>${p.title}</h3>
                        <p class="description">${p.description}</p>
                        <p class="price">₹${p.price}</p>
                        <p class="location">📍 ${p.location}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn-danger" onclick="deleteProduct(${p.id})">🗑 Delete</button>
                    </div>
                </div>
            `).join("");
        })
        .catch(err => {
            document.getElementById("subtitle").innerText = "Failed to load listings.";
            console.error(err);
        });
}

function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    apiDeleteProduct(id)
        .then(() => {
            // remove card from DOM without full reload
            document.getElementById(`card-${id}`).remove();

            // update subtitle count
            const remaining = document.querySelectorAll(".card").length;
            const subtitle = document.getElementById("subtitle");

            if (remaining === 0) {
                subtitle.style.display = "none";
                document.getElementById("empty-state").style.display = "block";
            } else {
                subtitle.innerText = `You have ${remaining} active listing${remaining > 1 ? "s" : ""}`;
            }
        })
        .catch(err => {
            alert("Failed to delete: " + err.message);
        });
}