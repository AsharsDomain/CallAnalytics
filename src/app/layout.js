// src/App.js or src/index.js
"use client"; 
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoleGuard from "@/components/RoleGuard"; // Import RoleGuard
import Home from "./page";
import { ProductTable } from "@/components/ProductTable";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AlertsPage from "@/components/alerts";
import CallExpense from "@/components/CallExpense";
import WhiteLabelingPage from "@/components/WhiteLabelingPage";
import AdminPage from "@/components/AdminPage"; // Import AdminPage
import CallDetails from "@/components/CallDetails";
import SettingsPage from "@/components/SettingsPage";
import MainComponent from "@/components/MainComponent";
import ClientSubaccounts from "@/components/ClientSubaccounts";
import Unauthorized from "@/components/Unauthorized"; // Import Unauthorized Page
import { ClerkProvider } from '@clerk/clerk-react';
import AuthContent from "@/components/AuthContent"; // Import AuthContent
import { RoleProvider } from "@/components/RoleContext"; // Import RoleProvider

// Extend the Chakra UI theme to apply a black background to the entire body
const clerkFrontendApi = 'https://humane-shrew-49.clerk.accounts.dev';
const publishableKey = 'pk_test_aHVtYW5lLXNocmV3LTQ5LmNsZXJrLmFjY291bnRzLmRldiQ';

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "black", // Set the background color to black
        color: "white", // Set the default text color to white
        minHeight: "100vh", // Ensure the body covers full screen height
        margin: 0, // Remove default margin
      },
    },
  },
});

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        {/* Add publishableKey to ClerkProvider */}
        <ClerkProvider frontendApi={clerkFrontendApi} publishableKey={publishableKey}>
          <ChakraProvider theme={theme}>
            {/* Wrap the application with RoleProvider */}
            <RoleProvider>
              <BrowserRouter>
                <Refine routerProvider={routerProvider}>
                  <Routes>
                    {/* Public route for login, using AuthContent for Clerk authentication */}
                    <Route path="/login" element={<AuthContent />} />

                    {/* Unauthorized route */}
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* Private route for dashboard, protected by AuthGuard */}
                    <Route
                      path="/"
                      element={
                        
                          <Home /> 
                       
                      }
                    />

                    {/* Route for viewing call details */}
                    <Route
                      path="/call/:id"
                      element={
                        
                          <CallDetails />
                        
                      }
                    />

                    {/* Route for the Settings Page */}
                    <Route
                      path="/settings"
                      element={
                        
                          <MainComponent /> 
                        
                      }
                    />

                    {/* Route for ProductTable */}
                    <Route
                      path="/products"
                      element={
                       
                          <ProductTable /> 
                       
                      }
                    />

                    {/* Route for AlertsPage */}
                    <Route
                      path="/alerts"
                      element={
                       
                          <AlertsPage /> 
                       
                      }
                    />

                    {/* Route for Call Expense, protected by RoleGuard */}
                    <Route
                      path="/call-expense"
                      element={
                        
                          <RoleGuard allowedRoles={["Admin", "Agency"]}>
                            <CallExpense /> 
                          </RoleGuard>
                        
                      }
                    />

                    {/* Route for the new Analytics Page */}
                    <Route
                      path="/analytics"
                      element={
                        
                          <AnalyticsPage /> 
                        
                      }
                    />

                    {/* Route for the WhiteLabeling Page, protected by RoleGuard */}
                    <Route
                      path="/whitelabel"
                      element={
                       
                          <RoleGuard allowedRoles={["Admin", "Agency"]}>
                            <WhiteLabelingPage /> 
                          </RoleGuard>
                      
                      }
                    />

                    {/* Admin route protected by RoleGuard for admin users */}
                    <Route
                      path="/admin"
                      element={
                       
                          <RoleGuard allowedRoles={["Admin"]}>
                            <AdminPage /> 
                          </RoleGuard>
                        
                      }
                    />

                    {/* Route for Client Subaccounts, protected by RoleGuard */}
                    <Route
                      path="/subaccounts"
                      element={
                       
                          <RoleGuard allowedRoles={["Client"]}>
                            <ClientSubaccounts /> {/* Render the ClientSubaccounts here */}
                          </RoleGuard>
                    
                      }
                    />

                    {/* Redirect all unknown routes to login page */}
                    <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>
                </Refine>
              </BrowserRouter>
            </RoleProvider>
          </ChakraProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
