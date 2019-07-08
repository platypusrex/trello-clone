import React from 'react';
import { Form } from '../../shared/components/Form';
import { InputField } from '../../shared/components/InputField';
import { FormButtons } from '../../shared/components/FormButtons';
import { Formik } from 'formik';
import { createListFormikConfig } from '../../shared/formUtils/createList';
import { useCreateList } from '../../shared/hooks/list/useCreateList';

interface ParentProps {
  boardId: number;
  onCancel: () => void;
}

export const CreateListForm: React.FC<ParentProps> = ({ boardId, onCancel }) => {
  const { createList } = useCreateList(boardId);

  return (
    <Formik {...createListFormikConfig(createList, boardId)}>
      {({ isSubmitting }) => (
        <Form style={{ width: '100%' }}>
          <InputField
            name="title"
            placeholder="Enter list title..."
            size="default"
            formItemStyle={{ marginBottom: 10 }}
          />

          <FormButtons
            loading={isSubmitting}
            onCancel={onCancel}
            justify="flex-start"
          />
        </Form>
      )}
    </Formik>
  );
};