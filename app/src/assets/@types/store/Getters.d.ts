import {State} from './State'

export interface Getters{
  API_URL_SUBMISSION(state: State): string
  API_URL_COMMENT(state: State): string
  API_URL_USERNAME_AVAILABLE(state: State): string
  API_URL_REDDITOR(state: State): string
  FORMATTED_LAST_SUBMISSION_ACTIVITY_DATE(state: State): Date
  PRINTABLE_LAST_SUBMISSON_ACTIVITY_DATE(state: State): string
  FORMATTED_LAST_COMMENT_ACTIVITY_DATE(state: State): Date
  PRINTABLE_LAST_COMMENT_ACTIVITY_DATE(state: State): string
}