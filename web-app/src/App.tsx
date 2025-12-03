import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import MainLayout from "./_components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Subcategories from "./pages/Subcategories";
import Products from "./pages/Products";
import Discounts from "./pages/Discounts";
import ApprovedOwner from "./pages/ApprovedOwner";
import NonApprovedOwner from "./pages/NonApprovedOwner";

import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import Login from "./_components/Login";

const App = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {isSignedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="/categories" element={<Categories />} />
              <Route path="/subcategories" element={<Subcategories />} />
              <Route path="/products" element={<Products />} />

              <Route
                path="/customers/owners/approved"
                element={<ApprovedOwner />}
              />
              <Route
                path="/customers/owners/non-approved"
                element={<NonApprovedOwner />}
              />

              <Route path="/discounts" element={<Discounts />} />
            </Route>
          </Routes>
        </Router>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
};

export default App;
