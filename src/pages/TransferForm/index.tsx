import React, { useState } from 'react';
import { Input, Select, Button, message, DatePicker, TreeSelect } from 'antd';
import DataUpdateModal from '../../components/DataUpdateModal';
import DataProgressModal from '../../components/DataProgressModal';
import DownloadModal from '../../components/DownloadModal';
import { SearchOutlined, PlusOutlined, HomeOutlined, ReloadOutlined, RobotOutlined, DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import CommonTable from '../../components/CommonTable';
import styles from './index.module.css';

const { Option } = Select;

interface TransferSubjectData {
  key: string;
  sourceSubject: string;
  targetSubject: string;
}

interface TransferProjectData {
  key: string;
  projectCode: string;
  isTransfer: string;
  specifiedAmount: string;
  remainingAmount: string;
  transferPercent: string;
}

interface AuxiliaryData {
  key: string;
  auxiliaryType: string;
  auxiliaryValue: string;
}

interface TransferResultData {
  key: string;
  subjectCode: string;
  projectCode: string;
  direction: string;
  auxiliaryInfo: string;
  transferAmount: number;
}

const TransferForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // 科目树形数据
  const subjectTreeData = [
    {
      title: '1001 - 银行存款',
      value: '1001',
      key: '1001',
      children: [
        {
          title: '100101 - xxx',
          value: '100101',
          key: '100101',
        }
      ]
    },
    {
      title: '1002 - xxx',
      value: '1002',
      key: '1002',
      children: [
        {
          title: '100201 - xxx',
          value: '100201',
          key: '100201',
        },
        {
          title: '100202 - xxx',
          value: '100202',
          key: '100202',
        }
      ]
    }
  ];

  // 辅助值树形数据
  const auxiliaryTreeDataMap = {
    '部门': [
      {
        title: '01050B01 - 部门01',
        value: '01050B01',
        key: '01050B01',
        children: [
          {
            title: '01050B0101 - 部门01',
            value: '01050B0101',
            key: '01050B0101',
          }
        ]
      },
      {
        title: '01050B02 - 部门02',
        value: '01050B02',
        key: '01050B02',
        children: [
          {
            title: '01050B0201 - 部门02',
            value: '01050B0201',
            key: '01050B0201',
          },
          {
            title: '01050B0202 - 部门03',
            value: '01050B0202',
            key: '01050B0202',
          }
        ]
      }
    ],
    '职工': [
      {
        title: '001 - 张三',
        value: '001',
        key: '001',
        children: [
          {
            title: '001001 - 张三（开发）',
            value: '001001',
            key: '001001',
          }
        ]
      },
      {
        title: '002 - 李四',
        value: '002',
        key: '002',
        children: [
          {
            title: '002001 - 李四（设计）',
            value: '002001',
            key: '002001',
          },
          {
            title: '002002 - 李四（测试）',
            value: '002002',
            key: '002002',
          }
        ]
      }
    ],
    '往来单位': [
      {
        title: '1001 - 供应商A',
        value: '1001',
        key: '1001',
        children: [
          {
            title: '100101 - 供应商A分公司',
            value: '100101',
            key: '100101',
          }
        ]
      },
      {
        title: '1002 - 客户B',
        value: '1002',
        key: '1002',
        children: [
          {
            title: '100201 - 客户B华东',
            value: '100201',
            key: '100201',
          },
          {
            title: '100202 - 客户B华南',
            value: '100202',
            key: '100202',
          }
        ]
      }
    ],
    '专项01': [
      {
        title: 'P001 - 项目A',
        value: 'P001',
        key: 'P001',
        children: [
          {
            title: 'P001001 - 项目A阶段1',
            value: 'P001001',
            key: 'P001001',
          }
        ]
      }
    ],
    '专项02': [
      {
        title: 'P002 - 项目B',
        value: 'P002',
        key: 'P002',
        children: [
          {
            title: 'P002001 - 项目B阶段1',
            value: 'P002001',
            key: 'P002001',
          }
        ]
      }
    ],
    '专项03': [
      {
        title: 'P003 - 项目C',
        value: 'P003',
        key: 'P003',
        children: [
          {
            title: 'P003001 - 项目C阶段1',
            value: 'P003001',
            key: 'P003001',
          }
        ]
      }
    ],
    '专项04': [
      {
        title: 'P004 - 项目D',
        value: 'P004',
        key: 'P004',
        children: [
          {
            title: 'P004001 - 项目D阶段1',
            value: 'P004001',
            key: 'P004001',
          }
        ]
      }
    ],
    '专项05': [
      {
        title: 'P005 - 项目E',
        value: 'P005',
        key: 'P005',
        children: [
          {
            title: 'P005001 - 项目E阶段1',
            value: 'P005001',
            key: 'P005001',
          }
        ]
      }
    ],
    '专项06': [
      {
        title: 'P006 - 项目F',
        value: 'P006',
        key: 'P006',
        children: [
          {
            title: 'P006001 - 项目F阶段1',
            value: 'P006001',
            key: 'P006001',
          }
        ]
      }
    ],
    '专项07': [
      {
        title: 'P007 - 项目G',
        value: 'P007',
        key: 'P007',
        children: [
          {
            title: 'P007001 - 项目G阶段1',
            value: 'P007001',
            key: 'P007001',
          }
        ]
      }
    ]
  };
  
  // 表单数据
  const [formData, setFormData] = useState({
    summary: '2025年7月结转xxxx',
    yearMonth: dayjs()
  });

  // 弹窗状态
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // 生成结转科目模拟数据
  const subjectData: TransferSubjectData[] = Array.from({ length: 2 }, (_, index) => ({
    key: `${index + 1}`,
    sourceSubject: '',
    targetSubject: '',
  }));

  // 生成结转项目模拟数据
  const projectData: TransferProjectData[] = Array.from({ length: 2 }, (_, index) => ({
    key: `${index + 1}`,
    projectCode: '',
    isTransfer: '',
    specifiedAmount: '',
    remainingAmount: '',
    transferPercent: '',
  }));

  // 生成辅助默认值模拟数据
  const auxiliaryData: AuxiliaryData[] = [
    { key: '1', auxiliaryType: '部门', auxiliaryValue: '' },
    { key: '2', auxiliaryType: '职工', auxiliaryValue: '' },
    { key: '3', auxiliaryType: '往来单位', auxiliaryValue: '' },
    { key: '4', auxiliaryType: '专项01', auxiliaryValue: '' },
    { key: '5', auxiliaryType: '专项02', auxiliaryValue: '' },
    { key: '6', auxiliaryType: '专项03', auxiliaryValue: '' },
    { key: '7', auxiliaryType: '专项04', auxiliaryValue: '' },
    { key: '8', auxiliaryType: '专项05', auxiliaryValue: '' },
    { key: '9', auxiliaryType: '专项06', auxiliaryValue: '' },
    { key: '10', auxiliaryType: '专项07', auxiliaryValue: '' },
  ];

  // 生成结转结果模拟数据
  const resultData: TransferResultData[] = Array.from({ length: 2 }, (_, index) => ({
    key: `${index + 1}`,
    subjectCode: '0001',
    projectCode: '0001',
    direction: index === 0 ? '借' : '贷',
    auxiliaryInfo: '-',
    transferAmount: 100,
  }));

  // Step2 结转科目表格列配置
  const subjectColumns: ColumnsType<TransferSubjectData> = [
    {
      title: '结转自科目编号',
      dataIndex: 'sourceSubject',
      key: 'sourceSubject',
      align: 'left',
      width: 280,
      render: () => (
        <TreeSelect
          style={{ width: '100%' }}
          placeholder="请选择"
          allowClear
          showSearch
          treeDefaultExpandAll
          treeData={subjectTreeData}
          dropdownStyle={{
            maxHeight: 400,
            overflow: 'auto',
            boxShadow: '0px 4px 10px 0px rgba(78, 89, 105, 0.25)',
            borderRadius: '6px'
          }}
        />
      ),
    },
    {
      title: '结转到科目编号（末级）',
      dataIndex: 'targetSubject',
      key: 'targetSubject',
      align: 'left',
      width: 280,
      render: () => (
        <TreeSelect
          style={{ width: '100%' }}
          placeholder="请选择"
          allowClear
          showSearch
          treeDefaultExpandAll
          treeData={subjectTreeData}
          dropdownStyle={{
            maxHeight: 400,
            overflow: 'auto',
            boxShadow: '0px 4px 10px 0px rgba(78, 89, 105, 0.25)',
            borderRadius: '6px'
          }}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 80,
      render: () => (
        <Button type="link" style={{ color: '#165dff', padding: 0 }}>
          删除
        </Button>
      ),
    },
  ];

  // Step3 结转项目表格列配置（多行表头）
  const projectColumns: ColumnsType<TransferProjectData> = [
    {
      title: '项目编号',
      dataIndex: 'projectCode',
      key: 'projectCode',
      align: 'left',
      width: 200,
      render: () => (
        <Select
          style={{ width: '100%' }}
          placeholder="请选择"
        />
      ),
    },
    {
      title: '结转否',
      dataIndex: 'isTransfer',
      key: 'isTransfer',
      align: 'left',
      width: 120,
      render: () => (
        <Select
          style={{ width: '100%' }}
          placeholder="请选择"
        >
          <Option value="是">是</Option>
          <Option value="否">否</Option>
        </Select>
      ),
    },
    {
      title: '结转金额类型三选一，如果全部金额结转、指定总额结转、排除项目则不需要填写',
      children: [
        {
          title: '指定结转金额',
          dataIndex: 'specifiedAmount',
          key: 'specifiedAmount',
          align: 'right',
          sorter: true,
          render: () => (
            <Input
              placeholder="请输入"
              style={{ textAlign: 'right' }}
            />
          ),
        },
        {
          title: '指定结转后剩余金额',
          dataIndex: 'remainingAmount',
          key: 'remainingAmount',
          align: 'right',
          sorter: true,
          render: () => (
            <Input
              placeholder="请输入"
              style={{ textAlign: 'right' }}
            />
          ),
        },
        {
          title: '指定结转百分比',
          dataIndex: 'transferPercent',
          key: 'transferPercent',
          align: 'right',
          sorter: true,
          render: () => (
            <Input
              placeholder="请输入"
              style={{ textAlign: 'right' }}
            />
          ),
        },
      ],
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 80,
      render: () => (
        <Button type="link" style={{ color: '#165dff', padding: 0 }}>
          删除
        </Button>
      ),
    },
  ];

  // Step4 辅助默认值表格列配置
  const auxiliaryColumns: ColumnsType<AuxiliaryData> = [
    {
      title: '辅助类型',
      dataIndex: 'auxiliaryType',
      key: 'auxiliaryType',
      align: 'left',
    },
    {
      title: '辅助值',
      dataIndex: 'auxiliaryValue',
      key: 'auxiliaryValue',
      align: 'left',
      width: 280,
      render: (value, record, index) => {
        // 所有辅助类型都使用树形选择器，根据辅助类型选择对应的数据
        const treeData = auxiliaryTreeDataMap[record.auxiliaryType as keyof typeof auxiliaryTreeDataMap] || [];
        
        return (
          <TreeSelect
            style={{ width: '100%' }}
            placeholder="请选择"
            allowClear
            showSearch
            treeDefaultExpandAll
            treeData={treeData}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
              boxShadow: '0px 4px 10px 0px rgba(78, 89, 105, 0.25)',
              borderRadius: '6px'
            }}
          />
        );
      },
    },
  ];

  // Step6 结转结果表格列配置
  const resultColumns: ColumnsType<TransferResultData> = [
    {
      title: '科目编号',
      dataIndex: 'subjectCode',
      key: 'subjectCode',
      align: 'left',
      sorter: true,
    },
    {
      title: '项目编号',
      dataIndex: 'projectCode',
      key: 'projectCode',
      align: 'left',
      sorter: true,
    },
    {
      title: '记账方向',
      dataIndex: 'direction',
      key: 'direction',
      align: 'left',
    },
    {
      title: '辅助信息',
      dataIndex: 'auxiliaryInfo',
      key: 'auxiliaryInfo',
      align: 'left',
    },
    {
      title: '结转金额',
      dataIndex: 'transferAmount',
      key: 'transferAmount',
      align: 'right',
      sorter: true,
    },
  ];

  const breadcrumbItems = [
    {
      title: '主页',
      href: '/home',
      icon: <HomeOutlined />,
    },
    {
      title: '结转列表',
      href: '/transfer-list',
    },
    {
      title: '结转表单',
    },
  ];

  const handleSave = () => {
    message.success('保存成功');
  };

  const handleDelete = () => {
    message.success('删除成功');
    navigate('/transfer-list');
  };

  const handleAddSubject = () => {
    message.info('新建结转科目');
  };

  const handleAddProject = () => {
    message.info('新建结转项目');
  };

  const handleStartTransfer = () => {
    message.info('开始结转');
  };

  const handleRobotImport = () => {
    message.info('使用机器人导入记账单');
  };

  const handleDownload = () => {
    setDownloadModalVisible(true);
  };

  const handleTransfer = () => {
    message.info('结转');
  };

  // 数据更新相关处理函数
  const handleUpdateData = () => {
    setUpdateModalVisible(true);
  };

  const handleConfirmUpdate = () => {
    setUpdateModalVisible(false);
    setIsUpdating(true);
    message.success('开始更新数据源');
  };

  const handleCancelUpdate = () => {
    setUpdateModalVisible(false);
  };

  const handleViewProgress = () => {
    setProgressModalVisible(true);
  };

  const handleCloseProgress = () => {
    setProgressModalVisible(false);
  };

  const handleCloseDownload = () => {
    setDownloadModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.content}>
        {/* 数据源更新提示 */}
        <div className={styles.updateNotice}>
          <div className={styles.updateContent}>
            <ReloadOutlined className={styles.updateIcon} />
            <span className={styles.updateText}>
              {isUpdating ? '数据源更新中' : '数据源更新于2025/06/30 10:49'}
            </span>
          </div>
          <span 
            className={styles.updateLink}
            onClick={isUpdating ? handleViewProgress : handleUpdateData}
          >
            {isUpdating ? '点击查看进度' : '点击此处更新'}
          </span>
        </div>

        {/* Step 1: 填写结转基础信息 */}
        <div className={styles.stepSection}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>第一步</span>
            <span className={styles.stepTitle}>填写结转基础信息</span>
            <Button 
              type="primary" 
              icon={<DownloadOutlined />}
              className={styles.stepButton}
            >
              Excel导入
            </Button>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formItem}>
              <label>摘要</label>
              <Input
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>
            <div className={styles.formItem}>
              <label>年月</label>
              <DatePicker
                picker="month"
                style={{ width: '100%' }}
                placeholder="2025/07"
                value={formData.yearMonth}
                onChange={(date) => setFormData({ ...formData, yearMonth: date || dayjs() })}
              />
            </div>
          </div>
        </div>

        {/* Step 2: 设置结转科目 */}
        <div className={styles.stepSection}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>第二步</span>
            <span className={styles.stepTitle}>设置结转科目</span>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className={styles.stepButton}
              onClick={handleAddSubject}
            >
              新建结转科目
            </Button>
          </div>
          <CommonTable
            columns={subjectColumns}
            dataSource={subjectData}
            pagination={{
              current: 1,
              pageSize: 10,
              total: 2,
              showSizeChanger: true,
              showQuickJumper: false,
              size: 'default',
            }}
          />
        </div>

        {/* Step 3: 设置结转项目 */}
        <div className={styles.stepSection}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>第三步</span>
            <span className={styles.stepTitle}>设置结转项目</span>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className={styles.stepButton}
              onClick={handleAddProject}
            >
              新建结转项目
            </Button>
          </div>
          <CommonTable
            columns={projectColumns}
            dataSource={projectData}
            pagination={{
              current: 1,
              pageSize: 10,
              total: 2,
              showSizeChanger: true,
              showQuickJumper: false,
              size: 'default',
            }}
          />
        </div>

        {/* Step 4: 确定辅助默认值 */}
        <div className={styles.stepSection}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>第四步</span>
            <span className={styles.stepTitle}>确定辅助默认值</span>
          </div>
          <CommonTable
            columns={auxiliaryColumns}
            dataSource={auxiliaryData}
            pagination={{
              current: 1,
              pageSize: 10,
              total: 10,
              showSizeChanger: true,
              showQuickJumper: false,
              size: 'default',
            }}
          />
        </div>

        {/* Step 5: 开始结转 */}
        <div className={styles.stepSection}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>第五步</span>
            <span className={styles.stepTitle}>开始结转</span>
          </div>
          <div className={styles.allocationButtonContainer}>
            <Button 
              type="primary" 
              size="large"
              className={styles.allocationButton}
              onClick={handleStartTransfer}
            >
              开始结转
            </Button>
          </div>
        </div>

        {/* Step 6: 结转结果 */}
        <div className={styles.stepSection}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>第六步</span>
            <span className={styles.stepTitle}>结转结果</span>
            <div className={styles.resultActions}>
              <Button 
                icon={<RobotOutlined />}
                onClick={handleRobotImport}
              >
                使用机器人导入记账单
              </Button>
              <Button 
                icon={<DownloadOutlined />}
                onClick={handleDownload}
              >
                下载记账单
              </Button>
            </div>
          </div>
          <div className={styles.resultControls}>
            <div className={styles.resultSearch}>
              <Input
                placeholder="搜索"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <Button 
              type="primary"
              onClick={handleTransfer}
            >
              结转
            </Button>
          </div>
          <CommonTable
            columns={resultColumns}
            dataSource={resultData}
            pagination={{
              current: 1,
              pageSize: 10,
              total: 2,
              showSizeChanger: true,
              showQuickJumper: false,
              size: 'default',
            }}
          />
        </div>
      </div>

      {/* 固定底部按钮 */}
      <div className={styles.fixedBottom}>
        <div className={styles.bottomActions}>
          <Button
            size="large"
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            删除
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleSave}
            className={styles.saveButton}
          >
            保存
          </Button>
        </div>
      </div>

      {/* 数据更新确认弹窗 */}
      <DataUpdateModal
        visible={updateModalVisible}
        onOk={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
      />

      {/* 数据更新进度弹窗 */}
      <DataProgressModal
        visible={progressModalVisible}
        onClose={handleCloseProgress}
      />

      {/* 下载记账单弹窗 */}
      <DownloadModal
        visible={downloadModalVisible}
        onClose={handleCloseDownload}
      />
    </div>
  );
};

export default TransferForm; 