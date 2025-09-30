'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import {
  Button,
  Input,
  Space,
  message,
  Row,
  Col,
  Select,
  Popconfirm,
  Switch,
} from 'antd';

interface SlideItem {
  id: string;
  order: number;
  image: string;
  description: string;
  lang: 'en' | 'am' | 'ru';
  visible: boolean;
}

export function Fields() {
  const descriptionsByLang: Record<'en' | 'am' | 'ru', string> = {
    en: 'Description',
    am: 'Նկարագրություն',
    ru: 'Описание',
  };

  const [slides, setSlides] = useState<SlideItem[]>([
    {
      id: crypto.randomUUID(),
      order: 1,
      image: '',
      description: '',
      lang: 'en',
      visible: true,
    },
  ]);

  const updateField = (
    id: string,
    key: keyof SlideItem,
    value: string | number | boolean
  ) => {
    setSlides(prev =>
      prev.map(slide =>
        slide.id === id ? { ...slide, [key]: value } : slide
      )
    );
  };

  const deleteSlide = (id: string) => {
    const deletedSlide = slides.find(s => s.id === id);
    setSlides(prev => prev.filter(s => s.id !== id));
    if (deletedSlide) {
      console.log(
        `Deleted slide: id=${deletedSlide.id}, order=${deletedSlide.order}, image=${deletedSlide.image}, description=${deletedSlide.description}, lang=${deletedSlide.lang}, visible=${deletedSlide.visible}`
      );
    }
  };

  const saveSlide = (slide: SlideItem) => {
    message.success(`Slide ${slide.id} saved`);
    console.log(
      `Saved slide: id=${slide.id}, order=${slide.order}, image=${slide.image}, description=${slide.description}, lang=${slide.lang}, visible=${slide.visible}`
    );
  };

  const addSlide = () => {
    const nextOrder = slides.length > 0
      ? Math.max(...slides.map(s => s.order)) + 1
      : 1;

    const newSlide: SlideItem = {
      id: crypto.randomUUID(),
      order: nextOrder,
      description: '',
      image: '',
      lang: slides[0].lang,
      visible: true,
    };
    setSlides(prev => [...prev, newSlide]);
  };

  const handleLangChange = (value: 'en' | 'am' | 'ru') => {
    setSlides(prev =>
      prev.map(slide => ({
        ...slide,
        lang: value,
      }))
    );
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ marginBottom: 12 }}>
        <Select
          value={slides[0]?.lang || 'en'}
          onChange={handleLangChange}
          options={[
            { label: 'English', value: 'en' },
            { label: 'Armenian', value: 'am' },
            { label: 'Russian', value: 'ru' },
          ]}
          style={{ width: 150 }}
        />
      </div>

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

            <Col span={6}>
              <Input
                value={slide.description}
                placeholder={descriptionsByLang[slide.lang]}
                onChange={e =>
                  updateField(slide.id, 'description', e.target.value)
                }
              />
            </Col>

            <Col span={6}>
              <Input
                value={slide.image}
                placeholder="Image URL"
                onChange={e => updateField(slide.id, 'image', e.target.value)}
              />
            </Col>

            <Col span={3}>
              <Switch
                checked={slide.visible}
                onChange={checked => updateField(slide.id, 'visible', checked)}
                checkedChildren="Visible"
                unCheckedChildren="Hidden"
              />
            </Col>

            <Col span={6}>
              <Space>
                <Button type="primary" onClick={() => saveSlide(slide)}>
                  Save
                </Button>

                <Popconfirm
                  title="Are you sure to delete this slide?"
                  onConfirm={() => deleteSlide(slide.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
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
