import React, { useState } from 'react';
import { Modal, Button, Table, Checkbox } from 'antd';
import { CloseOutlined, DownloadOutlined, CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.css';

interface TreeTableData {
  key: string;
  sourceSubject: string;
  targetSubject: string;
  children?: TreeTableData[];
  isParent?: boolean;
}

interface DownloadModalProps {
  visible: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ visible, onClose }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(['1']);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>(['1']);

  // 树形表格数据
  const treeTableData: TreeTableData[] = [
    {
      key: '1',
      sourceSubject: '1001-银行存款',
      targetSubject: '1001-银行存款',
      isParent: true,
      children: [
        {
          key: '1-1',
          sourceSubject: '100101-xxx',
          targetSubject: '100101-xxx',
        },
        {
          key: '1-2',
          sourceSubject: '100102-xxx',
          targetSubject: '100102-xxx',
        }
      ]
    },
    {
      key: '2',
      sourceSubject: '1002-xxx',
      targetSubject: '1002-xxx',
      isParent: true,
      children: [
        {
          key: '2-1',
          sourceSubject: '100201-xxx',
          targetSubject: '100201-xxx',
        }
      ]
    }
  ];

  // 获取所有行的key（包括子行）
  const getAllRowKeys = (data: TreeTableData[]): React.Key[] => {
    const keys: React.Key[] = [];
    const traverse = (items: TreeTableData[]) => {
      items.forEach(item => {
        keys.push(item.key);
        if (item.children && item.children.length > 0) {
          traverse(item.children);
        }
      });
    };
    traverse(data);
    return keys;
  };

  // 获取子行的key
  const getChildKeys = (parentKey: string, data: TreeTableData[]): React.Key[] => {
    const keys: React.Key[] = [];
    const findItem = (items: TreeTableData[]) => {
      for (const item of items) {
        if (item.key === parentKey) {
          if (item.children) {
            item.children.forEach(child => {
              keys.push(child.key);
              if (child.children) {
                keys.push(...getChildKeys(child.key, data));
              }
            });
          }
          return;
        }
        if (item.children) {
          findItem(item.children);
        }
      }
    };
    findItem(data);
    return keys;
  };

  // 获取父级key
  const getParentKey = (childKey: string, data: TreeTableData[]): string | null => {
    const findParent = (items: TreeTableData[], parent: string | null = null): string | null => {
      for (const item of items) {
        if (item.key === childKey) {
          return parent;
        }
        if (item.children) {
          const result = findParent(item.children, item.key);
          if (result !== null) return result;
        }
      }
      return null;
    };
    return findParent(data);
  };

  // 处理复选框选择
  const handleCheckboxChange = (key: string, checked: boolean) => {
    let newSelectedKeys = [...selectedRowKeys];

    if (checked) {
      // 添加当前key
      if (!newSelectedKeys.includes(key)) {
        newSelectedKeys.push(key);
      }
      // 添加所有子级key
      const childKeys = getChildKeys(key, treeTableData);
      childKeys.forEach(childKey => {
        if (!newSelectedKeys.includes(childKey)) {
          newSelectedKeys.push(childKey);
        }
      });
    } else {
      // 移除当前key
      newSelectedKeys = newSelectedKeys.filter(k => k !== key);
      // 移除所有子级key
      const childKeys = getChildKeys(key, treeTableData);
      newSelectedKeys = newSelectedKeys.filter(k => !childKeys.includes(k));
    }

    // 检查父级是否需要更新
    const parentKey = getParentKey(key, treeTableData);
    if (parentKey) {
      const siblingKeys = getChildKeys(parentKey, treeTableData);
      const selectedSiblings = siblingKeys.filter(k => newSelectedKeys.includes(k));
      
      if (selectedSiblings.length === siblingKeys.length && !newSelectedKeys.includes(parentKey)) {
        // 所有子级都被选中，选中父级
        newSelectedKeys.push(parentKey);
      } else if (selectedSiblings.length === 0 && newSelectedKeys.includes(parentKey)) {
        // 所有子级都未被选中，取消选中父级
        newSelectedKeys = newSelectedKeys.filter(k => k !== parentKey);
      }
    }

    setSelectedRowKeys(newSelectedKeys);
  };

  // 处理全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowKeys(getAllRowKeys(treeTableData));
    } else {
      setSelectedRowKeys([]);
    }
  };

  // 计算全选状态
  const allRowKeys = getAllRowKeys(treeTableData);
  const isAllSelected = allRowKeys.length > 0 && allRowKeys.every(key => selectedRowKeys.includes(key));
  const isIndeterminate = selectedRowKeys.length > 0 && !isAllSelected;

  // 处理展开折叠
  const handleExpandClick = (key: string) => {
    if (expandedRowKeys.includes(key)) {
      setExpandedRowKeys(expandedRowKeys.filter(k => k !== key));
    } else {
      setExpandedRowKeys([...expandedRowKeys, key]);
    }
  };

  // 渲染树形图标
  const renderTreeIcon = (record: TreeTableData) => {
    if (!record.isParent || !record.children || record.children.length === 0) {
      return <span style={{ width: 18, display: 'inline-block' }} />;
    }
    
    const expanded = expandedRowKeys.includes(record.key);
    return (
      <span 
        style={{ 
          width: 18, 
          display: 'inline-flex', 
          justifyContent: 'center',
          cursor: 'pointer',
          marginRight: 4,
          color: '#4E5969'
        }}
        onClick={() => handleExpandClick(record.key)}
      >
        {expanded ? <CaretDownOutlined /> : <CaretRightOutlined />}
      </span>
    );
  };

  // 表格列配置
  const columns: ColumnsType<TreeTableData> = [
    {
      title: (
        <Checkbox
          indeterminate={isIndeterminate}
          checked={isAllSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      key: 'checkbox',
      width: 38,
      render: (_, record) => {
        const childKeys = getChildKeys(record.key, treeTableData);
        const isIndeterminate = childKeys.length > 0 && 
          childKeys.some(key => selectedRowKeys.includes(key)) && 
          !childKeys.every(key => selectedRowKeys.includes(key));
        
        return (
          <Checkbox
            indeterminate={isIndeterminate}
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
          />
        );
      },
    },
    {
      title: '来源科目',
      dataIndex: 'sourceSubject',
      key: 'sourceSubject',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderTreeIcon(record)}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '去向科目',
      dataIndex: 'targetSubject',
      key: 'targetSubject',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderTreeIcon(record)}
          <span>{text}</span>
        </div>
      ),
    },
  ];

  const handleDownload = () => {
    console.log('下载选中的记账单:', selectedRowKeys);
    onClose();
  };

  return (
    <Modal
      title="下载记账单"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={560}
      closeIcon={<CloseOutlined />}
      className={styles.downloadModal}
    >
      <div className={styles.content}>
        <div className={styles.tableContainer}>
                    <Table
            columns={columns}
            dataSource={treeTableData}
            pagination={false}
            rowClassName={(record) => record.key === '1' ? styles.selectedRow : ''}
            expandable={{
              expandedRowKeys,
              onExpandedRowsChange: () => {}, // 禁用默认的展开控制
              expandIcon: () => null, // 隐藏默认展开图标
              childrenColumnName: 'children',
            }}
          />
        </div>
        <div className={styles.actions}>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            下载为Excel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal; 