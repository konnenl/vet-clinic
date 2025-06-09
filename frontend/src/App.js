import Landing from "./pages/Landing";
import Catalogue from "./pages/Catalogue/Catalogue";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import SignInPage from "./pages/AuthPage/SignIn";
import SignUpPage from "./pages/AuthPage/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from "./components/AuthContext";
import { useContext } from 'react';
import ProfilePage from "./pages/Profile/Profile";

// Компонент-обёртка для защищённых маршрутов
const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth)
  return isAuth ? children : <Navigate to="/auth" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage/>}/>
          
          <Route path="/history" element={
            <ProtectedRoute>

            </ProtectedRoute>
          } />
          
          <Route path="/catalogue" element={<Catalogue />} />
          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }/>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>

  );
}
