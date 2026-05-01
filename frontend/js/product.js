function addProduct() {
    requireAuth(); // redirect if not logged in

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const location = document.getElementById("location").value.trim();
    const category = document.getElementById("category").value.trim();

    if (!title || !description || !price || !location || !category) {
        document.getElementById("msg").innerText = "All fields are required.";
        return;
    }

    apiAddProduct(title, description, price, location, category)
        .then(() => {
            document.getElementById("msg").innerText = "Product added successfully!";
        })
        .catch(err => {
            document.getElementById("msg").innerText = "Error: " + err.message;
        });
}