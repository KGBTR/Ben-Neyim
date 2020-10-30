import { GetterTree } from 'vuex'
import { State } from '@/assets/@types/store/State'
import { Getters } from '@/assets/@types/store/Getters'

export const getters: GetterTree<State, State> & Getters = {
  API_URL_SUBMISSION(state: State): string{
    // EXAMPLE:  https://api.pushshift.io/reddit/submission/search?author=AsimTahir&subreddit=burdurland&limit=100&filter=full_link
    return `${state.API.Base.PushShift}/submission/search?author=${state.Redditor.Username}&subreddit=burdurland&limit=100&filter=${state.API.Filter.Submission}`;
  },

  API_URL_COMMENT(state: State): string{
    // EXAMPLE:  https://api.pushshift.io/reddit/comment/search?author=AsimTahir&subreddit=burdurland&limit=100&filter=permalink
    return `${state.API.Base.PushShift}/comment/search?author=${state.Redditor.Username}&subreddit=burdurland&limit=100&filter=${state.API.Filter.Comment}`;
  },

  API_URL_USERNAME_AVAILABLE(state: State): string{
    // EXAMPLE:  https://api.reddit.com/api/username_available/.json?user=AsimTahir
    return `${state.API.Base.Reddit}/api/username_available/.json?user=${state.Redditor.Username}`
  },

  API_URL_REDDITOR(state: State): string{
    // EXAMPLE:  https://api.reddit.com/user/AsimTahir/about
    return `${state.API.Base.Reddit}/user/${state.Redditor.Username}/about`;
  },

  FORMATTED_LAST_SUBMISSION_ACTIVITY_DATE(state: State): Date{
    // TODO:  Format string date to Date object
    return state.Redditor.LastSubmissionActivityDate;
  },
  
  FORMATTED_LAST_COMMENT_ACTIVITY_DATE(state: State): Date{
    // TODO:  Format string date to Date object
    return state.Redditor.LastCommentActivityDate;
  },

  PRINTABLE_LAST_COMMENT_ACTIVITY_DATE(state: State): string{
    return state.Redditor.LastCommentActivityDate.toUTCString();
  },

  PRINTABLE_LAST_SUBMISSON_ACTIVITY_DATE(state: State): string{
    return state.Redditor.LastSubmissionActivityDate.toUTCString();
  }
}