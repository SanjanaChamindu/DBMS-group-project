import React from 'react';
import { BiLogOut, BiSolidReport } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaEnvelopeOpenText, FaRegHandPointRight } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdPeople, MdPeopleAlt } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { BsFillKeyFill } from 'react-icons/bs';

export const SidebarData2 = [
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
        lvl: 2,
        title: 'View subordinates',
        path: '/dashboard/employee-details/view-subordinates',
        icon: <MdPeople />,
        cName: 'sub-nav'
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