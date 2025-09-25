'use client'

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import {
  Button,
  Input,
  Space,
  Row,
  Col,
  Select,
  Popconfirm,
  Switch,
} from 'antd';

interface RowItem {
  id: number;
  order: number;
  label: string;
  path: string;
  lang: 'en' | 'am' | 'ru';
  visible: boolean;
}

export function Fields() {
  const [selectedLang, setSelectedLang] = useState<'en' | 'am' | 'ru'>('en');
  const [rows, setRows] = useState<RowItem[]>([
    { id: 1, order: 1, label: 'Programs', path: '/programs', lang: 'en', visible: true },
    { id: 2, order: 2, label: 'About', path: '/about', lang: 'en', visible: true },
    { id: 3, order: 3, label: 'Contact', path: '/contact', lang: 'en', visible: true },
  ]);

  const handleLangChange = (value: 'en' | 'am' | 'ru') => {
    setSelectedLang(value);

    if (value === 'am') {
      setRows([
        { id: 1, order: 1, label: 'Ծրագրեր', path: '/programs', lang: 'am', visible: true },
        { id: 2, order: 2, label: 'Մեր մասին', path: '/about', lang: 'am', visible: true },
        { id: 3, order: 3, label: 'Կապ', path: '/contact', lang: 'am', visible: true },
      ]);
    } else if (value === 'ru') {
      setRows([
        { id: 1, order: 1, label: 'Программы', path: '/programs', lang: 'ru', visible: true },
        { id: 2, order: 2, label: 'О нас', path: '/about', lang: 'ru', visible: true },
        { id: 3, order: 3, label: 'Контакты', path: '/contact', lang: 'ru', visible: true },
      ]);
    } else {
      setRows([
        { id: 1, order: 1, label: 'Programs', path: '/programs', lang: 'en', visible: true },
        { id: 2, order: 2, label: 'About', path: '/about', lang: 'en', visible: true },
        { id: 3, order: 3, label: 'Contact', path: '/contact', lang: 'en', visible: true },
      ]);
    }
  };

  const addRow = () => {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    const newOrder = rows.length > 0 ? rows[rows.length - 1].order + 1 : 1;
    setRows([
      ...rows,
      {
        id: newId,
        order: newOrder,
        label: '',
        path: '',
        lang: selectedLang,
        visible: true,
      },
    ]);
  };

  const deleteRow = (id: number) => {
    const deletedRow = rows.find((row) => row.id === id);
    if (deletedRow) {
      console.log('Deleted row:', deletedRow);
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateRow = (
    id: number,
    key: 'order' | 'label' | 'path' | 'visible',
    value: string | number | boolean
  ) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, [key]: value } : row
      )
    );
  };

  const saveRow = (row: RowItem) => {
    console.log(`Saved [${selectedLang}] row:`, row);
  };

  return (
    <Space direction="vertical" className="w-full" style={{ width: '100%' }}>
      <Select
        value={selectedLang}
        style={{ width: 140 }}
        onChange={handleLangChange}
        options={[
          { value: 'en', label: 'English' },
          { value: 'am', label: 'Armenian' },
          { value: 'ru', label: 'Russian' },
        ]}
      />

      {rows.map((row) => (
        <Row key={row.id} gutter={16} align="middle" style={{ marginBottom: 8 }}>
          <Col span={1}>
            <Input
              value={row.order}
              type="number"
              onChange={(e) =>
                updateRow(row.id, 'order', Number(e.target.value))
              }
              style={{ width: '60px' }}
            />
          </Col>
          <Col span={6}>
            <Input
              value={row.label}
              onChange={(e) => updateRow(row.id, 'label', e.target.value)}
              placeholder="Label"
            />
          </Col>
          <Col span={6}>
            <Input
              value={row.path}
              onChange={(e) => updateRow(row.id, 'path', e.target.value)}
              placeholder="Path"
            />
          </Col>
          <Col>
            <Space>
              <Button type="primary" onClick={() => saveRow(row)}>
                Save
              </Button>

              <Popconfirm
                title={
                  selectedLang === 'am'
                    ? 'Հաստատո՞ւմ եք, որ ցանկանում եք ջնջել այս տողը։'
                    : selectedLang === 'ru'
                    ? 'Вы уверены, что хотите удалить эту строку?'
                    : 'Are you sure to delete this service?'
                }
                onConfirm={() => deleteRow(row.id)}
                okText={
                  selectedLang === 'am'
                    ? 'Այո'
                    : selectedLang === 'ru'
                    ? 'Да'
                    : 'Yes'
                }
                cancelText={
                  selectedLang === 'am'
                    ? 'Ոչ'
                    : selectedLang === 'ru'
                    ? 'Нет'
                    : 'No'
                }
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </Col>
          <Col span={3}>
            <Switch
              checked={row.visible}
              onChange={(checked) => {
                updateRow(row.id, 'visible', checked);
                console.log(`Row ${row.id} is now ${checked ? 'visible' : 'hidden'}`);
              }}
              checkedChildren="Visible"
              unCheckedChildren="Hidden"
            />
          </Col>
        </Row>
        
      ))}

      <Button type="dashed" onClick={addRow}>
        Add Row
      </Button>
    </Space>
  );
}
