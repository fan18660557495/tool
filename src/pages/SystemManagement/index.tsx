import React, { useState } from 'react';
import { Tabs, Button, Input, TreeSelect } from 'antd';
import { PlusOutlined, SearchOutlined, HomeOutlined } from '@ant-design/icons';
import type { SortOrder } from 'antd/es/table/interface';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CommonTable from '../../components/CommonTable';
import styles from './index.module.css';

const SystemManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('auxiliary');
  const [auxiliarySearchValue, setAuxiliarySearchValue] = useState('');
  const [projectSearchValue, setProjectSearchValue] = useState('');
  const [subjectSearchValue, setSubjectSearchValue] = useState('');
  const [defaultValueSearchValue, setDefaultValueSearchValue] = useState('');
  const [projectCodeSearchValue, setProjectCodeSearchValue] = useState('');

  // 树形下拉选项数据
  const subjectTreeData = [
    {
      title: '资产类',
      value: 'assets',
      children: [
        {
          title: '1001-现金',
          value: '1001',
        },
        {
          title: '1002-银行存款',
          value: '1002',
        },
        {
          title: '1012-其他货币资金',
          value: '1012',
        },
      ],
    },
    {
      title: '负债类',
      value: 'liabilities',
      children: [
        {
          title: '2001-应付账款',
          value: '2001',
        },
        {
          title: '2201-应付职工薪酬',
          value: '2201',
        },
      ],
    },
  ];

  const defaultValueTreeData = [
    {
      title: '部门',
      value: 'department',
      children: [
        {
          title: '财务部',
          value: 'dept1',
        },
        {
          title: '销售部',
          value: 'dept2',
        },
        {
          title: '技术部',
          value: 'dept3',
        },
        {
          title: '人事部',
          value: 'dept4',
        },
      ],
    },
    {
      title: '往来单位',
      value: 'supplier',
      children: [
        {
          title: '供应商A',
          value: 'supplier1',
        },
        {
          title: '供应商B',
          value: 'supplier2',
        },
        {
          title: '客户A',
          value: 'customer1',
        },
      ],
    },
  ];

  const projectTreeData = [
    {
      title: '内部项目',
      value: 'internal',
      children: [
        {
          title: 'PROJ001',
          value: 'proj1',
        },
        {
          title: 'PROJ002',
          value: 'proj2',
        },
      ],
    },
    {
      title: '协外项目',
      value: 'external',
      children: [
        {
          title: 'EXT001',
          value: 'ext1',
        },
        {
          title: 'EXT002',
          value: 'ext2',
        },
      ],
    },
  ];

  // 过滤树形数据的函数
  const filterTreeData = (data: any[], searchValue: string): any[] => {
    if (!searchValue) return data;
    
    return data.reduce((filtered, node) => {
      const nodeMatches = (node.title as string).toLowerCase().includes(searchValue.toLowerCase());
      const filteredChildren = node.children ? filterTreeData(node.children, searchValue) : [];
      
      if (nodeMatches || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children
        });
      }
      
      return filtered;
    }, []);
  };

  // 自定义下拉渲染
  const renderDropdown = (menu: React.ReactNode, searchValue: string, setSearchValue: (value: string) => void) => (
    <div>
      <div style={{ padding: '8px', borderBottom: '1px solid #e5e6eb' }}>
        <Input
          placeholder="搜索"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{ width: '100%' }}
        />
      </div>
      {menu}
    </div>
  );

  // 辅助默认值表格列配置
  const auxiliaryColumns = [
    {
      title: '年',
      dataIndex: 'year',
      key: 'year',
      align: 'left' as const,
      width: 80,
      sorter: (a: any, b: any) => a.year - b.year,
      sortDirections: ['ascend', 'descend'] as SortOrder[],
    },
    {
      title: '科目编号',
      dataIndex: 'subjectCode',
      key: 'subjectCode',
      align: 'left' as const,
      width: 200,
      render: (value: string, record: any, index: number) => (
        <TreeSelect
          style={{ width: '100%' }}
          value={value === '请选择' ? undefined : value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={filterTreeData(subjectTreeData, subjectSearchValue)}
          placeholder="请选择"
          treeDefaultExpandAll
          bordered={false}
          dropdownRender={(menu) => renderDropdown(menu, subjectSearchValue, setSubjectSearchValue)}
        />
      ),
    },
    {
      title: '辅助类型',
      dataIndex: 'auxiliaryType',
      key: 'auxiliaryType',
      align: 'left' as const,
      width: 120,
    },
    {
      title: '辅助默认值',
      dataIndex: 'auxiliaryValue',
      key: 'auxiliaryValue',
      align: 'left' as const,
      width: 200,
      render: (value: string, record: any, index: number) => (
        <TreeSelect
          style={{ width: '100%' }}
          value={value === '请选择' ? undefined : value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={filterTreeData(defaultValueTreeData, defaultValueSearchValue)}
          placeholder="请选择"
          treeDefaultExpandAll
          bordered={false}
          dropdownRender={(menu) => renderDropdown(menu, defaultValueSearchValue, setDefaultValueSearchValue)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center' as const,
      width: 80,
      render: () => (
        <a style={{ color: '#165dff', padding: 0 }}>编辑</a>
      ),
    },
  ];

  // 协外项目表格列配置
  const projectColumns = [
    {
      title: '年',
      dataIndex: 'year',
      key: 'year',
      align: 'left' as const,
      width: 80,
      sorter: (a: any, b: any) => a.year - b.year,
      sortDirections: ['ascend', 'descend'] as SortOrder[],
    },
    {
      title: '协外项目编号',
      dataIndex: 'projectCode',
      key: 'projectCode',
      align: 'left' as const,
      width: 300,
      render: (value: string, record: any, index: number) => (
        <TreeSelect
          style={{ width: '100%' }}
          value={value === '请选择' ? undefined : value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={filterTreeData(projectTreeData, projectCodeSearchValue)}
          placeholder="请选择"
          treeDefaultExpandAll
          bordered={false}
          dropdownRender={(menu) => renderDropdown(menu, projectCodeSearchValue, setProjectCodeSearchValue)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center' as const,
      width: 80,
      render: () => (
        <a style={{ color: '#165dff', padding: 0 }}>编辑</a>
      ),
    },
  ];

  // 辅助默认值模拟数据
  const auxiliaryData = Array.from({ length: 10 }, (_, index) => ({
    key: `auxiliary_${index}`,
    year: 2025 - (index % 3),
    subjectCode: '请选择',
    auxiliaryType: index === 1 ? '往来单位' : '部门',
    auxiliaryValue: '请选择',
  }));

  // 协外项目模拟数据
  const projectData = Array.from({ length: 10 }, (_, index) => ({
    key: `project_${index}`,
    year: 2025 - (index % 3),
    projectCode: '请选择',
  }));

  const breadcrumbItems = [
    {
      title: '主页',
      href: '/home',
      icon: <HomeOutlined />,
    },
    {
      title: '系统管理',
    },
  ];

  const tabItems = [
    {
      key: 'auxiliary',
      label: '设置辅助默认值',
      children: (
        <div className={styles.tabContent}>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Input
                placeholder="搜索"
                suffix={<SearchOutlined style={{ color: '#4E5969' }} />}
                value={auxiliarySearchValue}
                onChange={(e) => setAuxiliarySearchValue(e.target.value)}
                style={{ width: 228 }}
              />
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              style={{
                borderRadius: '3px',
                background: '#165DFF',
                borderColor: '#165DFF',
              }}
            >
              新建辅助默认值
            </Button>
          </div>
          <CommonTable
            columns={auxiliaryColumns}
            dataSource={auxiliaryData}
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
      ),
    },
    {
      key: 'project',
      label: '设置协外项目',
      children: (
        <div className={styles.tabContent}>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Input
                placeholder="搜索"
                suffix={<SearchOutlined style={{ color: '#4E5969' }} />}
                value={projectSearchValue}
                onChange={(e) => setProjectSearchValue(e.target.value)}
                style={{ width: 228 }}
              />
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              style={{
                borderRadius: '3px',
                background: '#165DFF',
                borderColor: '#165DFF',
              }}
            >
              新建协外项目
            </Button>
          </div>
          <CommonTable
            columns={projectColumns}
            dataSource={projectData}
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
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <div className={styles.content}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className={styles.tabs}
        />
      </div>
    </div>
  );
};

export default SystemManagement; 