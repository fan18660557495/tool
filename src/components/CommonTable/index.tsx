import React from 'react';
import { Table, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.css';

interface CommonTableProps<T> extends Omit<TableProps<T>, 'className'> {
  columns: ColumnsType<T>;
  dataSource: T[];
  showHeader?: boolean;
  showBorder?: boolean;
}

function CommonTable<T extends Record<string, any>>({
  columns,
  dataSource,
  showHeader = true,
  showBorder = true,
  pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共计 ${total} 条`,
    pageSizeOptions: ['10', '20', '50', '100'],
  },
  size = 'middle',
  ...restProps
}: CommonTableProps<T>) {
  return (
    <Table<T>
      className={styles.commonTable}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      size={size}
      bordered={showBorder}
      showHeader={showHeader}
      tableLayout="auto"
      scroll={{ x: true }}
      {...restProps}
    />
  );
}

export default CommonTable; 