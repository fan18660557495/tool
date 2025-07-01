import React, { useState } from 'react';
import { Input, Button, Upload, message, DatePicker } from 'antd';
import { HomeOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CommonTable from '../../components/CommonTable';
import styles from './index.module.css';

interface DetailData {
  key: string;
  projectCode: string;
  workHours: number;
  category: string;
}

const AllocationBasisForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id; // 是否为编辑模式

  // 生成自动编号
  const generateCode = () => {
    const timestamp = Date.now().toString().slice(-4);
    return `FB${timestamp}`;
  };

  // 年份选择器默认值
  const getDefaultYear = () => {
    return isEdit ? dayjs('2025') : dayjs();
  };

  // 表单字段状态
  const [formData, setFormData] = useState({
    code: isEdit ? '001' : generateCode(), // 自动生成编号
    nickname: isEdit ? 'xxx分摊依据' : '',
    year: getDefaultYear(), // 使用dayjs对象
  });

  // 明细数据
  const [detailData, setDetailData] = useState<DetailData[]>(
    isEdit ? [
      { key: '1', projectCode: '001', workHours: 100, category: '科研' },
      { key: '2', projectCode: '002', workHours: 100, category: '科研' },
      { key: '3', projectCode: '003', workHours: 100, category: '科研' },
      { key: '4', projectCode: '004', workHours: 100, category: '科研' },
      { key: '5', projectCode: '005', workHours: 100, category: '协外' },
    ] : []
  );

  // 明细表格列配置
  const detailColumns: ColumnsType<DetailData> = [
    {
      title: '项目编号',
      dataIndex: 'projectCode',
      key: 'projectCode',
      sorter: (a, b) => a.projectCode.localeCompare(b.projectCode),
      align: 'left',
      width: 200,
    },
    {
      title: '工时',
      dataIndex: 'workHours',
      key: 'workHours',
      sorter: (a, b) => a.workHours - b.workHours,
      align: 'left',
      width: 150,
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
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
          onClick={() => handleDeleteDetail(record.key)}
        >
          删除
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
      href: '/allocation-basis-list',
    },
    {
      title: isEdit ? '编辑分摊依据' : '新建分摊依据',
    },
  ];

  // 处理表单字段变化
  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 处理年份变化
  const handleYearChange = (date: dayjs.Dayjs | null) => {
    setFormData(prev => ({ ...prev, year: date || dayjs() }));
  };

  // 处理Excel上传
  const handleUpload = (file: File) => {
    console.log('上传文件:', file);
    message.success('文件上传成功');
    // 这里可以添加解析Excel并更新明细数据的逻辑
    return false; // 阻止默认上传行为
  };

  // 删除明细行
  const handleDeleteDetail = (key: string) => {
    setDetailData(prev => prev.filter(item => item.key !== key));
  };

  // 删除整个表单
  const handleDelete = () => {
    if (!isEdit) {
      message.warning('新建状态下无法删除');
      return;
    }
    // 这里添加删除逻辑
    message.success('删除成功');
    navigate('/allocation-basis-list');
  };

  // 保存表单
  const handleSave = () => {
    if (!formData.code || !formData.nickname || !formData.year) {
      message.error('请填写完整的基本信息');
      return;
    }
    
    // 这里添加保存逻辑
    console.log('保存数据:', {
      ...formData,
      year: formData.year.year() // 获取年份数值
    });
    message.success(isEdit ? '保存成功' : '创建成功');
    navigate('/allocation-basis-list');
  };

  return (
    <div className={styles.container}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.content}>
        {/* 基本信息部分 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIndicator} />
            <span className={styles.sectionTitle}>基本信息</span>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>分摊依据编号</label>
              <Input
                value={formData.code}
                disabled
                placeholder="自动生成"
                style={{ borderRadius: '3px', backgroundColor: '#f7f8fa', color: '#86909c' }}
              />
            </div>
            
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>名称</label>
              <Input
                value={formData.nickname}
                onChange={(e) => handleFormChange('nickname', e.target.value)}
                placeholder="请输入名称"
                style={{ borderRadius: '3px' }}
              />
            </div>
            
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>年</label>
              <DatePicker
                value={formData.year}
                onChange={handleYearChange}
                picker="year"
                placeholder="请选择年份"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* 分摊依据明细部分 */}
        <div className={styles.section}>
          <div className={styles.detailHeader}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIndicator} />
              <span className={styles.sectionTitle}>分摊依据明细</span>
            </div>
            
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              accept=".xlsx,.xls"
            >
              <Button 
                type="primary" 
                icon={<UploadOutlined />}
                className={styles.uploadButton}
              >
                Excel上传
              </Button>
            </Upload>
          </div>

          <CommonTable
            columns={detailColumns}
            dataSource={detailData}
            size="middle"
            pagination={{
              total: detailData.length || 0,
              current: 1,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共计 ${total} 条`,
              className: styles.pagination,
            }}
          />
        </div>

        {/* 底部操作按钮 */}
        <div className={styles.footer}>
          <Button 
            onClick={handleDelete}
            className={styles.deleteButton}
            disabled={!isEdit}
          >
            删除
          </Button>
          <Button 
            type="primary" 
            onClick={handleSave}
            className={styles.saveButton}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllocationBasisForm; 