import './App.css';
import MovieCategories from './components/MovieCategories/MovieCategories'
import MovieDetail from './components/MovieDetail/MovieDetail';
import Movies from './components/Movies/Movies';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '20%' }}>
        <MovieCategories />
      </div>
      <div className="content" style={{ backgroundColor: '#333', width: '80%', height: '100vh' }}>
        <Outlet />
      </div>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/categories/popular" />} />
          <Route path="/" element={<Layout />}>
            <Route path="/categories/popular" element={<Movies />} />
            <Route path="categories/:categoryId" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;