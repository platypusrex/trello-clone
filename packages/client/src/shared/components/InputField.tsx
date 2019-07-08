import React from 'react';
import { Field, FieldProps } from 'formik';
import { Form, Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import styled from '../styled';
import { FormItemProps } from 'antd/lib/form';

const FormItem = styled(Form.Item)<FormItemProps>`
  .ant-form-item-label {
    line-height: inherit;
  }
` as any;

interface InputFieldProps extends InputProps {
  name: string;
  label?: string;
  formItemStyle?: React.CSSProperties;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { name, label, formItemStyle, ...inputProps } = props;

  const renderInput = (fieldProps: FieldProps) => {
    const {
      form: { touched, errors },
      field: { ...rest },
    } = fieldProps;
    const hasError = !!(touched[name] && errors[name]);

    return (
      <FormItem
        label={label}
        hasFeedback={hasError}
        validateStatus={hasError ? 'error' : undefined}
        help={hasError && errors[name]}
        style={formItemStyle}
      >
        <Input {...inputProps} {...rest}/>
      </FormItem>
    )
  };

  return (
    <Field name={name} render={renderInput}/>
  );
};