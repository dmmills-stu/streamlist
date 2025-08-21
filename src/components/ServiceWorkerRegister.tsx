"use client";
import { useEffect } from "react";

// Registers the service worker for offline support and caching
const ServiceWorkerRegister = () => {
  useEffect(() => {
    // Only register if service workers are supported
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // Register the service worker at /sw.js
        navigator.serviceWorker.register("/sw.js");
      });
    }
  }, []);

  // This component does not render anything
  return null;
};

export default ServiceWorkerRegister;
