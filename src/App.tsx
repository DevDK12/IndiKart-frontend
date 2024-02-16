import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';


import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/Admin/AdminLayout';




const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));
const Cart = lazy(() => import('./pages/cart'));


const Dashboard = lazy(() => import('./pages/admin/main/dashboard'));
const Customer = lazy(() => import('./pages/admin/main/customer/customer'));
const Product = lazy(() => import('./pages/admin/main/product/product'));
const Transaction = lazy(() => import('./pages/admin/main/transaction/transaction'));

const Bar = lazy(() => import('./pages/admin/Chart/bar'));
const Pie = lazy(() => import('./pages/admin/Chart/pie'));
const Line = lazy(() => import('./pages/admin/Chart/line'));

const Stopwatch = lazy(() => import('./pages/admin/Apps/stopwatch'));
const Coupon = lazy(() => import('./pages/admin/Apps/coupon'));
const Toss = lazy(() => import('./pages/admin/Apps/toss'));






const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
      </Route>


      <Route element={<AdminLayout />}>

        {/* Admin Pages */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/transaction" element={<Transaction />} />
        <Route path="/admin/customer" element={<Customer />} />


        {/* Charts */}
        <Route path="/admin/chart/bar" element={<Bar />} />
        <Route path="/admin/chart/pie" element={<Pie />} />
        <Route path="/admin/chart/line" element={<Line />} />

        {/* Apps */}
        <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
        <Route path="/admin/app/coupon" element={<Coupon />} />
        <Route path="/admin/app/toss" element={<Toss />} />

      </Route>

    </Routes>
  )
}



export default App