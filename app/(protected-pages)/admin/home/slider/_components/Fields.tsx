'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import {
  Upload,
  Button,
  Input,
  Space,
  Typography,
  message,
  Row,
  Col,
  Select,
  Switch,
  Popconfirm,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Text } = Typography;

interface SlideItem {
  id: string;
  order: number;
  file?: UploadFile;
  caption: string;
  lang: 'en' | 'am' | 'ru';
  visible: boolean;
  previewUrl?: string;
}

export default function SliderImageUploader() {
  const [slides, setSlides] = useState<SlideItem[]>([
    {
      id: crypto.randomUUID(),
      order: 1,
      caption: '',
      lang: 'en',
      visible: true,
    },
  ]);

  const updateField = (
    id: string,
    key: keyof SlideItem,
    value: string | number | boolean | UploadFile | undefined
  ) => {
    setSlides(prev =>
      prev.map(slide =>
        slide.id === id
          ? { ...slide, [key]: value }
          : slide
      )
    );
  };

  const handleUploadChange = (id: string, info: { file: UploadFile; fileList: UploadFile[] }) => {
    const file = info.file;
    let url: string | undefined;
    if (file.originFileObj) {
      url = URL.createObjectURL(file.originFileObj as File);
    } else if (file instanceof File) {
      url = URL.createObjectURL(file as File);
    }
    console.log('Preview URL inside handler:', url);
    updateField(id, 'file', file);
    if (url) {
      updateField(id, 'previewUrl', url);
    }
  };

  const deleteSlide = (id: string) => {
    const slideToDelete = slides.find(s => s.id === id);
    console.log('Deleting slide:', slideToDelete);
    setSlides(prev => prev.filter(s => s.id !== id));
  };

  const saveSlide = (slide: SlideItem) => {
    console.log('Saving slide:', slide);
    message.success(`Slide ${slide.id} saved`);
    // այստեղ կարող եք ուղարկել տվյալը սերվերին
  };

  const addSlide = () => {
    const nextOrder = slides.length > 0
      ? Math.max(...slides.map(s => s.order)) + 1
      : 1;
    const newSlide: SlideItem = {
      id: crypto.randomUUID(),
      order: nextOrder,
      caption: '',
      lang: 'en',
      visible: true,
    };
    setSlides(prev => [...prev, newSlide]);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text strong>Slider Items</Text>

      {slides.map((slide) => (
        <div
          key={slide.id}
          style={{
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 6,
            marginBottom: 12,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Row gutter={16} align="middle" style={{ marginBottom: 12 }}>
            <Col span={2}>
              <Input
                type="number"
                placeholder="Order"
                value={slide.order}
                onChange={e =>
                  updateField(slide.id, 'order', Number(e.target.value))
                }
                min={1}
              />
            </Col>

            <Col span={4}>
              {slide.previewUrl ? (
                <img
                  src={slide.previewUrl}
                  alt="Preview"
                  width={100}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                />
              ) : (
                <Upload
                  showUploadList={false}
                  beforeUpload={file => false}
                  onChange={info => handleUploadChange(slide.id, info)}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              )}
            </Col>

            <Col span={6}>
              <Input
                value={slide.caption}
                placeholder="Caption"
                onChange={e =>
                  updateField(slide.id, 'caption', e.target.value)
                }
              />
            </Col>

            <Col span={3}>
              <Select
                value={slide.lang}
                onChange={value =>
                  updateField(slide.id, 'lang', value as 'en' | 'am' | 'ru')
                }
                options={[
                  { label: 'English', value: 'en' },
                  { label: 'Armenian', value: 'am' },
                  { label: 'Russian', value: 'ru' },
                ]}
                style={{ width: 100 }}
              />
            </Col>

            <Col span={3}>
              <Switch
                checked={slide.visible}
                onChange={checked => {
                  updateField(slide.id, 'visible', checked);
                  console.log(`Slide ${slide.id} visibility changed: ${checked}`);
                }}
                checkedChildren="Visible"
                unCheckedChildren="Hidden"
              />
            </Col>

            <Col span={6}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => saveSlide(slide)}
                >
                  Save
                </Button>

                <Popconfirm
                  title="Are you sure to delete this slide?"
                  onConfirm={() => deleteSlide(slide.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Col>
          </Row>
        </div>
      ))}

      <Button type="dashed" onClick={addSlide}>
        Add Slide
      </Button>
    </Space>
  );
}
