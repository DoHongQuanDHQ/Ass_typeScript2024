const Header = () => {
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const logOut = useContext(ProductContext);
  const [user, setUser] = useState();

  useEffect(() => {
    getUserToken();
  }, []);
  const getUserToken = () => {
    const getUser = localStorage.getItem("user") || null;
    const user = JSON.parse(getUser!);
    setUser(user);
  };
  return (
    <header
      style={{
        height: "100px",
        width: "100%",
        backgroundColor: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: "0",
      }}
    >
      <nav className="navbar navbar-expand-lg bg-body">
        <div className="container-fluid">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link
                  to="/"
                  className="nav-link"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {user ? "" : "Login"}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/order-history" className="nav-link">
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-link">{user ? user.email : ""}</div>
              </li>
              <li className="nav-item">{user ? <LogOut /> : ""}</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};