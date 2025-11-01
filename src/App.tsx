import React, { useState, useEffect } from "react";
import "./styles.css";

const products = [
  {
    name: "Áo sơ mi hoa văn cổ hai ve",
    price: 450000,
    displayPrice: "450.000đ",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQJIeOmQKplFNSxit5FjXAxIg2dOzmmjwhcKy-NL9Dl0xElB2CRymU3biIWTMbrSq2Kft877LyrgGv2-Ocfz5VJlWWNJ0dVfSaqG2vyWkZO8Ih6Alp_FXJd2iiHFuJbB_Es4b9sWbuM&usqp=CAc",
  },
  {
    name: "Áo thun bằng cotton in hình dáng rộng",
    price: 250000,
    displayPrice: "250.000đ",
    image:
      "https://image.hm.com/assets/hm/a7/f6/a7f6c1438e4e0dee9f4670f002f92f476ff2de3f.jpg?imwidth=1536",
  },
  {
    name: "Loose Fit Trousers",
    price: 550000,
    displayPrice: "550.000đ",
    image:
      "https://image.hm.com/assets/hm/34/23/34232ef06d897ea7b8d6bc746c1db27bdf8b51d7.jpg?imwidth=1536",
  },
  {
    name: "Váy gấu bong bóng",
    price: 750000,
    displayPrice: "750.000đ",
    image:
      "https://image.hm.com/assets/hm/7f/05/7f05d4dea1b26960efaa90d9bac7ed3b83bda557.jpg?imwidth=1536",
  },
  {
    name: "Boot cổ chân cao gót",
    price: 900000,
    displayPrice: "900.000đ",
    image:
      "https://image.hm.com/assets/hm/a9/ad/a9ad0513a8d33e5f714d3931218e515b4ac60413.jpg?imwidth=1536",
  },
  {
    name: "Túi đeo vai",
    price: 620000,
    displayPrice: "620.000đ",
    image:
      "https://image.hm.com/assets/hm/6c/77/6c77c2e02ee61d9168d3cd63097cc4c43182365f.jpg?imwidth=1536",
  },
  {
    name: "Giày thể thao chunky",
    price: 480000,
    displayPrice: "480.000đ",
    image:
      "https://image.hm.com/assets/hm/be/86/be865fe54224f763335cf39865525cfed0814e0d.jpg?imwidth=1536",
  },
  {
    name: "Thắt lưng da",
    price: 390000,
    displayPrice: "390.000đ",
    image:
      "https://image.hm.com/assets/hm/83/21/8321860f4184dfaa8b4a3f0474eca5f935279f1c.jpg?imwidth=1536",
  },
  {
    name: "Túi nylon đeo chéo",
    price: 520000,
    displayPrice: "520.000đ",
    image:
      "https://image.hm.com/assets/hm/21/2f/212fe44011b6c562f0ce755c0455a159c126e461.jpg?imwidth=1536",
  },
  {
    name: "4 khuyên vành tai và bông tai",
    price: 1850000,
    displayPrice: "1.850.000đ",
    image:
      "https://image.hm.com/assets/hm/65/30/653022a401eb3052f5bf332044f3bc2de325d117.jpg?imwidth=1536",
  },
];

interface ProductType {
  name: string;
  price: number;
  displayPrice: string;
  image: string;
}

