import { useEffect} from 'react';
import Header from '../header/header';
import styles from './app.module.css'
import modal from '../modal/modal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '../../services/actions/allIngredientsAction';
import Modal from '../modal/modal';
import { REMOVE_MODAL_INGREDIENT } from '../../services/actions/modalActions';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate
 } from 'react-router-dom';
import { LoginPage } from '../../pages/login/Login.jsx'
import { Register } from '../../pages/register/register';
import { Constructor } from '../../pages/constructor/constructor';
import { ForgotPass } from '../../pages/forgotPass/forgotPass';
import { loginUpdate } from '../../services/actions/updateLoginAction';
import { getCookie } from '../../util/functions';
import { Profile } from '../../pages/profile/Profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { ResetPass } from '../../pages/resetPass/resetPass';
import { IngredientDetails } from '../../pages/ingredientDetails/ingredientDetails';
import { ProfileChange } from '../profile-change/profile-change';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIngredients());
    if(getCookie('refreshToken')) {
      dispatch(loginUpdate(getCookie('refreshToken')))
    }
  }, [])

  const closeModal = () => {
    window.history.back();
    dispatch({
      type: REMOVE_MODAL_INGREDIENT
    })
  }
  
  const isAuthorized = useSelector(store => store.user.isAuthorized)
  
  return (
    <div className={styles.app}>
      
      <Router>
      <Header />
        <Routes>
          <Route path='/' exact={true} element={<Constructor />}>
            <Route path='/ingredients/:id' exact={true} element={
                <IngredientDetails
                  id={1}
                  handleClose={closeModal}
                />
              }
            />
          </Route>
          <Route element={<ProtectedRoute path='/' isAuth={!isAuthorized}/>}>
            <Route path='/login' exact={true} element={<LoginPage/>} />
            <Route path='/register' exact={true} element={<Register/>} />
            <Route path='/forgot-password' exact={true} element={<ForgotPass/>}/>
            <Route path='/reset-password' exact={true} element={<ResetPass/>}/>
          </Route>          
          <Route element={<ProtectedRoute path='/login' isAuth={isAuthorized}/>}>
            <Route path='/profile' exact={true} element={<Profile />}>
              <Route path='/profile' exact={true} element={<ProfileChange/>} />
              <Route path='/profile/orders' exact={true} element={<div/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;