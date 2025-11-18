import ticketIcon from '@/assets/icons/ticket.svg';
import accountIcon from '@/assets/icons/account.svg';
import navigateIcon from '@/assets/icons/navigate.svg';
import logoutIcon from '@/assets/icons/logout.svg';

export const menuOptions = [
  {
    optionName: 'Navigate',
    optionIcon: navigateIcon,
    path: '/',
  },
  {
    optionName: 'Tickets',
    optionIcon: ticketIcon,
    path: '/tickets',
  },
  {
    optionName: 'Account',
    optionIcon: accountIcon,
    path: '/account',
  },
  {
    optionName: 'Log out',
    optionIcon: logoutIcon,
    path: '/logout',
  },
];
