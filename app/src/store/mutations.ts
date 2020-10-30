import { MutationTree } from 'vuex';
import { State } from '@/assets/@types/store/State';
import { Mutations } from '@/assets/@types/store/Mutations'

import { Comment } from '@/assets/@types/Comment'
import { Submission } from '@/assets/@types/Submission'
import { Redditor } from '@/assets/@types/Redditor';

export const mutations: MutationTree<State> & Mutations = {  
  SET_REDDITOR_USERNAME(state: State, payload: string){
    state.Redditor.Username = payload;
  },
  
  SET_SUBMISSIONS(state: State, payload: Array<Submission>){
    debugger;
    state.Redditor.Submissions = payload;
  },

  SET_COMMENTS(state: State, payload: Array<Comment>){
    debugger;
    state.Redditor.Comments = payload;
  },

  SET_REDDITOR(state: State, payload: Redditor){
    state.Redditor = payload;
  },

  SET_USERNAME_AVAILABLE(state: State, payload: boolean){
    state.Search.UsernameAvailable = payload;
  },

  SET_LAST_SUBMISSION_ACTIVITY_DATE(state: State, payload: Date){
    state.Redditor.LastSubmissionActivityDate = payload;
  },

  SET_LAST_COMMENT_ACTIVITY_DATE(state: State, payload: Date){
    state.Redditor.LastCommentActivityDate = payload;
  }
}