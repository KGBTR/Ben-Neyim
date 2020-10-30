import { ActionTree } from 'vuex'

import { State } from '@/assets/@types/store/State'
import { Actions, AugmentedActionContext } from '@/assets/@types/store/Actions'

import { Submission, SubmissionRaw } from '@/assets/@types/Submission';
import { Comment, CommentRaw } from '@/assets/@types/Comment';
import { Redditor, RedditorRaw } from '@/assets/@types/Redditor';

export const actions: ActionTree<State, State> & Actions = {
  async GET_API_REDDITOR_SUBMISSIONS({commit, getters}: AugmentedActionContext){
    await (await fetch(getters.API_URL_SUBMISSION)).json().then(
      (SubmissionsRaw) => {
        const Submissions: Array<Submission> = new Array<Submission>();
        SubmissionsRaw.data.forEach((Submission: SubmissionRaw) => {
          Submissions.push({
            Title: Submission.title,
            Flair: {
              BackgroundColor: Submission.link_flair_background_color,
              Text: Submission.link_flair_text,
              TextColor: Submission.link_flair_text_color
            },
            FullLink: Submission.full_link,
            Score: Submission.score,
            RetrievedOn: Submission.retrieved_on,
            PublishDate: {
              Formatted: Submission.created_utc.toString(),
              Raw: new Date(Submission.created_utc)
            },
            Thumbnail: {
              URL: Submission.thumbnail,
              Height: Submission.thumbnail_height,
              Width: Submission.thumbnail_width,
            },
            SelfText: Submission.selftext,
            IsDeleted: {
              ByAuthor: false,
              ByModerator: false
            }
          })
        });;
        commit("SET_SUBMISSIONS", Submissions);
      }
    );
  },

  async GET_API_REDDITOR_COMMENTS({commit, getters}: AugmentedActionContext) {
    await (await fetch(getters.API_URL_COMMENT)).json().then(
      (CommentsRaw) => {
        const Comments = new Array<Comment>();
        CommentsRaw.data.forEach((Comment: CommentRaw) => {
          Comments.push({
            Body: Comment.body,
            FullLink: `https://reddit.com${Comment.permalink}`,
            PublishDate: {
              Raw: new Date(Comment.created_utc.toString()),
              Formatted: Comment.created_utc.toString(),
            },
            ParentID: Comment.parent_id,
            RetrievedOn: Comment.retrieved_on,
            Score: Comment.score,
            IsSubmitter: Comment.is_submitter,
          })
        })
        commit("SET_COMMENTS", Comments);
      }
    );
  },

  async GET_API_USERNAME_AVAILABLE({commit, getters}: AugmentedActionContext) {
    await (await fetch(getters.API_URL_USERNAME_AVAILABLE)).json().then(
      (UsernameAvailable) => {
        commit("SET_USERNAME_AVAILABLE", UsernameAvailable.data);
      }
    )
  },

  async GET_API_REDDITOR_DATA({commit, getters}: AugmentedActionContext) {
    await (await fetch(getters.API_URL_REDDITOR)).json().then(
      (RedditorRawData) => {
        const RedditorRaw: RedditorRaw = RedditorRawData.data;
        const Redditor: Redditor = {
          Username: RedditorRaw.name,
          ProfilePhoto: {
            URL: RedditorRaw.icon_img,
            Width: 256,
            Height: 256,
          },
          Banner: {
            URL: RedditorRaw.subreddit.banner_img,
            Width: RedditorRaw.subreddit.banner_size[0],
            Height: RedditorRaw.subreddit.banner_size[1]
          },
          IsBanned: RedditorRaw.subreddit.user_is_banned,
          PublicDescription: RedditorRaw.subreddit.public_description,
          Subscriber: RedditorRaw.subreddit.subscribers,
          CreatedDate: {
            Raw: new Date(RedditorRaw.created),
            UTCDate: new Date(RedditorRaw.created_utc),
          },
          LastSubmissionActivityDate: new Date(),
          LastCommentActivityDate: new Date(),
          Comments: new Array<Comment>(),
          Submissions: new Array<Submission>(),
        };
        commit("SET_REDDITOR", Redditor)
      }
    )
  }
}