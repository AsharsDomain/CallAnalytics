"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import LoginPage from "./LoginPage/LoginPage";
import Home from "./page";
import { ProductTable } from "@/components/ProductTable";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <BrowserRouter>
            <Refine routerProvider={routerProvider}>
              <Routes>
                {/* Public route for login */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Private route for dashboard, protected by AuthGuard */}
                <Route 
                  path="/" 
                  element={
                    <AuthGuard>
                      <Home /> {/* Render the dashboard page here */}
                    </AuthGuard>
                  } 
                />
                
                {/* Route for ProductTable */}
                <Route 
                  path="/products" 
                  element={
                    <AuthGuard>
                      <ProductTable /> {/* Render the ProductTable component here */}
                    </AuthGuard>
                  } 
                />
                
                {/* Redirect all unknown routes to login page */}
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </Refine>
          </BrowserRouter>
        </ChakraProvider>
      </body>
    </html>
  );
}
