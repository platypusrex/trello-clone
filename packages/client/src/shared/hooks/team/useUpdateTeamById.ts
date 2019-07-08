import { MutationFn, useMutation } from 'react-apollo-hooks';
import { UpdateTeamByIdMutation, UpdateTeamByIdMutationVariables } from '../../types/generated';
import { updateTeamByIdMutation } from '../../utils/graphqlFileLoader';

type UseUpdateTeamById = () => {
  updateTeam: MutationFn<UpdateTeamByIdMutation, UpdateTeamByIdMutationVariables>
};

export const useUpdateTeamById: UseUpdateTeamById = () => {
  const updateTeam = useMutation<UpdateTeamByIdMutation, UpdateTeamByIdMutationVariables>(updateTeamByIdMutation);

  return { updateTeam };
};