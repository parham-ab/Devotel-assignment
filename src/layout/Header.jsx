import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import headerMenu from "constants/headerMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="text-xl font-bold">Insurance Application</div>

      <nav className="hidden md:flex gap-6">
        {headerMenu.map((item) => (
          <Link key={item.id} to={item.link} className="hover:text-gray-300">
            {item.title}
          </Link>
        ))}
      </nav>

      <button onClick={() => setIsOpen(true)} className="md:hidden">
        <IoMenu className="w-8 h-8" />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white shadow-lg z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <IoClose className="w-8 h-8" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4">
          {headerMenu.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="p-2 hover:bg-gray-700 rounded"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
};

export default Header;
