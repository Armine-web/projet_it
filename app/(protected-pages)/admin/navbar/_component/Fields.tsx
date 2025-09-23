'use client'

import '@ant-design/v5-patch-for-react-19';

import React, { useState } from 'react';
import { Button, Input, Space, Row, Col, Select } from 'antd';

interface RowItem {
  id: number;
  order: number;
  label: string;
  path: string;
}

export function Fields() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [rows, setRows] = useState<RowItem[]>([
    { id: 1, order: 1, label: 'Programs', path: '/programs' },
    { id: 2, order: 2, label: 'About', path: '/about' },
    { id: 3, order: 3, label: 'Contact', path: '/contact' },
  ]);

  const handleLangChange = (value: string) => {
    setSelectedLang(value);

    if (value === 'am') {
      setRows([
        { id: 1, order: 1, label: 'Ծրագրեր', path: '/programs' },
        { id: 2, order: 2, label: 'Մեր մասին', path: '/about' },
        { id: 3, order: 3, label: 'Կապ', path: '/contact' },
      ]);
    } else if (value === 'ru') {
      setRows([
        { id: 1, order: 1, label: 'Программы', path: '/programs' },
        { id: 2, order: 2, label: 'О нас', path: '/about' },
        { id: 3, order: 3, label: 'Контакты', path: '/contact' },
      ]);
    } else {
      setRows([
        { id: 1, order: 1, label: 'Programs', path: '/programs' },
        { id: 2, order: 2, label: 'About', path: '/about' },
        { id: 3, order: 3, label: 'Contact', path: '/contact' },
      ]);
    }
  };

  const addRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    const newOrder = rows.length > 0 ? rows[rows.length - 1].order + 1 : 1;
    setRows([...rows, { id: newId, order: newOrder, label: '', path: '' }]);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id: number, key: 'order' | 'label' | 'path', value: string | number) => {
    setRows(rows.map(row => row.id === id ? { ...row, [key]: value } : row));
  };

  const saveRow = (row: RowItem) => {
    console.log('Saved row:', row);
    console.log('Selected language:', selectedLang);
  };

  return (
    <Space direction="vertical" className="w-full">

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


      {rows.map((row) => (
        <Row key={row.id} gutter={16} align="middle">
          <Col span={1}>
            <Input
              value={row.order}
              type="number"
              onChange={e => updateRow(row.id, 'order', Number(e.target.value))}
              style={{ width: '60px' }}
            />
          </Col>
          <Col span={6}>
            <Input
              value={row.label}
              onChange={e => updateRow(row.id, 'label', e.target.value)}
              placeholder="Label"
            />
          </Col>
          <Col span={6}>
            <Input
              value={row.path}
              onChange={e => updateRow(row.id, 'path', e.target.value)}
              placeholder="Path"
            />
          </Col>
          <Col span={1}>
            <Button type="primary" onClick={() => saveRow(row)}>
              Save
            </Button>
          </Col>
          <Col span={1}>
            <Button type="primary" danger onClick={() => deleteRow(row.id)}>
              Delete
            </Button>
          </Col>
        </Row>
      ))}

      <Button type="dashed" onClick={addRow}>
        Add Row
      </Button>
    </Space>
  );
}
