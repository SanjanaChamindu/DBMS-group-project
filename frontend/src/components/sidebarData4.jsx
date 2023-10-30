import React from 'react';
import { BiLogOut, BiSolidReport } from 'react-icons/bi';
import { BsFiles, BsPeopleFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaEnvelopeOpenText, FaRegHandPointRight } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdOutlineDashboardCustomize, MdPeople, MdPeopleAlt, MdPeopleOutline } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { BsFillKeyFill } from 'react-icons/bs';

export const SidebarData4 = [
    {
        lvl: 1,
        title: 'Profile',
        path: '/dashboard/profile',
        icon: <CgProfile />
    },

    {
        lvl: 2,
        title: 'Leave Requests',
        path: '/dashboard/leave-requests',
        icon: <FaRegHandPointRight/>
    },

    {
        lvl: 1,
        title: 'Leaves',
        path: '/dashboard/leaves',
        icon: <FaEnvelopeOpenText />
    },

    {
        lvl: 1,
        title: 'Employee details',
        icon: <BsPeopleFill />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,

        subNav: [
            {
                lvl: 1,
                title: 'View all employees',
                path: '/dashboard/employee-details/view-all-employees',
                icon: <MdPeopleAlt />,
                cName: 'sub-nav'
            },
            {
                lvl: 2,
                title: 'View subordinates',
                path: '/dashboard/employee-details/view-subordinates',
                icon: <MdPeople />,
                cName: 'sub-nav'
            },
            {
                lvl :3,
                title: 'Add new employee',
                path: '/dashboard/employee-details/add-new-employee',
                icon: <MdPeopleOutline />
            }
        ]
    },

    {
        lvl:3,
        title: 'Absence functions',
        path: '/dashboard/abs-func',
        icon: <BsFiles />
    },

    {
        lvl: 4,
        title:'Custom attributes',
        path: '/dashboard/custom-attributes',
        icon: <MdOutlineDashboardCustomize />
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
        title: 'Credentials',   //todo //handle logout
        path: '/dashboard/credentials',
        icon: <BsFillKeyFill />
    },

    {
        lvl: 1,
        title: 'Log out',   //todo //handle logout
        path: '/dashboard/logout',
        icon: <BiLogOut />
    }
];