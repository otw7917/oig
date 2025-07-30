import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-neutral-600 dark:text-neutral-400">
        <p>&copy; {new Date().getFullYear()} OIG. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
