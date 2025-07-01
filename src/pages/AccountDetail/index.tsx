import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Button, Avatar, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, HomeOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './index.module.css';

const { Option } = Select;

const AccountDetail: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '王云霞',
    username: 'admin',
    password: '123456',
    role: '管理员'
  });

  const breadcrumbItems = [
    { title: '主页', href: '/home', icon: <HomeOutlined /> },
    { title: '账户管理', href: '/account-management' },
    { title: '账户详情' }
  ];

  const handleSave = () => {
    message.success('保存成功');
  };

  const handleDelete = () => {
    message.success('删除成功');
    navigate('/account-management');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.accountDetail}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            {/* 头像区域 */}
            <div className={styles.avatarSection}>
              <Avatar size={64} style={{ backgroundColor: '#E8F3FF', color: '#165DFF' }}>
                W
              </Avatar>
            </div>

            {/* 表单字段 */}
            <div className={styles.formField}>
              <label className={styles.label}>姓名</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>用户名</label>
              <Input
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>密码</label>
              <Input.Password
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.label}>角色</label>
              <Select
                value={formData.role}
                onChange={(value) => handleInputChange('role', value)}
                className={styles.select}
                placeholder="请选择"
              >
                <Option value="管理员">管理员</Option>
                <Option value="用户">用户</Option>
                <Option value="访客">访客</Option>
              </Select>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className={styles.buttonGroup}>
            <Button 
              className={styles.deleteButton}
              onClick={handleDelete}
            >
              删除
            </Button>
            <Button 
              type="primary" 
              className={styles.saveButton}
              onClick={handleSave}
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail; 