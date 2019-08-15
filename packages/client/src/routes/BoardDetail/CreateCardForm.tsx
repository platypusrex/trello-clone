import React from 'react';
import { Form } from '../../shared/components/Form';
import { InputField } from '../../shared/components/InputField';
import { FormButtons } from '../../shared/components/FormButtons';
import { Formik } from 'formik';
import { useCreateCard } from '../../shared/hooks/card/useCreateCard';
import { createCardFormikConfig } from '../../shared/formUtils/createCard';

interface ParentProps {
  listId: number;
  boardId: number;
  onCancel: () => void;
}

export const CreateCardForm: React.FC<ParentProps> = ({ listId, boardId, onCancel }) => {
  const { createCard } = useCreateCard(listId, boardId);

  return (
    <Formik {...createCardFormikConfig(createCard, listId, onCancel)}>
      {({ isSubmitting }) => (
        <Form style={{ width: '100%', padding: 12 }}>
          <InputField
            name="title"
            placeholder="Enter card title..."
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
