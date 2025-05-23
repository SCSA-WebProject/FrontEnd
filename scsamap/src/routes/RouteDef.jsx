import Main from '../pages/Main';
import LoginPage from '../pages/login/index.jsx';
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
};

export const AppRouteDef = {
    ...MainScreens,
};