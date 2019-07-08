import React from 'react';
import { Formik } from 'formik';
import { Form } from '../Form';
import { TeamFormInputs } from './TeamFormInputs';
import { FormButtons } from '../FormButtons';
import { Team } from '../../types/generated';
import { updateTeamFormikConfig } from '../../formUtils/updateTeam';
import { useUpdateTeamById } from '../../hooks/team/useUpdateTeamById';

interface UpdateTeamFormProps {
  team: Team;
  onCancel?: () => void;
}

export const UpdateTeamForm: React.FC<UpdateTeamFormProps> = ({ team, onCancel }) => {
  const { updateTeam } = useUpdateTeamById();
  const formikConfig = updateTeamFormikConfig(
    updateTeam,
    team.id,
    { name: team.name, description: team.description },
    onCancel,
  );

  return (
    <Formik {...formikConfig}>
      {({ isSubmitting, status }) => (
        <Form formError={status && status.formError} style={{ width: '100%', margin: '10px 0 15px' }}>
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