import React from 'react';
import { BiLogOut, BiSolidReport } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdPeopleAlt } from 'react-icons/md';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { BsFillKeyFill } from 'react-icons/bs';

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