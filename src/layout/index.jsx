import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen container px-4 mx-auto">{children}</div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Layout;
