import React from "react";

const GitHubIcon = () => (
  <svg
    className="w-6 h-6 mr-2 fill-current text-black"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.188c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.087-.743.083-.728.083-.728 1.205.085 1.839 1.236 1.839 1.236 1.07 1.834 2.809 1.304 3.495.998.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.311.467-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.019.005 2.043.137 3.002.404 2.291-1.553 3.299-1.23 3.299-1.23.654 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.221 0 4.609-2.804 5.624-5.475 5.921.431.372.815 1.102.815 2.221v3.293c0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 shadow-lg bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-black text-2xl font-bold">Option Pricer</h1>
        <nav>
          <ul className="flex space-x-6 text-black">
            <li className="flex items-center">
              <a
                href="https://github.com/neuralsorcerer/option-pricer"
                className="hover:text-gray-300"
              >
                <GitHubIcon />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
