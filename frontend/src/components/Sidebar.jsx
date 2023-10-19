import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AbsenceFunc from '../pages/absenceFunc';
import AllEmployees from '../pages/allEmployees';
import CustomReport from '../pages/customReport';
import EmployeeByDept from '../pages/employeeByDept';
import EmployeeReports from '../pages/employeeReports';
import Leaves from '../pages/leaves';
import LeavesByDept from '../pages/leavesByDept';
import NewEmployee from '../pages/newEmpoyee';
import Profile from '../pages/profile';
import Subordinates from '../pages/subordinates';
import NotificationBell from './notifications';
import { SidebarData } from './sidebarData';
import SubMenu from './subMenu';

const Nav = styled.div`
    background: #333;
    height: 80px;
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Content = styled.div`
    transition: margin-left 350ms;
    margin-left: ${({ $sidebar }) => ($sidebar ? '300px' : '0')}; /* Adjust the value based on your sidebar width */
    height: 100vh; /* Added height to fill the screen */
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #333;
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ $sidebar }) => ($sidebar ? '0' : '-300px')}; /* Adjust the value based on your sidebar width */
    transition: 350ms;
    z-index: 10;
    border-right: 1px solid #ccc; /* Add border style here */
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);     // This is the function that will be called when the sidebar is clicked

    return (
        <React.Fragment>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavIcon to='#'>
                        {sidebar ? <AiOutlineClose onClick={showSidebar} /> : <FaBars onClick={showSidebar} />}
                    </NavIcon>
                    <div style={{marginLeft: 'auto', marginRight: '2rem'}}>
                        <NotificationBell/> {/* need to pass notifications by props */}
                    </div>
                </Nav>

                <SidebarNav $sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index}/>;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>

            <Content $sidebar={sidebar} onClick={()=>setSidebar(false)}>
                <Routes>
                    {/* Routes of the Navigation Sidebar */}

                    <Route path='/profile' element={<Profile/>} />

                    <Route path='/reports/employees-by-dept' element={<EmployeeByDept/>} />
                    <Route path='/reports/leaves-by-dept' element={<LeavesByDept/>} />
                    <Route path='/reports/empolyee-reports' element={<EmployeeReports/>} />
                    <Route path='/reports/custom-report' element={<CustomReport/>} />
                    {/* <Route path='/reports' element={<Reports/>} /> */}

                    <Route path='/employee-details/view-subordinates' element={<Subordinates/>} />
                    <Route path='/employee-details/view-all-employees' element={<AllEmployees/>} />
                    <Route path='/employee-details/add-new-employee' element={<NewEmployee/>} />
                    {/* <Route path='/employee-details' element={<EmployeeDetails/>} /> */}

                    <Route path='/abs-func' element={<AbsenceFunc/>} />
                    <Route path='/leaves' element={<Leaves/>} />

                    <Route path="/not-found" element={<h1>Page Not Found</h1>}/>
                    <Route path="/" element={<h1>Login</h1>} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </Content>
        </React.Fragment>
    );
};

export default Sidebar;
