import {Comment} from '@/assets/@types/Comment'
import { State } from '@/assets/@types/store/State'
import {Submission} from '@/assets/@types/Submission'

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
      Width: 48,
      Height: 48,
    },
    Banner: {
      URL: '',
      Width: 0,
      Height: 0,
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
  API: {
    Base:{
      PushShift: 'https://api.pushshift.io/reddit',
      Reddit: 'https://api.reddit.com'
    },
    Filter: {
      Submission: 'title,selftext,full_link,score,thumbnail,thumbnail_height,thumbnail_width,link_flair_background_color,link_flair_text,link_flair_text_color,created_utc,over_18,spoiler',
      Comment: 'body,permalink,created_utc,parent_id,retrieved_on,score,is_submitter',
    },
    Options: {
      method: 'GET',
      mode: 'no-cors',
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  },
}