import { State } from './State'
import { Submission } from '../Submission';
import { Comment } from '../Comment'
import { Redditor } from '../Redditor'

export interface Mutations {
  SET_REDDITOR_USERNAME(state: State, payload: string): void
  SET_REDDITOR(state: State, payload: Redditor): void
  SET_USERNAME_AVAILABLE(state: State, payload: boolean): void
  SET_SUBMISSIONS(state: State, payload: Array<Submission>): void
  SET_COMMENTS(state: State, payload: Array<Comment>): void
  SET_LAST_SUBMISSION_ACTIVITY_DATE(state: State, payload: Date): void
  SET_LAST_COMMENT_ACTIVITY_DATE(state: State, payload: Date): void
}