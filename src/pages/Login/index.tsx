import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import logoImg from '../../assets/logo.webp';
import loginBg from '../../assets/login-bg.webp';

interface LoginFormValues {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<LoginFormValues>({
    username: '',
    password: ''
  });

  // 检查是否可以提交表单
  const canSubmit = (formValues.username || '').trim() !== '' && (formValues.password || '').trim() !== '';

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // 这里是登录逻辑，暂时用 mock 数据
      console.log('登录信息:', values);
      
      // 模拟登录验证
      if (values.username && values.password) {
        message.success('登录成功，正在跳转...');
        
        // 延迟跳转，让用户看到成功提示
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        message.error('请输入用户名和密码');
      }
    } catch (error) {
      message.error('登录失败');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // 监听表单值变化
  const onValuesChange = (changedValues: Partial<LoginFormValues>, allValues: LoginFormValues) => {
    setFormValues({
      username: allValues.username || '',
      password: allValues.password || ''
    });
  };

  return (
    <div className={styles.loginContainer}>
      {/* 左侧登录表单 */}
      <div className={styles.leftSection}>
        <div className={styles.loginForm}>
          {/* Logo 和标题 */}
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <img src={logoImg} alt="Logo" className={styles.logo} />
            </div>
            <h1 className={styles.title}>财务工具</h1>
          </div>

          {/* 登录表单 */}
          <Form
            form={form}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            layout="vertical"
            className={styles.form}
            initialValues={{ username: '', password: '' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="请输入密码"
                iconRender={(visible) => 
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!canSubmit}
                className={styles.submitBtn}
                block
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      
      {/* 右侧背景图 */}
      <div className={styles.rightSection}>
        <img src={loginBg} alt="财务工具" className={styles.bgImage} />
      </div>
    </div>
  );
};

export default Login; 