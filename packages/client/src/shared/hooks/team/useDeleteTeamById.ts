import { useMutation } from 'react-apollo-hooks';
import { DeleteTeamByIdMutation, DeleteTeamByIdMutationVariables, TeamsByUserIdQuery } from '../../types/generated';
import { deleteTeamByIdMutation, teamsByUserIdQuery } from '../../utils/graphqlFileLoader';
import { useAsyncOpState, AsyncOpState } from '../useAsyncOpState';

type UseDeleteTeamById = (id: number) => AsyncOpState &{
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

          const teamsData = store.readQuery<TeamsByUserIdQuery>({ query: teamsByUserIdQuery });

          if (!teamsData || !teamsData.allTeamsByUserId) {
            return;
          }

          store.writeQuery<TeamsByUserIdQuery>({
            query: teamsByUserIdQuery,
            data: {
              allTeamsByUserId: teamsData.allTeamsByUserId.filter(e => e.id !== id),
            }
          })
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