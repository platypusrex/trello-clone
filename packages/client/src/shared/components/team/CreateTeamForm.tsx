import React from 'react';
import { Formik } from 'formik';
import { Form } from '../Form';
import { FormButtons } from '../FormButtons';
import { TeamFormInputs } from './TeamFormInputs';
import { createTeamFormikConfig } from '../../formUtils/createTeam';
import { useCreateTeam } from '../../hooks/team/useCreateTeam';

interface ParentProps {
  onCancel?: () => void;
}

export const CreateTeamForm: React.FC<ParentProps> = ({ onCancel }) => {
  const { createTeam } = useCreateTeam();

  return (
    <Formik {...createTeamFormikConfig(createTeam, onCancel)}>
      {({ isSubmitting, status }) => (
        <Form formError={status && status.formError}>
          <TeamFormInputs/>

          <FormButtons
            onCancel={onCancel}
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};