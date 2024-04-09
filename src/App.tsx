import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, useEffect } from 'react';


import Layout from './components/Layout/Layout';
import AdminLayout from './components/Layout/Admin/AdminLayout';




const Home = lazy(() => import('./pages/shop/home'));
const Search = lazy(() => import('./pages/shop/search'));
const Cart = lazy(() => import('./pages/shop/cart'));
const Shipping = lazy(() => import('./pages/shop/shipping'));
const Orders = lazy(() => import('./pages/shop/orders'));
const OrderDetail = lazy(() => import('./pages/shop/order_detail'));


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


import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { loginUser, logoutUser } from './redux/reducer/user-slice';
import { getSingleUser } from './redux/api/userApi';
import toast from 'react-hot-toast';
import { IUserReducerInitialState } from './Types/user-types';
import { ICartReducerInitialState } from './Types/cart-types';






const App = () => {

  const dispatch = useDispatch();

  const { loading: userLoaidng, user } = useSelector((state: { userSlice: IUserReducerInitialState }) => state.userSlice);
  const {cartItems} = useSelector((state: {cartSlice: ICartReducerInitialState}) => state.cartSlice);

  useEffect(() => {
    const auth = getAuth();


    onAuthStateChanged(auth, async (firebaseUser) => {

      if (!firebaseUser) {
        dispatch(logoutUser());
        return;
      }

      try {
        const data = await getSingleUser(firebaseUser?.uid);

        if ('error' in data) throw new Error('User not found');
        const { status, data: { user: mongoUser } } = data;

        if (status !== 'success') throw new Error('User not found');

        dispatch(loginUser(mongoUser));
      }
      catch (err) {
        dispatch(logoutUser());
        toast.error('User not found in mongodb, Please clear cache and try again');
      }
    })

  }, [dispatch])


  const isLoggedIn = user ? true : false;
  const adminOnly = isLoggedIn && user?.role === 'admin';
  const isCartEmpty = cartItems.length === 0;


  if (userLoaidng)
    return <div className='h-screen w-screen title grid place-items-center'>Loading user...</div>;

  return (
    <Routes>

      <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to='/'  />} />
      <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to='/' />} />


      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={!isCartEmpty ? <Shipping /> : <Navigate to='/cart' />} />
        <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to='/login' />} />
        <Route path="/order/:id" element={isLoggedIn ? <OrderDetail /> : <Navigate to='/login' />} />
      </Route>


      <Route element={<AdminLayout />}>

        {/* Admin Pages */}
        <Route path="/admin/dashboard" element={adminOnly ? <Dashboard /> : <Navigate to='/' />} />
        <Route path="/admin/product" element={adminOnly ? <Product /> : <Navigate to='/' />} />
        <Route path="/admin/transaction" element={adminOnly ? <Transaction /> : <Navigate to='/' />} />
        <Route path="/admin/customer" element={adminOnly ? <Customer /> : <Navigate to='/' />} />


        {/* Charts */}
        <Route path="/admin/chart/bar" element={adminOnly ? <Bar /> : <Navigate to='/' />} />
        <Route path="/admin/chart/pie" element={adminOnly ? <Pie /> : <Navigate to='/' />} />
        <Route path="/admin/chart/line" element={adminOnly ? <Line /> : <Navigate to='/' />} />

        {/* Apps */}
        <Route path="/admin/app/stopwatch" element={adminOnly ? <Stopwatch /> : <Navigate to='/' />} />
        <Route path="/admin/app/coupon" element={adminOnly ? <Coupon /> : <Navigate to='/' />} />
        <Route path="/admin/app/toss" element={adminOnly ? <Toss /> : <Navigate to='/' />} />

        {/* Management */}
        <Route path="/admin/product/new" element={adminOnly ? <NewProduct /> : <Navigate to='/' />} />
        <Route path="/admin/product/:productId" element={adminOnly ? <ManageProduct /> : <Navigate to='/' />} />
        <Route path="/admin/transaction/:id" element={adminOnly ? <ManageTransaction /> : <Navigate to='/' />} />
      </Route>
    </Routes>
  )
}



export default App