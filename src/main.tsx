import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Make sure you import Routes and Route if you use them
import App from "./App"; // Your main App component
import "./index.css"; // Your global styles

// Get the root element from the HTML
const rootElement = document.getElementById("root");

// Ensure the root element exists before rendering the React application
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/*
        IMPORTANT: Set the 'basename' to your repository name.
        This tells React Router that the base URL for your application
        is '/User-Approval-Demonstration' when deployed to GitHub Pages.
      */}
      <BrowserRouter basename="/User-Approval-Demonstration">
        {/* Your main App component or your Routes definition */}
        <App />
        {/* Example of direct route definition if not using a separate App component for routes:
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
        */}
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // Log an error or display a message if the root element is not found

  console.error('Root element with ID "root" not found in the document.');
  // You might want to render a fallback UI or throw an error here in a real application
}
