// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'user-data',
      title: 'Users',
      type: 'item',
      url: '/users-data',
      icon: icons.ChromeOutlined
    },
    {
      id: 'user-analytics',
      title: 'Users Analytics',
      type: 'item',
      url: '/users-analytics',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
