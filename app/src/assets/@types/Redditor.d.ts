import {Comment} from './Comment';
import {Submission} from './Submission'

export type Redditor = {
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
}

export type RedditorRaw = {
  icon_img: string
  name: string,
  created: number,
  created_utc: number,
  subreddit: {
    banner_img: string
    user_is_banned: boolean
    public_description: string
    subscribers: number
    banner_size: [number, number]
  }
}