import {Submission} from '../Submission'
import {Comment} from '../Comment'

export interface State {
  Search: {
    UsernameAvailable: Boolean,
    Suggestion: Array<String>
  },
  Redditor: {
    Username: string
    ProfilePhoto: {
      URL: string
      Width: number
      Height: number
    }
    Banner: {
      URL: string
      Width: number
      Height: number
    }
    IsBanned: boolean
    PublicDescription: string
    Subscriber: number
    CreatedDate: {
      Raw: Date
      UTCDate: Date
    }
    LastSubmissionActivityDate: Date
    LastCommentActivityDate: Date
    Submissions: Array<Submission>
    Comments: Array<Comment>
  },
  API: {
    Base:{
      PushShift: String,
      Reddit: String
    },
    Filter: {
      Submission: String,
      Comment: String,
    }
  }
}