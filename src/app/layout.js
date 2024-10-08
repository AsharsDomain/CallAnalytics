"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import RoleGuard from "@/components/RoleGuard"; // Optionally add RoleGuard for admin-specific routes
import LoginPage from "./LoginPage/LoginPage";
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

// Extend the Chakra UI theme to apply a black background to the entire body
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
        <ChakraProvider theme={theme}>
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

                 {/* Route for viewing call details */}
                 <Route
                  path="/call/:id"
                  element={
                    <AuthGuard>
                      <CallDetails /> {/* Render the CallDetails component here */}
                    </AuthGuard>
                  }
                />

                 {/* Route for the Settings Page */}
                 <Route
                  path="/settings"
                  element={
                    <AuthGuard>
                      <MainComponent /> {/* Render the SettingsPage component here */}
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

                {/* Route for AlertsPage */}
                <Route
                  path="/alerts"
                  element={
                    <AuthGuard>
                      <AlertsPage /> {/* Render the AlertsPage component here */}
                    </AuthGuard>
                  }
                />

                {/* Route for Call Expense */}
                <Route
                  path="/call-expense"
                  element={
                    <AuthGuard>
                      <CallExpense /> {/* Render the CallExpense component here */}
                    </AuthGuard>
                  }
                />

                {/* Route for the new Analytics Page */}
                <Route
                  path="/analytics"
                  element={
                    <AuthGuard>
                      <AnalyticsPage /> {/* Render the new AnalyticsPage here */}
                    </AuthGuard>
                  }
                />

                {/* Route for the WhiteLabeling Page */}
                <Route
                  path="/whitelabel"
                  element={
                    <AuthGuard>
                      <WhiteLabelingPage /> {/* Render the WhiteLabelingPage component here */}
                    </AuthGuard>
                  }
                />

                {/* Admin route protected by RoleGuard for admin users */}
                <Route
                  path="/admin"
                  element={
                    <AuthGuard>
                      <RoleGuard allowedRoles={['Admin']}>
                        <AdminPage /> {/* Render the AdminPage here */}
                      </RoleGuard>
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
