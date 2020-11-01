import { Comment } from '@/assets/@types/Comment'
import { State } from '@/assets/@types/store/State'
import { Submission } from '@/assets/@types/Submission'

export const state: State = {
  Search: {
    UsernameAvailable: false,
    Suggestion: Array<string>()
  },
  Redditor: {
    Username: '',
    UsernameLength: {
      Min: 3,
      Max: 20,
    },
    ProfilePhoto: {
      URL: '',
    },
    Banner: {
      URL: '',
    },
    IsBanned: false,
    PublicDescription: '',
    Subscriber: 0,
    CreatedDate: {
      Raw: new Date(),
      UTCDate: new Date(),
    },
    LastSubmissionActivityDate: new Date(),
    LastCommentActivityDate: new Date(),
    Submissions: Array<Submission>(),
    Comments: Array<Comment>(),
  },
}