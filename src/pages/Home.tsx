import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { Users } from "./../interfaces/User";
import { Products } from "../interfaces/Products";
import { Cart } from "./../interfaces/Cart";
import { toast } from "react-toastify";
import Slideshow from "./../components/Slideshow";

const Home = () => {
  const { state } = useContext(ProductContext);
  const [user, setUser] = useState({} as Users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>(
    state.products
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  useEffect(() => {
    setFilteredProducts(
      state.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, state.products]);

  // const handleSearch = () => {
  //   setFilteredProducts(
  //     state.products.filter((product) =>
  //       product.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  // };

  const addToCart = (product: Products) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item: Cart) => item.id === product.id);
    toast.success("Thêm thành công");
    if (index === -1) {
      cart.push({ ...product, quantity: 1 });
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const currentProduct = 8;
  const firstIndexProduct = currentPage * currentProduct;
  const lastIndexProduct = firstIndexProduct - currentProduct;

  const totalProduct = filteredProducts.slice(
    lastIndexProduct,
    firstIndexProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / currentProduct);
  const numberPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div>
        <Slideshow />
        <div className="row mb-4">
          <div className="flex justify-between items-center">
            <h2
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "30px",
                color: "red",
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              Sản phẩm nổi bật
            </h2>
            <div
              className="d-right container"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <input
                type="text"
                className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Tìm Kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="btn btn-primary ms-2">Search</button>
            </div>
          </div>
        </div>
        <div className="row">
          {totalProduct.map((item) => (
            <div className="col-sm-6 my-3 col-md-4 col-lg-3" key={item.id}>
              <div className="box">
                <div className="card">
                  <Link to={`/product/${item.id}`} className="img">
                    <img src={item.thumbnail} alt={item.title} />
                  </Link>
                  <div className="content">
                    <Link
                      to={`/product/${item.id}`}
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "10px",
                      }}
                    >
                      {item.title}
                    </Link>
                    <h6
                      className="text-red-500"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "18px",
                        marginTop: "10px",
                      }}
                    >
                      Giá: <span>${item.price}</span>
                    </h6>
                  </div>
                  <button
                    className="btn btn-success w-100"
                    onClick={
                      user?.email
                        ? () => addToCart(item)
                        : () =>
                            alert(
                              "Bạn phải đăng nhập mới có thể thêm vào giỏ hàng"
                            )
                    }
                  >
                    Thêm giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-light"
            onClick={handlePrevious}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          {numberPages.map((page) => (
            <button
              key={page}
              className={`btn ${
                currentPage === page ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-light"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
