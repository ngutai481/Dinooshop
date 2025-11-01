const products = [
  {
    name: "Áo sơ mi nam",
    price: "450.000đ",
    image:
      "https://product.hstatic.net/200000341513/product/z3744323715106_59bb81c9d786c024a9713b3f3c22362f_bc08513ce6a64890ba2d722c8e2555d2_master.jpg",
  },
  {
    name: "Áo thun nam",
    price: "250.000đ",
    image:
      "https://product.hstatic.net/200000325151/product/gbsag-mau-ao-thun-nam-dep-nhat-1_d04890578cc1471c8fc7409c253ff425.png",
  },
  {
    name: "Quần jean nam",
    price: "550.000đ",
    image: "https://tse4.mm.bing.net/th/id/OIP.BJBFq7awlQj9vlwb6iXMUwHaHa",
  },
  {
    name: "Áo khoác nam",
    price: "750.000đ",
    image: "https://tse4.mm.bing.net/th/id/OIP.3dGkRKx5U5uauU6EI1XuowHaHa",
  },
  {
    name: "Giày nam thời trang",
    price: "900.000đ",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.jnaIbBjOdWplWiXxWIzTvwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Quần tây nam",
    price: "620.000đ",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.0MBGNk49EENlSUqcannmQQHaJ1?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Áo len nam",
    price: "480.000đ",
    image:
      "https://tamanh.net/wp-content/uploads/2022/11/luu-y-khi-mac-ao-len-nam.jpg",
  },
  {
    name: "Thắt lưng da",
    price: "390.000đ",
    image:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lqev1rfw4oqff9",
  },
  {
    name: "Ví da nam",
    price: "520.000đ",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.NdAdpPgHmcpM1tU31_XFTgHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Đồng hồ nam",
    price: "1.850.000đ",
    image:
      "https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2023/03/0d11ba43-nhung-mau-dong-ho-nam-dep-bestbuy.jpg",
  },
];

function renderProducts() {
  const grid = document.querySelector(".product-list .grid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (p) => `
          <div class="product">
            <img src="${p.image}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <p>Giá: ${p.price}</p>
            <button onclick="addToCart('${p.name}', '${p.price}', '${p.image}')">
              Thêm vào giỏ
            </button>
          </div>
        `
    )
    .join("");
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  const numericPrice = parseInt(price.replace(/[^\d]/g, ""));
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price: numericPrice, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} đã được thêm vào giỏ hàng!`);
}

function showCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  if (!cartContainer || !totalElement) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p style="text-align: center; margin-top: 30px;">Giỏ hàng của bạn đang trống.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      cartContainer.innerHTML += `
              <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" />
                <div>
                  <p><strong>${item.name}</strong></p>
                  <p>Số lượng: ${item.quantity}</p>
                  <p>Giá: ${item.price.toLocaleString("vi-VN")}đ</p>
                  <button onclick="removeFromCart(${index})">Xóa</button>
                </div>
              </div>
            `;
    });
  }

  totalElement.textContent = `Tổng cộng: ${total.toLocaleString("vi-VN")}đ`;
}

function removeFromCart(index) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  alert(
    "Cảm ơn bạn đã mua hàng tại Super Đỉnh Fashion! Đơn hàng của bạn đang được xử lý."
  );
  localStorage.removeItem("cart");
  const homeLink = document.querySelector('nav a[href="#home"]');
  if (homeLink) homeLink.click();
  showCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const links = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("main, section");

  sections.forEach((sec) => {
    if (sec.id && sec.id !== "home") {
      sec.classList.add("hidden");
    } else if (sec.id === "home") {
      sec.classList.remove("hidden");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      sections.forEach((sec) => sec.classList.add("hidden"));

      const targetId = link.getAttribute("href").replace("#", "");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.classList.remove("hidden");
      }

      if (targetId === "cart") {
        showCart();
      }
    });
  });
});
