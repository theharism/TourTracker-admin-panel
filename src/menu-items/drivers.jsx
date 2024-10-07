// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'drivers',
  title: 'Drivers',
  type: 'group',
  children: [
    // {
    //   id: 'driver-data',
    //   title: 'Drivers Data',
    //   type: 'item',
    //   url: '/drivers-data',
    //   icon: icons.ChromeOutlined
    // },
    {
      id: 'driver-analytics',
      title: 'Drivers Analytics',
      type: 'item',
      url: '/drivers-analytics',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
