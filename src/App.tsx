
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Home from './pages/home';
import Search from './pages/search';
import Cart from './pages/cart';



const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}
export default App