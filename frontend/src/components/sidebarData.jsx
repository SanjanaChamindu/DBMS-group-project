import React from 'react';
import { BiLogOut, BiSolidReport } from 'react-icons/bi';
import { BsFiles, BsPeopleFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdPeople, MdPeopleAlt, MdPeopleOutline } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgProfile />
    },

    {
        title: 'Leaves',
        path: '/leaves',
        icon: <FaEnvelopeOpenText />
    },

    {
        title: 'Employee details',
        icon: <BsPeopleFill />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,

        subNav: [
            {
                title: 'View all employees',
                path: '/employee-details/view-all-employees',
                icon: <MdPeopleAlt />,
                cName: 'sub-nav'
            },
            {
                title: 'View subordinates',
                path: '/employee-details/view-subordinates',
                icon: <MdPeople />,
                cName: 'sub-nav'
            },
            {
                title: 'Add new employee',
                path: '/employee-details/add-new-employee',
                icon: <MdPeopleOutline />
            }
        ]
    },

    {
        title: 'Absence functions',
        path: '/abs-func',
        icon: <BsFiles />
    },

    {
        title: 'Reports',
        icon: <IoIosPaper />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,

        subNav: [
            {
                title: 'Employees by department',
                path: '/reports/employees-by-dept',
                icon: <BiSolidReport />,
                cName: 'sub-nav'
            },
            {
                title: 'Leaves by department',
                path: '/reports/leaves-by-dept',
                icon: <BiSolidReport />,
                cName: 'sub-nav'
            },
            {
                title: 'Employee reports',
                path: '/reports/emplyee-reports',
                icon: <BiSolidReport />
            },
            {
                title: 'Custom report',
                path: '/reports/custom-report',
                icon: <BiSolidReport />
            }
        ]
    },

    {
        title: 'Log out',   //todo //handle logout
        path: '/login',
        icon: <BiLogOut />
    }
];