import {Comment} from '@/assets/@types/Comment'
import {Submission} from '@/assets/@types/Submission'

export const state = {
  Search: {
    UsernameAvailable: Boolean(),
    Suggestion: Array<string>()
  },
  Redditor: {
    Username: String(),
    ProfilePhoto: {
      URL: String(),
      Width: Number(),
      Height: Number(),
    },
    Banner: {
      URL: String(),
      Width: Number(),
      Height: Number(),
    },
    IsBanned: Boolean(),
    PublicDescription: String(),
    Subscriber: Number(),
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
    }
  },
}