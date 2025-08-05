import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import {styled, css} from 'styled-components';

const Main = styled.main`
    padding: 4rem 4.8rem 6.4rem;
    background-color: var(--color-grey-100);
`;

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;


function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;
