// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'companies',
  title: 'Companies',
  type: 'group',
  children: [
    {
      id: 'company-data',
      title: 'Companies',
      type: 'item',
      url: '/companies-data',
      icon: icons.ChromeOutlined
    },
    {
      id: 'company-analytics',
      title: 'Companies Analytics',
      type: 'item',
      url: '/companies-analytics',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
