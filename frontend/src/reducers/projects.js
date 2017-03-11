import { INVALIDATE_PROJECTS, REQUEST_PROJECTS, RECEIVE_PROJECTS,
UPVOTE_PROJECT, UPVOTE_PROJECT_SUCCESS, UPVOTE_PROJECT_FAILURE, CANCEL_UPVOTE_PROJECT, GET_DETAILS,
GET_PROJECT, INCREMENT_STATE }
from '../actions/projects';

const INITIAL_STATE = {isFetching: false, didInvalidate: false, projects: []};

export default function(state = INITIAL_STATE, action) {
  console.log(action);
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
    case CANCEL_UPVOTE_PROJECT:
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.projectId]: {
              ...state.projects[action.projectId],
              upvoted: false,
              votes: Number(state.projects[action.projectId].votes) - 1
          }
        }
      };
    //TODO
    // case CANCEL_UPVOTE_PROJECT_SUCCESS:
    //   return {};
    // case CANCEL_UPVOTE_PROJECT_FAILURE:
    //   return {};

    case GET_DETAILS:
    console.log(action.payload);
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.projectId]: {
            ...state.projects[action.projectId],
            users: action.details
          }

        }
      };

    case GET_PROJECT:
    console.log(action.payload);
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.projectId]: action.project
        }
      };
      case INCREMENT_STATE:
        var phases = ['Draft', 'Planning', 'Execution', 'Completed'];
        return {
          ...state,
          projects: {
            ...state.projects,
            [action.projectId]: {
                ...state.projects[action.projectId],
                phase: phases[phases.indexOf(state.projects[action.projectId].phase) + 1]
            }
          }
        };
    default:
      return state;
  }
}
