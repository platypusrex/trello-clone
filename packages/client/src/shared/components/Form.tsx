import React from 'react';
import { Form as FormikForm } from 'formik';
import { Alert, Typography } from 'antd';
import { TypographyProps } from 'antd/lib/typography/Typography';
import { AlertProps } from 'antd/lib/alert';
import styled from '../styled';

const FormTitle = styled(Typography.Title)<TypographyProps>`
  &.ant-typography {
    margin-bottom: 20px;
  }
`;

const FormError = styled(Alert)<AlertProps>`
  margin-bottom: 24px;
`;

interface FormProps {
  title?: React.ReactNode;
  formError?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Form: React.FC<FormProps> = ({
  title,
  formError,
  style,
  children
}) => (
  <FormikForm style={style}>
    {title &&
    <FormTitle level={3}>
      {title}
    </FormTitle>}

    {formError &&
    <FormError
      message={formError}
      type="error"
      showIcon={true}
      style={{ marginBottom: 15 }}
    />}

    {children}
  </FormikForm>
);