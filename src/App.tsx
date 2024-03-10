import { Routes, Route } from 'react-router-dom';
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






const App = () => {

  const dispatch = useDispatch();

  const { loading: userLoaidng } = useSelector((state: { userSlice: IUserReducerInitialState }) => state.userSlice);

  useEffect(() => {
    const auth = getAuth();


      onAuthStateChanged(auth, async (firebaseUser) => {

        if (!firebaseUser){
          dispatch(logoutUser());
          return;
        }

        try{
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





  if (userLoaidng) return <div className='h-screen w-screen title grid place-items-center'>Loading user...</div>;

  return (
    <Routes>


      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />



      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetail />} />
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