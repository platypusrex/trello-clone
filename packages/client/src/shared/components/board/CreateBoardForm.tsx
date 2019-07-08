import React from 'react';
import { Formik } from 'formik';
import { Form } from '../Form';
import { InputField } from '../InputField';
import { FormButtons } from '../FormButtons';
import { createBoardFormikConfig } from '../../formUtils/createBoard';
import { useCreateBoard } from '../../hooks/board/useCreateBoard';

interface CreateBoardFormProps {
  onCancel: () => void;
  teamId?: number;
}

export const CreateBoardForm: React.FC<CreateBoardFormProps> = ({ onCancel, teamId }) => {
  const { createBoard } = useCreateBoard(teamId);

  return (
    <Formik {...createBoardFormikConfig(createBoard, teamId, onCancel)}>
      {({ isSubmitting }) => (
        <Form>
          <InputField
            label="Board Title"
            name="title"
            placeholder="Your team name..."
            size="default"
          />

          <InputField
            label="Board Description"
            name="description"
            placeholder="Your team description..."
            size="default"
          />

          <FormButtons
            loading={isSubmitting}
            onCancel={onCancel}
          />
        </Form>
      )}
    </Formik>
  )
};