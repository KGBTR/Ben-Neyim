import {Submission} from '../Submission'
import {Comment} from '../Comment'
import { Redditor } from '../Redditor'

export interface State {
  Search: {
    UsernameAvailable: Boolean,
    Suggestion: Array<String>
  },
  Redditor: Redditor,
}