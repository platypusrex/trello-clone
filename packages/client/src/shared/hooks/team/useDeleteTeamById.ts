import { useMutation } from 'react-apollo-hooks';
import { DeleteTeamByIdMutation, DeleteTeamByIdMutationVariables, TeamsByUserIdQuery } from '../../types/generated';
import { deleteTeamByIdMutation, teamsByUserIdQuery } from '../../utils/graphqlFileLoader';
import { useAsyncOpState, AsyncOpState } from '../useAsyncOpState';

type UseDeleteTeamById = (id: number) => AsyncOpState & {
  deleteTeam: () => Promise<void>;
};

export const useDeleteTeamById: UseDeleteTeamById = (id) => {
  const { state, setState } = useAsyncOpState();
  const mutate = useMutation<DeleteTeamByIdMutation, DeleteTeamByIdMutationVariables>(deleteTeamByIdMutation);

  const deleteTeam = async () => {
    setState(ss => ({ ...ss, loading: true }));

    try {
      const { errors } = await mutate({
        variables: { id },
        update: (store, { data }) => {
          if (!data || !data.deleteTeamById) {
            return;
          }

          try {
            const options = { query: teamsByUserIdQuery };
            const teamsData = store.readQuery<TeamsByUserIdQuery>(options);

            if (!teamsData || !teamsData.allTeamsByUserId) {
              return;
            }

            store.writeQuery<TeamsByUserIdQuery>({
              ...options,
              data: {
                allTeamsByUserId: teamsData.allTeamsByUserId.filter(team => team.id !== id),
              }
            });
          } catch (e) {
            console.log('useDeleteTeamById cache update error', e);
          }
        }
      });

      setState(prevState => ({
        ...prevState,
        errors,
        loading: false
      }))
    } catch (errors) {
      setState(prevState => ({
        ...prevState,
        errors,
        loading: false
      }))
    }
  };

  return { deleteTeam, ...state };
};