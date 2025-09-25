'use client';

import '@ant-design/v5-patch-for-react-19';

import React, { useState } from 'react';
import {
  Upload,
  Button,
  Image,
  Input,
  Space,
  Typography,
  message,
  Row,
  Col,
  Select,
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

const { Text } = Typography;

interface SlideItem {
  file: UploadFile;
  caption: string;
  lang: 'en' | 'am' | 'ru';
}

export default function SliderImageUploader() {
  const [slides, setSlides] = useState<SlideItem[]>([]);

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const updatedSlides = fileList.map((file) => {
      const existing = slides.find((s) => s.file.uid === file.uid);
      return {
        file,
        caption: existing?.caption || '',
        lang: existing?.lang || 'en',
      };
    });
    setSlides(updatedSlides);
  };

  const updateCaption = (uid: string, caption: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.file.uid === uid ? { ...slide, caption } : slide
      )
    );
  };

  const updateLang = (uid: string, lang: 'en' | 'am' | 'ru') => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.file.uid === uid ? { ...slide, lang } : slide
      )
    );
  };

  const handleSave = () => {
    if (slides.length === 0) {
      message.warning('Please upload at least one image.');
      return;
    }

    const payload = slides.map((slide) => ({
      name: slide.file.name,
      caption: slide.caption,
      lang: slide.lang,
      // file: slide.file.originFileObj — For uploading to server
    }));

    console.log('Saved slides:', payload);
    message.success('Slides and captions saved successfully.');
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Text strong>Slider Images with Captions and Language</Text>

      <Upload
        listType="picture-card"
        fileList={slides.map((s) => s.file)}
        onChange={handleUploadChange}
        beforeUpload={() => false}
        multiple
        accept="image/*"
      >
        + Upload
      </Upload>

      {slides.map((slide) => (
        <Row
          key={slide.file.uid}
          gutter={16}
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col span={4}>
            <Image
              src={URL.createObjectURL(slide.file.originFileObj as File)}
              width={100}
              height={80}
              style={{ objectFit: 'cover', borderRadius: 4 }}
              alt="Preview"
            />
          </Col>
          <Col span={8}>
            <Input
              value={slide.caption}
              placeholder="Enter caption"
              onChange={(e) =>
                updateCaption(slide.file.uid, e.target.value)
              }
              maxLength={100}
            />
          </Col>
          <Col span={4}>
            <Select
              value={slide.lang}
              onChange={(value) => updateLang(slide.file.uid, value)}
              options={[
                { label: 'English', value: 'en' },
                { label: 'Armenian', value: 'am' },
                { label: 'Russian', value: 'ru' },
              ]}
              style={{ width: 120 }}
            />
          </Col>
        </Row>
      ))}

      <Button type="primary" onClick={handleSave} disabled={slides.length === 0}>
        Save
      </Button>
    </Space>
  );
}
