// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'tours',
  title: 'Tours',
  type: 'group',
  children: [
    {
      id: 'tour-booking-data',
      title: 'Tour Bookings',
      type: 'item',
      url: '/tour-bookings',
      icon: icons.ChromeOutlined
    },
    {
      id: 'office-post-tours-data',
      title: 'Office Post Tours',
      type: 'item',
      url: '/office-post-tours',
      icon: icons.ChromeOutlined
    },
    {
      id: 'driver-post-tours-data',
      title: 'Driver Post Tours',
      type: 'item',
      url: '/driver-post-tours',
      icon: icons.ChromeOutlined
    },
    {
      id: 'tours-analytics',
      title: 'Tours Analytics',
      type: 'item',
      url: '/tours-analytics',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
