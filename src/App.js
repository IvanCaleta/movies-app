import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage, MovieDetailsPage, FavoritesPage, SplashPage } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/details/:movieId" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<SplashPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
