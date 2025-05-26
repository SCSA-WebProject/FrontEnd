import Main from '../pages/main/index.jsx';
import LoginPage from '../pages/login/index.jsx';
import RegisterPage from '../pages/register/index.jsx';
import SignUpPage from '../pages/signup/index.jsx';

const MainScreens = {
    LoginPage: {
        path: '/',
        element: <LoginPage />,
    },
    Main: {
        path: '/main',
        element: <Main />,
    },
    SignUpPage: {
        path: '/signup',
        element: <SignUpPage />,
    },
    PlaceList: {
        path: '/register',
        element: <RegisterPage />,
    },
};

export const AppRouteDef = {
    ...MainScreens,
};