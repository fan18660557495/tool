import React from 'react';
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
  const updateData: DataUpdateItem[] = [
    { key: '1', category: '项目字典', updateTime: '2024/01/15 21:00', checked: false },
    { key: '2', category: '科目字典', updateTime: '2024/01/15 21:00', checked: true },
    { key: '3', category: '科目字典', updateTime: '2024/01/30 21:00', checked: false },
    { key: '4', category: '凭证', updateTime: '2024/01/30 21:00', checked: true },
  ];

  const columns: ColumnsType<DataUpdateItem> = [
    {
      title: <Checkbox indeterminate={true} />,
      dataIndex: 'checked',
      width: 38,
      render: (checked: boolean) => (
        <Checkbox checked={checked} />
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
        />
      </div>
    </Modal>
  );
};

export default DataUpdateModal; 