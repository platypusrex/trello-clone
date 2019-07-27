import { MutationFn, useMutation } from 'react-apollo-hooks';
import { CreateTeamMutation, CreateTeamMutationVariables, TeamsByUserIdQuery } from '../../types/generated';
import { createTeamMutation, teamBoardsByUserIdQuery, teamsByUserIdQuery } from '../../utils/graphqlFileLoader';

type UseCreateTeamProps = () => {
  createTeam: MutationFn<CreateTeamMutation, CreateTeamMutationVariables>
};

export const useCreateTeam: UseCreateTeamProps = () => {
  const createTeam =
    useMutation<
      CreateTeamMutation,
      CreateTeamMutationVariables
    >(createTeamMutation, {
      refetchQueries: [{ query: teamBoardsByUserIdQuery }],
      update: (store, { data }) => {
        if (!data || !data.createTeam) {
          return;
        }

        try {
          const { createTeam } = data;
          const options = { query: teamsByUserIdQuery };
          const teamsData = store.readQuery<TeamsByUserIdQuery>(options);

          if (!teamsData || !teamsData.allTeamsByUserId) {
            return;
          }

          store.writeQuery<TeamsByUserIdQuery>({
            ...options,
            data: { allTeamsByUserId: [ ...teamsData.allTeamsByUserId, createTeam ] }
          });
        } catch (e) {
          console.log('useCreateTeam cache update error', e);
        }
      }
    });

  return { createTeam };
};