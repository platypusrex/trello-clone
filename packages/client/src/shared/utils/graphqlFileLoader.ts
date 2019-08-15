import { loader } from 'graphql.macro';

// user queries and mutations
export const confirmEmailMutation = loader('../graphql/user/ConfirmEmailMutation.graphql');
export const loginQuery = loader('../graphql/user/LoginMutation.graphql');

// team queries and mutations
export const teamsByUserIdQuery = loader('../graphql/team/teamsByUserIdQuery.graphql');
export const teamDetailByIdQuery = loader('../graphql/team/teamDetailByIdQuery.graphql');
export const teamBoardsByUserIdQuery = loader('../graphql/team/teamBoardsByUserIdQuery.graphql');
export const createTeamMutation = loader('../graphql/team/createTeamMutation.graphql');
export const updateTeamByIdMutation = loader('../graphql/team/updateTeamByIdMutation.graphql');
export const deleteTeamByIdMutation = loader('../graphql/team/deleteTeamByIdMutation.graphql');

// board queries and mutations
export const boardByIdQuery = loader('../graphql/board/boardByIdQuery.graphql');
export const boardsByUserIdQuery = loader('../graphql/board/boardsByUserIdQuery.graphql');
export const personalBoardsByUserIdQuery = loader('../graphql/board/personalBoardsByUserIdQuery.graphql');
export const createBoardMutation = loader('../graphql/board/createBoardMutation.graphql');
export const deleteBoardByIdMutation = loader('../graphql/board/deleteBoardByIdMutation.graphql');

// list queries and mutations
export const listsByBoardIdQuery = loader('../graphql/list/listsByBoardIdQuery.graphql');
export const updateListByIdMutation = loader('../graphql/list/updateListByIdMutation.graphql');
export const updateListsByIdMutation = loader('../graphql/list/updateListsByIdMutation.graphql');
export const createListMutation = loader('../graphql/list/createListMutation.graphql');
export const deleteListByIdMutation = loader('../graphql/list/deleteListByIdMutation.graphql');

// card queries and mutations
export const cardsByListIdQuery = loader('../graphql/card/cardsByListIdQuery.graphql');
export const createCardMutation = loader('../graphql/card/createCardMutation.graphql');
