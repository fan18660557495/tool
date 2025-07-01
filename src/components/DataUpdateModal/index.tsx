import React, { useState } from 'react';
import { Modal, Button, Table, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.css';

interface DataUpdateItem {
  key: string;
  category: string;
  updateTime: string;
  checked: boolean;
}

interface DataUpdateModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const DataUpdateModal: React.FC<DataUpdateModalProps> = ({ visible, onOk, onCancel }) => {
  const [updateData, setUpdateData] = useState<DataUpdateItem[]>([
    { key: '1', category: '项目字典', updateTime: '2024/01/15 21:00', checked: false },
    { key: '2', category: '科目字典', updateTime: '2024/01/15 21:00', checked: true },
    { key: '3', category: '科目字典', updateTime: '2024/01/30 21:00', checked: false },
    { key: '4', category: '凭证', updateTime: '2024/01/30 21:00', checked: true },
  ]);

  // 全选状态
  const allChecked = updateData.every(item => item.checked);
  const indeterminate = updateData.some(item => item.checked) && !allChecked;

  // 单个复选框切换
  const handleCheckboxChange = (key: string, checked: boolean) => {
    setUpdateData(prev => prev.map(item => item.key === key ? { ...item, checked } : item));
  };

  // 全选切换
  const handleAllChange = (checked: boolean) => {
    setUpdateData(prev => prev.map(item => ({ ...item, checked })));
  };

  const columns: ColumnsType<DataUpdateItem> = [
    {
      title: <Checkbox indeterminate={indeterminate} checked={allChecked} onChange={e => handleAllChange(e.target.checked)} />,
      dataIndex: 'checked',
      width: 38,
      render: (_: boolean, record: DataUpdateItem) => (
        <Checkbox checked={record.checked} onChange={e => handleCheckboxChange(record.key, e.target.checked)} />
      ),
    },
    {
      title: '数据类别',
      dataIndex: 'category',
      render: (text: string) => text,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: (text: string) => text,
    },
  ];

  return (
    <Modal
      title="数据更新"
      open={visible}
      onCancel={onCancel}
      footer={
        <div className={styles.footer}>
          <Button type="primary" onClick={onOk} className={styles.confirmButton}>
            开始更新
          </Button>
        </div>
      }
      className={styles.modal}
      width={560}
      closeIcon={<CloseOutlined />}
    >
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={updateData}
          pagination={false}
          className={styles.updateTable}
          size="middle"
          rowClassName={(record) => record.checked ? 'selected-row' : ''}
        />
      </div>
    </Modal>
  );
};

export default DataUpdateModal; 