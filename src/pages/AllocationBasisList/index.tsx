import React, { useState } from 'react';
import { Input, Button, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CommonTable from '../../components/CommonTable';
import styles from './index.module.css';

interface AllocationBasisData {
  key: string;
  id: string;
  name: string;
  year: number;
  creator: {
    name: string;
    avatar: string;
  };
  createTime: string;
}

const AllocationBasisList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // 模拟数据
  const data: AllocationBasisData[] = Array.from({ length: 10 }, (_, index) => ({
    key: `${index + 1}`,
    id: `000${index + 1}`,
    name: 'xx分摊依据名称',
    year: 2025,
    creator: {
      name: '王云霞',
      avatar: 'W',
    },
    createTime: '2025',
  }));

  const columns: ColumnsType<AllocationBasisData> = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
      align: 'left',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: 200,
    },
    {
      title: '年',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
      align: 'left',
      width: 100,
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
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => a.createTime.localeCompare(b.createTime),
      align: 'left',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <Button 
          type="link" 
          style={{ color: '#165dff', padding: 0 }}
          onClick={() => navigate(`/allocation-basis-form/edit/${record.id}`)}
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
      href: '/allocation-list',
    },
    {
      title: '分摊依据列表',
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
          
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className={styles.primaryButton}
            onClick={() => navigate('/allocation-basis-form/new')}
          >
            新建分摊依据
          </Button>
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

export default AllocationBasisList; 