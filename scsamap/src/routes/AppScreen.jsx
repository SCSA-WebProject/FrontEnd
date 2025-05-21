import styled from 'styled-components';
import AppPages from './AppPages';

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
`;

const AppScreen = () => {
    return (
        <FullScreen>
            <ViewArea>
                <AppPages />
            </ViewArea>
        </FullScreen>
    );
};

export default AppScreen;