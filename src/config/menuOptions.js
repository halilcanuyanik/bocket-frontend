import ticketIcon from '@/assets/icons/ticket.svg';
import profileIcon from '@/assets/icons/profile.svg';
import navigateIcon from '@/assets/icons/navigate.svg';
import logoutIcon from '@/assets/icons/logout.svg';

export const menuOptions = [
  {
    optionName: 'Navigate',
    optionIcon: navigateIcon,
    path: '/',
  },
  {
    optionName: 'Profile',
    optionIcon: profileIcon,
    path: '/profile',
  },
  {
    optionName: 'Tickets',
    optionIcon: ticketIcon,
    path: '/tickets',
  },
  {
    optionName: 'Log out',
    optionIcon: logoutIcon,
    path: '/logout',
  },
];
