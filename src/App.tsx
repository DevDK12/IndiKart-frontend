import { Routes, Route } from 'react-router-dom';
import { lazy} from 'react';


import Layout from './components/Layout/Layout';


const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));
const Cart = lazy(() => import('./pages/cart'));



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