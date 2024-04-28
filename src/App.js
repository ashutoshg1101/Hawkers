import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Otpauth from './pages/Otpauth';
import Home from './pages/Home';
import UserHome from './pages/userHome/userHome'
import MapComponent from './pages/mapComponent';
import LoginPage from './pages/loginPage/Login';
import SignupPage from './pages/signupPage/signupPage';
import GetRoute from './pages/getRoute';
import HawkerHome from './pages/hawkerHome/hwHome';

const App = () => {

  return (
   <BrowserRouter>
        <Routes>
          <Route path='/' element={<Otpauth />} />
          <Route path='/home' element={<Home />} />
          <Route path='/mapComponent' element={<MapComponent />} />
          <Route path='/userHome' element={<UserHome />} />
          <Route path='/hawkerHome' element={<HawkerHome />} />
          <Route path='/loginPage' element={<LoginPage />} />
          <Route path='/signupPage' element={<SignupPage />} />
          <Route path='/getRoute' element={<GetRoute />} />
        </Routes>
   </BrowserRouter>
  );
};

export default App;
