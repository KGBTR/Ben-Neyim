import { ActionContext } from 'vuex'

import { State } from './State'
import { Mutations } from '.Mutations'
import { Getters } from './Getters'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1]
  ): ReturnType<Actions[K]>
  // getters<K extends keyof Getters>(
  //   key: K,
  // ): ReturnType<Getters[K]> // TODO: 
  // state: State, // TODO: 
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  GET_API_REDDITOR_SUBMISSIONS({ commit, getters, state }: AugmentedActionContext): void
  GET_API_REDDITOR_COMMENTS({ commit, getters, state }: AugmentedActionContext): void
  GET_API_USERNAME_AVAILABLE({ commit, getters, state }: AugmentedActionContext): void
  GET_API_REDDITOR_DATA({ commit, getters, state }: AugmentedActionContext): void
}