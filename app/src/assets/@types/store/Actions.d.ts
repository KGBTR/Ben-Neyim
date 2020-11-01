import { ActionContext } from 'vuex'

import { State } from './State'

export interface Actions {
  async GET_API_REDDITOR_SUBMISSIONS({ commit, getters, state }: ActionContext<State, State>): Promise<void>
  async GET_API_REDDITOR_COMMENTS({ commit, getters, state }: ActionContext<State, State>): Promise<void>
  async GET_API_USERNAME_AVAILABLE({ commit, getters, state }: ActionContext<State, State>): Promise<void>
  async GET_API_REDDITOR_DATA({ commit, getters, state }: ActionContext<State, State>): Promise<void>
}