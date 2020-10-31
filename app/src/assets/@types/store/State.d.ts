import {Submission} from '../Submission'
import {Comment} from '../Comment'
import { Redditor } from '../Redditor'

export interface State {
  Search: {
    UsernameAvailable: Boolean,
    Suggestion: Array<String>
  },
  Redditor: Redditor,
  API: {
    Base:{
      PushShift: String
      Reddit: String
    },
    Filter: {
      Submission: String
      Comment: String
    },
    Options: RequestInit
  }
}