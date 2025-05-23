import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppRouteDef } from './RouteDef';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';

const FullScreen = styled.div`
    width: 100%;
    height: 100vh;
    background: #BFDBFF;
    display: flex;
    justify-content: center;
`;

const ViewArea = styled.div`
    width: 600px;
    height: 100vh;
    background: #ffffff;
    position: relative;
`;

const ContentArea = styled.div`
    height: ${props => props.$hasNavbar ? 'calc(100vh - 80px)' : '100vh'};
    overflow-y: auto;
`;

const AppContent = () => {
    const location = useLocation();
    const showNavbarPaths = ['/main', '/ranking', '/play', '/mypage'];
    const hasNavbar = showNavbarPaths.includes(location.pathname);

    return (
        <FullScreen>
            <ViewArea>
                <ContentArea $hasNavbar={hasNavbar}>
                    <Routes>
                        {Object.entries({ ...AppRouteDef }).map(([name, { path, element }], index) => (
                            <Route key={name + index} path={path} element={element} />
                        ))}
                    </Routes>
                </ContentArea>
                {hasNavbar && <Navbar />}
            </ViewArea>
        </FullScreen>
    );
};

const AppPages = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default AppPages;