interface CartItem extends ProductType {
  quantity: number;
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN") + "đ";
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    const existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const removeFromCart = (name: string) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      setCart(cart.filter((item) => item.name !== name));
    }
  };

  // Hàm này xử lý việc hoàn tất đơn hàng SAU KHI nhập thông tin
  const handleFinalCheckout = () => {
    alert(
      "Cảm ơn bạn đã mua hàng tại DinoShop! Đơn hàng của bạn đã được xác nhận và đang được xử lý."
    );
    setCart([]);
    setCurrentPage("home");
  };

  // Hàm này chuyển từ Giỏ hàng sang trang Thanh toán
  const goToCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    setCurrentPage("checkout");
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderCheckoutPage = () => {
    // Nếu giỏ hàng trống, không cho vào trang thanh toán
    if (cart.length === 0) {
      // Có thể chuyển hướng thẳng về trang sản phẩm
      setTimeout(() => {
        setCurrentPage("products");
      }, 0);
      return (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Giỏ hàng trống! Vui lòng chọn sản phẩm trước.
        </p>
      );
    }

    return (
      <section id="checkout" className="cart-page">
        <h2>Hoàn tất Thanh toán</h2>

        {/* Tóm tắt đơn hàng */}
        <h3>Tóm tắt đơn hàng</h3>
        <div
          id="checkout-summary"
          style={{
            borderBottom: "1px solid #ddd",
            paddingBottom: "20px",
            marginBottom: "20px",
          }}
        >
          {cart.map((item) => (
            <div
              key={item.name}
              className="cart-item"
              style={{ borderBottom: "none" }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "60px", height: "60px" }}
              />
              <div style={{ flexGrow: 1 }}>
                <p>
                  <strong>{item.name}</strong> x{item.quantity}
                </p>
                <p style={{ color: "#ff6600" }}>
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          id="cart-total"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#000",
          }}
        >
          Tổng thanh toán:{" "}
          <span style={{ color: "#ff6600" }}>{formatCurrency(cartTotal)}</span>
        </div>

        {/* Form giao hàng */}
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleFinalCheckout();
          }}
        >
          <h3>Thông tin giao hàng</h3>
          <input type="text" placeholder="Họ và tên" required />
          <input type="text" placeholder="Địa chỉ giao hàng" required />
          <input type="tel" placeholder="Số điện thoại" required />
          <input type="email" placeholder="Email (nếu có)" />
          <button type="submit">Xác nhận đặt hàng</button>
        </form>
      </section>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <main id="home" className="hero">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6MBVMQ_lysqmLSukRc7vf5dtDuBD5orK-PQ&s"
              alt="DinoShop"
              className="hero-logo"
            />
            <div className="hero-text">
              <h2>Thời trang chất lượng cao</h2>
              <p>Phong cách, cá tính và hiện đại</p>
            </div>
          </main>
        );

      case "products":
        return (
          <section id="products" className="product-list">
            <h2>Sản phẩm nổi bật</h2>
            <div className="grid">
              {products.map((p) => (
                <div key={p.name} className="product">
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>Giá: {p.displayPrice}</p>
                  <button onClick={() => addToCart(p)}>Thêm vào giỏ</button>
                </div>
              ))}
            </div>
          </section>
        );

      case "cart":
        return (
          <section id="cart" className="cart-page">
            <h2>Giỏ hàng của bạn</h2>
            <div id="cart-items">
              {cart.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "30px" }}>
                  Giỏ hàng của bạn đang trống.
                </p>
              ) : (
                cart.map((item) => (
                  <div key={item.name} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                      <p>Số lượng: {item.quantity}</p>
                      <p>Giá: {formatCurrency(item.price)}</p>
                      <button onClick={() => removeFromCart(item.name)}>
                        Xóa
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div id="cart-total">Tổng cộng: {formatCurrency(cartTotal)}</div>
            {/* Sửa nút Thanh toán: chuyển sang trang Thanh toán */}
            <button onClick={goToCheckout}>Thanh toán</button>
          </section>
        );

      case "checkout":
        return renderCheckoutPage(); // Gọi hàm render trang thanh toán

      case "about":
        return (
          <section id="about" className="about-shop">
            <div className="about-container">
              <img
                src="https://cdn.hpdecor.vn/wp-content/uploads/2022/05/thiet-ke-cua-hang-quan-ao-nam-5.jpg"
                alt="Cửa hàng thời trang"
              />
              <div className="about-text">
                <h2>Giới thiệu cửa hàng</h2>
                <p>
                  DinoShop là địa chỉ mua sắm thời trang nam uy tín, mang đến
                  phong cách trẻ trung, lịch lãm và hiện đại. Chúng tôi luôn cập
                  nhật xu hướng mới nhất để bạn tự tin thể hiện cá tính.
                </p>
                <p>
                  <strong>Địa chỉ:</strong> 123 Nguyễn Trãi, Quận 5, TP.HCM
                </p>
                <p>
                  <strong>Giờ mở cửa:</strong> 8:00 - 21:30 (T2 - CN)
                </p>
                <p>
                  <strong>Liên hệ:</strong> 0909 123 456
                </p>
              </div>
            </div>
          </section>
        );

      case "contact":
        return (
          <section id="contact" className="contact-section">
            <div className="contact-container">
              <h2>Liên hệ với chúng tôi</h2>
              <p>
                Nếu bạn có bất kỳ câu hỏi nào nào muốn đặt hàng, vui lòng điền
                thông tin bên dưới.
              </p>
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Tin nhắn đã được gửi!");
                }}
              >
                <input type="text" placeholder="Họ và tên" required />
                <input type="email" placeholder="Email" required />
                <textarea
                  placeholder="Nội dung tin nhắn"
                  rows={4}
                  required
                ></textarea>
                <button type="submit">Gửi liên hệ</button>
              </form>
            </div>
          </section>
        );

      default:
        return <div>Trang không tồn tại!</div>;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>DinoShop</h1>
        <nav>
          {[
            { state: "home", display: "Trang chủ" },
            { state: "products", display: "Sản Phẩm" },
            { state: "about", display: "Giới Thiệu" },
            { state: "contact", display: "Liên Hệ" },
            { state: "cart", display: "Giỏ Hàng" },
            { state: "checkout", display: "Thanh Toán" }, // Đã thêm vào menu
          ].map((page) => (
            <a
              key={page.state}
              href={`#${page.state}`}
              className={currentPage === page.state ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page.state); // Dùng state name để đặt trạng thái
              }}
            >
              {page.display} {/* Dùng display name để hiển thị */}
            </a>
          ))}
        </nav>
      </header>
      {renderPage()}
      <footer>
        <p>© 2025 DinoShop. All rights reserved.</p>
      </footer>
    </div>
  );
}
