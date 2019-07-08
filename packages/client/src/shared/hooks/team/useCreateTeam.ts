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
        if (!data) {
          return;
        }

        const { createTeam } = data;
        const teamsData = store.readQuery<TeamsByUserIdQuery>({ query: teamsByUserIdQuery });

        if (!teamsData || !teamsData.allTeamsByUserId) {
          return;
        }

        teamsData.allTeamsByUserId.push(createTeam);
      }
    });

  return { createTeam };
};