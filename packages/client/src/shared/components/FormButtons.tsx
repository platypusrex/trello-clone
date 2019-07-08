import React from 'react';
import { Button } from 'antd';
import { Flex, FlexJustify } from './Flex';

interface FormButtonsProps {
  justify?: FlexJustify;
  onCancel?: () => void;
  loading: boolean;
  cancelText?: string;
  submitText?: string;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  justify,
  onCancel,
  loading,
  cancelText,
  submitText,
}) => (
  <Flex justifyContent={justify || 'flex-end'}>
    {onCancel &&
    <Button style={{ marginRight: 10 }} onClick={onCancel}>
      {cancelText || 'Cancel'}
    </Button>}

    <Button type="primary" htmlType="submit" loading={loading}>
      {submitText || 'Submit'}
    </Button>
  </Flex>
);