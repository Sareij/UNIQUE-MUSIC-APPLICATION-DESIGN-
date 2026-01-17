import React from 'react';


const PageNotFound= () => {
  return (
    <section className="page-not-found">
      <div className="page-not-found-overlay">
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            
            <h1 className="error-title">404</h1>
            <h2 className="error-subtitle">Oops! Page not found</h2>
            <p className="error-message">
              The page you're looking for doesn't exist or has been moved. 
              Try searching or return to the homepage.
            </p>
            
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
              />
              <button className="search-button">
                Search
              </button>
            </div>
            
            <div className="action-buttons">
              <a 
                href="/" 
                className="home-button"
              >
                Go to Homepage
              </a>
              <button 
                onClick={() => window.history.back()} 
                className="back-button"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;