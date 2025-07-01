import React from 'react';
import { Modal, Button, Table, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.css';

interface ProgressItem {
  key: string;
  category: string;
  status: 'completed' | 'updating';
  detail?: string;
}

interface DataProgressModalProps {
  visible: boolean;
  onClose: () => void;
}

const DataProgressModal: React.FC<DataProgressModalProps> = ({ visible, onClose }) => {
  const progressData: ProgressItem[] = [
    { key: '1', category: '项目字典', status: 'completed' },
    { key: '2', category: '科目字典', status: 'completed' },
    { key: '3', category: '科目字典', status: 'completed' },
    { key: '4', category: '凭证', status: 'updating', detail: '已更新至2025/06/30' },
  ];

  const columns: ColumnsType<ProgressItem> = [
    {
      title: '数据类别',
      dataIndex: 'category',
      key: 'category',
      width: '50%',
    },
    {
      title: '更新进度',
      dataIndex: 'status',
      key: 'status',
      width: '50%',
      render: (status: string, record: ProgressItem) => {
        if (status === 'completed') {
          return (
            <Tag className={styles.completedTag}>
              已完成
            </Tag>
          );
        } else {
          return (
            <div className={styles.updatingContainer}>
              <Tag className={styles.updatingTag}>
                正在更新
              </Tag>
              {record.detail && (
                <span className={styles.detail}>{record.detail}</span>
              )}
            </div>
          );
        }
      },
    },
  ];

  return (
    <Modal
      title="数据更新进度"
      open={visible}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
      width={560}
      centered
      closeIcon={<CloseOutlined />}
    >
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={progressData}
          pagination={false}
          size="middle"
          className={styles.progressTable}
        />
      </div>
    </Modal>
  );
};

export default DataProgressModal; 