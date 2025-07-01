import React, { useState } from 'react';
import { Input, Button, Avatar, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, HomeOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './index.module.css';

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const breadcrumbItems = [
    { title: '主页', href: '/home', icon: <HomeOutlined /> },
    { title: '修改密码' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      message.warning('请填写完整信息');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      message.error('两次输入的新密码不一致');
      return;
    }
    message.success('密码修改成功');
    setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className={styles.changePassword}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <div className={styles.avatarSection}>
              <Avatar size={64} style={{ backgroundColor: '#E8F3FF', color: '#165DFF' }} icon={<LockOutlined />} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>原密码</label>
              <Input.Password
                value={formData.oldPassword}
                onChange={e => handleInputChange('oldPassword', e.target.value)}
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                className={styles.input}
                placeholder="请输入原密码"
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>新密码</label>
              <Input.Password
                value={formData.newPassword}
                onChange={e => handleInputChange('newPassword', e.target.value)}
                className={styles.input}
                placeholder="请输入新密码"
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>确认新密码</label>
              <Input.Password
                value={formData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                className={styles.input}
                placeholder="请再次输入新密码"
              />
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <Button type="primary" className={styles.saveButton} onClick={handleSave}>
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword; 