import {
  UngroupOutlined,
  UserOutlined,
  VideoCameraOutlined,
  WarningOutlined,
  CodepenOutlined,
  ExclamationCircleOutlined,
  LayoutOutlined,
  BellOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'dashboard',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Dashboard',
  icon: UngroupOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'users',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'WOW Users',
  icon: UserOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'video_clips',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Video Clips',
  icon: VideoCameraOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'reported_content',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Reported Content',
  icon: WarningOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'category',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Category',
  icon: CodepenOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'info_page',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Info Page',
  icon: ExclamationCircleOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'faq',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'FAQ',
  icon: LayoutOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'push_notification',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Push Notification',
  icon: BellOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'internal_user',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Internal User',
  icon: UserAddOutlined,
  breadcrumb: false,
  submenu: []
}

]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
