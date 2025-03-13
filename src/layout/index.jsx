import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="h-screen container px-6">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
