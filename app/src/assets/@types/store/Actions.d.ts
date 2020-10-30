import {ActionContext} from 'vuex'
import {State} from '../store/State'
import {Mutations} from '../store/Mutations'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>,
  getters<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[2]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  GET_API_REDDITOR_SUBMISSIONS({ commit, getters }: AugmentedActionContext): void
  GET_API_REDDITOR_COMMENTS({ commit, getters }: AugmentedActionContext): void
  GET_API_USERNAME_AVAILABLE({commit, getters}: AugmentedActionContext): void
  GET_API_REDDITOR_DATA({commit, getters}: AugmentedActionContext): void
}