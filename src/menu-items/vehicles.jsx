// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'vehicles',
  title: 'Vehicles',
  type: 'group',
  children: [
    // {
    //   id: 'vehicle-data',
    //   title: 'Vehicles Data',
    //   type: 'item',
    //   url: '/vehicles-data',
    //   icon: icons.ChromeOutlined
    // },
    {
      id: 'vehicle-analytics',
      title: 'Vehicles Analytics',
      type: 'item',
      url: '/vehicles-analytics',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
