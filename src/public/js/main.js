async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();
    const productListElement = document.getElementById("product-list");

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-md-4");
      productCard.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Giá: ${product.price}</p>
                        <p class="card-text">${product.description}</p>
                        <button class="btn btn-primary">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            `;
      productListElement.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Gọi hàm loadProducts khi trang được tải
window.onload = loadProducts;
