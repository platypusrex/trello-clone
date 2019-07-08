import React from 'react';
import { Form as AntForm, Select } from 'antd';
import { Formik } from 'formik';
import { Form } from '../../shared/components/Form';
import { FormButtons } from '../../shared/components/FormButtons';
import { ListDetail } from '../../shared/types/generated';
import { updateListFormikConfig } from '../../shared/formUtils/updateList';
import { useUpdateListById } from '../../shared/hooks/list/useUpdateListById';

const FormItem = AntForm.Item;

interface ParentProps {
  list: ListDetail;
  columnsLength: number;
}

export const UpdateListForm: React.FC<ParentProps> = ({ list, columnsLength }) => {
  const { updateList } = useUpdateListById();
  const formikConfig = updateListFormikConfig(updateList, list.id, {
    position: list.position,
  });

  return (
    <Formik {...formikConfig}>
      {({ isSubmitting, setFieldValue, values }) => (
        <Form style={{ padding: 12 }}>
          <FormItem style={{ marginBottom: 12 }}>
            <Select
              style={{ width: '100%' }}
              value={values.position ? values.position : null}
              onChange={(value) => setFieldValue('position', value ? value : null)}
            >
              {new Array(columnsLength).fill(null).map((_, i) => (
                <Select.Option key={i} value={i + 1} disabled={i === list.position}>
                  {i + 1} {(i === list.position) && '(current)'}
                </Select.Option>
              ))}
            </Select>
          </FormItem>

          <FormButtons loading={isSubmitting} justify="flex-start"/>
        </Form>
      )}
    </Formik>
  );
};