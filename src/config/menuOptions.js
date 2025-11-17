import ticketIcon from '@/assets/icons/ticket.svg';
import profileIcon from '@/assets/icons/profile.svg';
import navigateIcon from '@/assets/icons/navigate.svg';

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
];
