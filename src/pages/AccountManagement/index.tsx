import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CommonTable from '../../components/CommonTable';
import styles from './index.module.css';

interface AccountData {
  key: string;
  name: string;
  username: string;
  role: string;
}

const AccountManagement: React.FC = () => {
  const navigate = useNavigate();

  // 面包屑数据
  const breadcrumbItems = [
    { title: '主页', href: '/home', icon: <HomeOutlined /> },
    { title: '账户管理' }
  ];

  // 表格列配置
  const columns: ColumnsType<AccountData> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AccountData) => (
        <div className={styles.creator}>
          <Avatar size={22} style={{ backgroundColor: '#e8f3ff', color: '#165dff', fontSize: '10px' }}>
            {record.name.charAt(0)}
          </Avatar>
          <span className={styles.creatorName}>{text}</span>
        </div>
      ),
    },
    {
      title: '账户名称',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: AccountData) => (
        <Button 
          type="link" 
          style={{ color: '#165dff', padding: 0 }}
          onClick={() => navigate(`/account-detail/${record.key}`)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // 表格数据
  const dataSource = [
    {
      key: '1',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '2',
      name: '王云霞',
      username: 'admin',
      role: '财务',
    },
    {
      key: '3',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '4',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '5',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '6',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '7',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '8',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '9',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
    {
      key: '10',
      name: '王云霞',
      username: 'admin',
      role: '管理员',
    },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input
              placeholder="搜索"
              suffix={<SearchOutlined style={{ color: '#4e5969', cursor: 'pointer' }} />}
              style={{ width: 228 }}
            />
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            className={styles.primaryButton}
          >
            新建账户
          </Button>
        </div>

        <CommonTable
          columns={columns}
          dataSource={dataSource}
          size="middle"
          pagination={{
            total: 500,
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共计 ${total} 条`,
          }}
        />
      </div>
    </div>
  );
};

export default AccountManagement; 