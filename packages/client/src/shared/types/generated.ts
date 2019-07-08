/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BoardByIdQuery
// ====================================================

export interface BoardByIdQuery_boardById_creator {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface BoardByIdQuery_boardById_team {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
}

export interface BoardByIdQuery_boardById {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
  creator: BoardByIdQuery_boardById_creator;
  team: BoardByIdQuery_boardById_team | null;
}

export interface BoardByIdQuery {
  boardById: BoardByIdQuery_boardById | null;
}

export interface BoardByIdQueryVariables {
  boardId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BoardsByUserIdQuery
// ====================================================

export interface BoardsByUserIdQuery_allBoardsByUserId {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface BoardsByUserIdQuery {
  allBoardsByUserId: BoardsByUserIdQuery_allBoardsByUserId[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBoardMutation
// ====================================================

export interface CreateBoardMutation_createBoard {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface CreateBoardMutation {
  createBoard: CreateBoardMutation_createBoard;
}

export interface CreateBoardMutationVariables {
  input: CreateBoardInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteBoardByIdMutation
// ====================================================

export interface DeleteBoardByIdMutation {
  deleteBoardById: boolean;
}

export interface DeleteBoardByIdMutationVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PersonalBoardsByUserIdQuery
// ====================================================

export interface PersonalBoardsByUserIdQuery_allPersonalBoardsByUserId {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface PersonalBoardsByUserIdQuery {
  allPersonalBoardsByUserId: PersonalBoardsByUserIdQuery_allPersonalBoardsByUserId[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CardsByListIdQuery
// ====================================================

export interface CardsByListIdQuery_allCardsByListId {
  __typename: "Card";
  id: number;
  title: string;
  description: string | null;
  updatedAt: any;
  createdAt: any;
}

export interface CardsByListIdQuery {
  allCardsByListId: CardsByListIdQuery_allCardsByListId[] | null;
}

export interface CardsByListIdQueryVariables {
  listId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCardMutation
// ====================================================

export interface CreateCardMutation_createCard {
  __typename: "Card";
  id: number;
  title: string;
  description: string | null;
  updatedAt: any;
  createdAt: any;
}

export interface CreateCardMutation {
  createCard: CreateCardMutation_createCard;
}

export interface CreateCardMutationVariables {
  input: CreateCardInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateListMutation
// ====================================================

export interface CreateListMutation_createList {
  __typename: "List";
  id: number;
  title: string;
  position: number;
  createdAt: any;
  updatedAt: any;
}

export interface CreateListMutation {
  createList: CreateListMutation_createList;
}

export interface CreateListMutationVariables {
  input: CreateListInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteListByIdMutation
// ====================================================

export interface DeleteListByIdMutation {
  deleteListById: boolean;
}

export interface DeleteListByIdMutationVariables {
  listId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListsByBoardIdQuery
// ====================================================

export interface ListsByBoardIdQuery_allListsByBoardId {
  __typename: "List";
  id: number;
  title: string;
  position: number;
  createdAt: any;
  updatedAt: any;
}

export interface ListsByBoardIdQuery {
  allListsByBoardId: ListsByBoardIdQuery_allListsByBoardId[] | null;
}

export interface ListsByBoardIdQueryVariables {
  boardId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateListByIdMutation
// ====================================================

export interface UpdateListByIdMutation_updateListById {
  __typename: "List";
  id: number;
  title: string;
  position: number;
  createdAt: any;
  updatedAt: any;
}

export interface UpdateListByIdMutation {
  updateListById: UpdateListByIdMutation_updateListById;
}

export interface UpdateListByIdMutationVariables {
  input: UpdateListInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTeamMutation
// ====================================================

export interface CreateTeamMutation_createTeam {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
}

export interface CreateTeamMutation {
  createTeam: CreateTeamMutation_createTeam;
}

export interface CreateTeamMutationVariables {
  input: CreateTeamInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTeamByIdMutation
// ====================================================

export interface DeleteTeamByIdMutation {
  deleteTeamById: boolean;
}

export interface DeleteTeamByIdMutationVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamBoardsByUserIdQuery
// ====================================================

export interface TeamBoardsByUserIdQuery_allTeamsByUserId_boards {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface TeamBoardsByUserIdQuery_allTeamsByUserId {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
  boards: TeamBoardsByUserIdQuery_allTeamsByUserId_boards[];
}

export interface TeamBoardsByUserIdQuery {
  allTeamsByUserId: TeamBoardsByUserIdQuery_allTeamsByUserId[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamDetailByIdQuery
// ====================================================

export interface TeamDetailByIdQuery_teamById_creator {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface TeamDetailByIdQuery_teamById_boards {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface TeamDetailByIdQuery_teamById_members {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface TeamDetailByIdQuery_teamById {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  creator: TeamDetailByIdQuery_teamById_creator;
  boards: TeamDetailByIdQuery_teamById_boards[];
  members: TeamDetailByIdQuery_teamById_members[];
}

export interface TeamDetailByIdQuery {
  teamById: TeamDetailByIdQuery_teamById | null;
}

export interface TeamDetailByIdQueryVariables {
  teamId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamsByUserIdQuery
// ====================================================

export interface TeamsByUserIdQuery_allTeamsByUserId {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
}

export interface TeamsByUserIdQuery {
  allTeamsByUserId: TeamsByUserIdQuery_allTeamsByUserId[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTeamByIdMutation
// ====================================================

export interface UpdateTeamByIdMutation_updateTeamById {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
}

export interface UpdateTeamByIdMutation {
  updateTeamById: UpdateTeamByIdMutation_updateTeamById;
}

export interface UpdateTeamByIdMutationVariables {
  input: UpdateTeamInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ConfirmEmailMutation
// ====================================================

export interface ConfirmEmailMutation {
  confirmUser: boolean;
}

export interface ConfirmEmailMutationVariables {
  token: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  input: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface RegisterMutation {
  register: RegisterMutation_register;
}

export interface RegisterMutationVariables {
  input: RegisterInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BoardDetail
// ====================================================

export interface BoardDetail_creator {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface BoardDetail_team {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
}

export interface BoardDetail {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
  creator: BoardDetail_creator;
  team: BoardDetail_team | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Board
// ====================================================

export interface Board {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CardDetail
// ====================================================

export interface CardDetail_list {
  __typename: "List";
  id: number;
  title: string;
}

export interface CardDetail_creator {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface CardDetail_assignedTo {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface CardDetail {
  __typename: "Card";
  id: number;
  title: string;
  description: string | null;
  updatedAt: any;
  createdAt: any;
  list: CardDetail_list;
  creator: CardDetail_creator;
  assignedTo: CardDetail_assignedTo | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Card
// ====================================================

export interface Card {
  __typename: "Card";
  id: number;
  title: string;
  description: string | null;
  updatedAt: any;
  createdAt: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ListDetail
// ====================================================

export interface ListDetail {
  __typename: "List";
  id: number;
  title: string;
  position: number;
  createdAt: any;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: List
// ====================================================

export interface List {
  __typename: "List";
  id: number;
  title: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeamBoard
// ====================================================

export interface TeamBoard_boards {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface TeamBoard {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
  boards: TeamBoard_boards[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TeamDetail
// ====================================================

export interface TeamDetail_creator {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface TeamDetail_boards {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface TeamDetail_members {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

export interface TeamDetail {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  creator: TeamDetail_creator;
  boards: TeamDetail_boards[];
  members: TeamDetail_members[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Team
// ====================================================

export interface Team {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserDetail
// ====================================================

export interface UserDetail_teams {
  __typename: "Team";
  id: number;
  name: string;
  description: string;
}

export interface UserDetail_boards {
  __typename: "Board";
  id: number;
  title: string;
  description: string;
}

export interface UserDetail {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
  teams: UserDetail_teams[];
  boards: UserDetail_boards[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User
// ====================================================

export interface User {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  confirmed: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateBoardInput {
  title: string;
  description?: string | null;
  teamId?: number | null;
}

export interface CreateCardInput {
  title: string;
  listId: number;
}

export interface CreateListInput {
  title: string;
  boardId: number;
}

export interface CreateTeamInput {
  name: string;
  description?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateListInput {
  id: number;
  title?: string | null;
  position?: number | null;
}

export interface UpdateTeamInput {
  id: number;
  name?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
