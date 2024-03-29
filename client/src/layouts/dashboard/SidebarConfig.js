import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

export const teacherSidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'profile',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  // {
  //   title: 'profile',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill)
  // },
  {
    title: 'classes',
    path: '/dashboard/classes',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'schedule',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'logout',
    path: '/logout',
    icon: getIcon(lockFill)
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
];
export const studentSidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Your Profile',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Your Teachers',
    path: '/dashboard/classes',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Schedule',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'logout',
    path: '/logout',
    icon: getIcon(lockFill)
  },
];
