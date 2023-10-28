import React from 'react';
import { BiLogOut, BiSolidReport } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdPeopleAlt } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

export const SidebarData = [
    {
        lvl: 1,
        title: 'Profile',
        path: '/dashboard/profile',
        icon: <CgProfile />
    },

    {
        lvl: 1,
        title: 'Leaves',
        path: '/dashboard/leaves',
        icon: <FaEnvelopeOpenText />
    },

    {
        lvl: 1,
        title: 'All employees',
        path: '/dashboard/employee-details/view-all-employees',
        icon: <MdPeopleAlt />
    },

    {
        lvl:1,
        title: 'Reports',
        icon: <IoIosPaper />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,

        subNav: [
            {
                lvl:1,
                title: 'Employees by department',
                path: '/dashboard/reports/employees-by-dept',
                icon: <BiSolidReport />,
                cName: 'sub-nav'
            },
            {
                lvl:1,
                title: 'Leaves by department',
                path: '/dashboard/reports/leaves-by-dept',
                icon: <BiSolidReport />,
                cName: 'sub-nav'
            },
            {
                lvl: 1,
                title: 'Employee reports',
                path: '/dashboard/reports/employee-reports',
                icon: <BiSolidReport />
            },
            {
                lvl: 1,
                title: 'Custom report',
                path: '/dashboard/reports/custom-report',
                icon: <BiSolidReport />
            }
        ]
    },

    {
        lvl: 1,
        title: 'Log out',   //todo //handle logout
        path: '/dashboard/logout',
        icon: <BiLogOut />
    }
];