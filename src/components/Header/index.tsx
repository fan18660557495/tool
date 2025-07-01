import React, { useState } from 'react';
import { Dropdown, Menu, Avatar, message } from 'antd';
import { DownOutlined, UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import logoImg from '../../assets/logo.webp';

interface HeaderProps {
  currentAccount?: string;
  userAvatar?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  currentAccount = 'A账套', 
  userAvatar,
  userName = '张'
}) => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState(currentAccount);

  // 账套选择菜单
  const accountMenu = (
    <Menu
      items={[
        { key: 'A', label: 'A账套' },
        { key: 'B', label: 'B账套' },
        { key: 'C', label: 'C账套' },
      ]}
      onClick={({ key }) => {
        setSelectedAccount(`${key}账套`);
        message.success(`已切换到${key}账套`);
      }}
    />
  );

  // 用户菜单
  const userMenu = (
    <Menu
      items={[
        {
          key: 'changePassword',
          label: '修改密码',
          icon: <LockOutlined />,
        },
        {
          key: 'logout',
          label: '退出登录',
          icon: <LogoutOutlined />,
          danger: true,
        },
      ]}
      onClick={({ key }) => {
        if (key === 'changePassword') {
          navigate('/change-password');
        } else if (key === 'logout') {
          message.success('已退出登录');
          navigate('/login');
        }
      }}
    />
  );

  return (
    <header className={styles.header}>
      {/* 左侧 Logo 和标题 */}
      <div className={styles.leftSection}>
        <img src={logoImg} alt="Logo" className={styles.logo} style={{cursor: 'pointer'}} onClick={() => navigate('/home')} />
        <span className={styles.title}>财务工具</span>
      </div>

      {/* 右侧操作区 */}
      <div className={styles.rightSection}>
        {/* 账套选择器 */}
        <div className={styles.accountSelector}>
          <span className={styles.accountLabel}>当前账套：</span>
          <Dropdown overlay={accountMenu} placement="bottomRight">
            <div className={styles.accountDropdown}>
              <span>{selectedAccount}</span>
              <DownOutlined className={styles.dropdownIcon} />
            </div>
          </Dropdown>
        </div>

        {/* 用户头像 */}
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className={styles.userAvatar}>
            <Avatar 
              size={32} 
              style={{ 
                backgroundColor: '#E8F3FF', 
                color: '#165DFF',
                cursor: 'pointer'
              }}
              icon={userAvatar ? undefined : <UserOutlined />}
              src={userAvatar}
            >
              {!userAvatar && userName}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header; 