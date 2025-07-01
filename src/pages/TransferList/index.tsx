import React, { useState } from 'react';
import { Input, Button, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CommonTable from '../../components/CommonTable';
import styles from './index.module.css';

interface TransferRecord {
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

const TransferList: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 模拟数据
  const mockData: TransferRecord[] = Array.from({ length: 50 }, (_, index) => ({
    key: `transfer-${index + 1}`,
    year: 2025,
    month: 12,
    summary: 'xx结转',
    creator: {
      name: '王云霞',
      avatar: 'W'
    },
    createTime: '2025-01-01 10:30:00'
  }));

  const columns = [
    {
      title: '年',
      dataIndex: 'year',
      key: 'year',
      align: 'left' as const,
      sorter: true,
      render: (value: number) => value
    },
    {
      title: '月',
      dataIndex: 'month',
      key: 'month',
      align: 'left' as const,
      sorter: true,
      render: (value: number) => value
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
      align: 'left' as const,
      render: (value: string) => value
    },
    {
      title: '创建人',
      key: 'creator',
      render: (_: any, record: TransferRecord) => (
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
      align: 'left' as const,
      sorter: true,
      render: (value: string) => value
    },
    {
      title: '操作',
      key: 'action',
      align: 'center' as const,
      render: (_: any, record: TransferRecord) => (
        <Button 
          type="link" 
          style={{ color: '#165dff', padding: 0 }}
          onClick={() => navigate(`/transfer-form/edit/${record.key}`)}
        >
          编辑
        </Button>
      ),
    }
  ];

  const breadcrumbItems = [
    {
      title: '主页',
      href: '/home',
      icon: <HomeOutlined />,
    },
    {
      title: '结转列表',
    },
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log('搜索:', value);
  };

  const handleNewTransfer = () => {
    navigate('/transfer-form/new');
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log('表格变化:', { pagination, filters, sorter });
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div className={styles.transferListContainer}>
      {/* 顶部导航 */}
      <Header />
      
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbItems} />

      {/* 主体内容 */}
      <div className={styles.mainContent}>
        {/* 搜索和操作区域 */}
        <div className={styles.operationSection}>
          <div className={styles.searchBox}>
            <Input
              placeholder="搜索"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
              suffix={
                <SearchOutlined 
                  className={styles.searchIcon}
                  onClick={() => handleSearch(searchValue)}
                />
              }
              style={{ width: 228 }}
            />
          </div>
          <div className={styles.actionButtons}>
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleNewTransfer}
              className={styles.newButton}
            >
              新建结转
            </Button>
          </div>
        </div>

        {/* 表格区域 */}
        <div className={styles.tableSection}>
          <CommonTable
            columns={columns}
            dataSource={mockData}
            size="middle"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: mockData.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `共计 ${total} 条`,
              pageSizeOptions: ['10', '20', '50', '100']
            }}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransferList; 