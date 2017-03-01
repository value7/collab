import { INVALIDATE_PROJECTS, REQUEST_PROJECTS, RECEIVE_PROJECTS,
UPVOTE_PROJECT, UPVOTE_PROJECT_SUCCESS, UPVOTE_PROJECT_FAILURE }
from '../actions/projects';

const INITIAL_STATE = {isFetching: false, didInvalidate: false, projects: []};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case INVALIDATE_PROJECTS:
      return { ...state, error:null, didInvalidate: true};
    case REQUEST_PROJECTS:
      return { ...state, isFetching: true, didInvalidate: false};
    case RECEIVE_PROJECTS:
      return { ...state, isFetching: false, didInvalidate: false,
        projects: action.projects, lastUpdated: action.receivedAt};
    case UPVOTE_PROJECT:
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.projectId]: {
              ...state.projects[action.projectId],
              upvoted: true,
              votes: Number(state.projects[action.projectId].votes) + 1
          }
        }
      };
    //TODO
    // case UPVOTE_PROJECT_SUCCESS:
    //   return {};
    // case UPVOTE_PROJECT_FAILURE:
    //   return {};
    default:
      return state;
  }
}
