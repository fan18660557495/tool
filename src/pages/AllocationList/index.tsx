import React, { useState } from 'react';
import { Input, Button, Avatar, Space } from 'antd';
import { SearchOutlined, SettingOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CommonTable from '../../components/CommonTable';
import styles from './index.module.css';

interface AllocationData {
  key: string;
  year: number;
  month: number;
  summary: string;
  creator: {
    name: string;
    avatar: string;
  };
  createTime: string;
}

const AllocationList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // 模拟数据
  const data: AllocationData[] = Array.from({ length: 10 }, (_, index) => ({
    key: `${index + 1}`,
    year: 2025,
    month: 12,
    summary: 'xx分摊',
    creator: {
      name: '王云霞',
      avatar: 'W',
    },
    createTime: '2025-12-06 14:30:00',
  }));

  const columns: ColumnsType<AllocationData> = [
    {
      title: '年',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
      align: 'left',
    },
    {
      title: '月',
      dataIndex: 'month',
      key: 'month',
      sorter: (a, b) => a.month - b.month,
      align: 'left',
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: '创建人',
      key: 'creator',
      render: (_, record) => (
        <div className={styles.creator}>
          <Avatar size={22} style={{ backgroundColor: '#e8f3ff', color: '#165dff', fontSize: '10px' }}>
            {record.creator.avatar}
          </Avatar>
          <span className={styles.creatorName}>{record.creator.name}</span>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button 
          type="link" 
          style={{ color: '#165dff', padding: 0 }}
          onClick={() => navigate(`/allocation-form/edit/${record.key}`)}
        >
          编辑
        </Button>
      ),
    },
  ];

  const breadcrumbItems = [
    {
      title: '主页',
      href: '/home',
      icon: <HomeOutlined />,
    },
    {
      title: '分摊列表',
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              suffix={<SearchOutlined style={{ color: '#4e5969', cursor: 'pointer' }} />}
              style={{ width: 228 }}
            />
          </div>
          
          <Space size={8}>
            <Button
              icon={<SettingOutlined />}
              className={styles.settingsButton}
              onClick={() => navigate('/allocation-basis-list')}
            >
              设置分摊依据
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className={styles.primaryButton}
              onClick={() => navigate('/allocation-form/new')}
            >
              新建分摊
            </Button>
          </Space>
        </div>

        <CommonTable
          columns={columns}
          dataSource={data}
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

export default AllocationList; 