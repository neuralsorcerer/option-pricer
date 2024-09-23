import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>
          Built with ❤️ by{" "}
          <a className="text-blue-500" href="https://soumyadipsarkar.in">
            Soumyadip Sarkar
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
