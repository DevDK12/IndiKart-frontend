import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';


import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/Admin/AdminLayout';




const Home = lazy(() => import('./pages/shop/home'));
const Search = lazy(() => import('./pages/shop/search'));
const Cart = lazy(() => import('./pages/shop/cart'));
const Shipping = lazy(() => import('./pages/shop/shipping'));


const Dashboard = lazy(() => import('./pages/admin/main/dashboard'));
const Customer = lazy(() => import('./pages/admin/main/customer/customer'));
const Product = lazy(() => import('./pages/admin/main/product/product'));
const Transaction = lazy(() => import('./pages/admin/main/transaction/transaction'));

const Bar = lazy(() => import('./pages/admin/Chart/barCharts'));
const Pie = lazy(() => import('./pages/admin/Chart/pieCharts'));
const Line = lazy(() => import('./pages/admin/Chart/lineCharts'));

const Stopwatch = lazy(() => import('./pages/admin/Apps/stopwatch'));
const Coupon = lazy(() => import('./pages/admin/Apps/coupon'));
const Toss = lazy(() => import('./pages/admin/Apps/toss'));


const NewProduct = lazy(() => import('./pages/admin/main/product/newProduct'));
const ManageProduct = lazy(() => import('./pages/admin/main/product/manageProduct'));
const ManageTransaction = lazy(() => import('./pages/admin/main/transaction/manageTransaction'));





const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
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

        {/* Management */}
        <Route path="/admin/product/new" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<ManageProduct />} />
        <Route path="/admin/transaction/:id" element={<ManageTransaction />} />
        
      </Route>

    </Routes>
  )
}



export default App