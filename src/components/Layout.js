import Navbar from "./Navbar";

const Layout = ({ children, navbar }) => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  navbar: true,
};

export default Layout;
