import React from "react";

const SudamericanaHeader: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
            Copa Sudamericana
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Toda la información, resultados y noticias de la Copa Sudamericana.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SudamericanaHeader;
