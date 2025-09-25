'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Button, Input, Select, Row, Col, Space, Typography, Switch, Popconfirm } from 'antd';
import {
  StarOutlined,
  HeartOutlined,
  CheckOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface ServiceRow {
  id: number;
  order: number;
  icon: string;
  description: string;
  lang: string;
  visible: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  'star': <StarOutlined style={{ marginRight: 8 }} />,
  'heart': <HeartOutlined style={{ marginRight: 8 }} />,
  'check': <CheckOutlined style={{ marginRight: 8 }} />,
  'user': <UserOutlined style={{ marginRight: 8 }} />,
};


const initialServices: ServiceRow[] = [
  { id: 1, order: 1, icon: 'star', description: 'High quality programs', lang: 'en', visible: true },
  { id: 2, order: 2, icon: 'heart', description: 'Trusted by many', lang: 'en', visible: true},
  { id: 3, order: 1, icon: 'star', description: 'Բարձրորակ ծրագրեր', lang: 'am', visible: true },
  { id: 4, order: 2, icon: 'heart', description: 'Վստահելի գործընկեր', lang: 'am', visible: true },
  { id: 5, order: 1, icon: 'star', description: 'Высокое качество', lang: 'ru', visible: true },
  { id: 6, order: 2, icon: 'heart', description: 'Надёжный партнёр', lang: 'ru', visible: true },
];

export function Fields() {
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [services, setServices] = useState<ServiceRow[]>(
    initialServices.filter(service => service.lang === 'en')
  );

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    const filtered = initialServices.filter(service => service.lang === lang);
    setServices(filtered);
  };

  const addServiceRow = () => {
    const maxId = Math.max(0, ...initialServices.map(s => s.id), ...services.map(s => s.id));
    const nextOrder = services.length > 0 ? services[services.length - 1].order + 1 : 1;
    const newRow: ServiceRow = {
      id: maxId + 1,
      order: nextOrder,
      icon: '',
      description: '',
      lang: selectedLang,
      visible: true,
    };
    setServices([...services, newRow]);
  };

 const deleteServiceRow = (id: number) => {
  const deletedRow = services.find(row => row.id === id);
  if (deletedRow) {
    console.log('Deleted service:', deletedRow);
  }
  setServices(services.filter(row => row.id !== id));
};

  const updateServiceRow = (id: number, key: keyof ServiceRow, value: string | number | boolean) => {
    setServices(services.map(row => row.id === id ? { ...row, [key]: value } : row));
  };

  const saveServiceRow = (row: ServiceRow) => {
    console.log('Saved service:', row);
  };

  return (
    <Space direction="vertical" className="w-full" style={{ width: '100%' }}>

      <Select
        value={selectedLang}
        style={{ width: 120 }}
        onChange={handleLangChange}
        options={[
          { value: 'en', label: 'English' },
          { value: 'am', label: 'Armenian' },
          { value: 'ru', label: 'Russian' },
        ]}
      />

 
      {services.map((row) => (
        <div
          key={row.id}
          style={{
            border: '1px solid #eee',
            padding: '16px',
            borderRadius: 6,
            marginBottom: 12,
            backgroundColor: '#fafafa',
          }}
        >
          <Row gutter={16} align="middle" style={{ marginBottom: 12 }}>
            <Col span={2}>
              <Input
                type="number"
                value={row.order}
                onChange={e => updateServiceRow(row.id, 'order', Number(e.target.value))}
                placeholder="Order"
              />
            </Col>
            <Col span={3}>
              <Input
                value={row.icon}
                onChange={e => updateServiceRow(row.id, 'icon', e.target.value)}
                placeholder="Icon (e.g. star, heart)"
              />
            </Col>
            <Col span={10}>
              <TextArea
                value={row.description}
                onChange={e => updateServiceRow(row.id, 'description', e.target.value)}
                placeholder="Description"
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Col>
            <Col span={2}>
              <Space>
                <Button type="primary" onClick={() => saveServiceRow(row)}>
                  Save
                </Button>
                <Popconfirm
                  title="Are you sure to delete this service?"
                  onConfirm={() => deleteServiceRow(row.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Col>
          </Row>
          
          <Col span={3}>
            <Switch
              checked={row.visible}
              onChange={(checked) => {
                updateServiceRow(row.id, 'visible', checked);
                console.log(`Row ${row.id} is now ${checked ? 'visible' : 'hidden'}`);
              }}
              checkedChildren="Visible"
              unCheckedChildren="Hidden"
            />
          </Col>

          <Row>
            <Col span={24}>
              <Text type="secondary">
                Preview: [{row.order}] {' '}
                {iconMap[row.icon] ?? <span style={{ marginRight: 8 }}>{row.icon}</span>}
                {row.description}
              </Text>
            </Col>
          </Row>
        </div>
      ))}

      <Button type="dashed" onClick={addServiceRow}>
        Add Service
      </Button>
    </Space>
  );
}
