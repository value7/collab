import { INVALIDATE_PROJECTS, REQUEST_PROJECTS, RECEIVE_PROJECTS,
UPVOTE_PROJECT, UPVOTE_PROJECT_SUCCESS, UPVOTE_PROJECT_FAILURE, CANCEL_UPVOTE_PROJECT, GET_DETAILS,
GET_PROJECT, INCREMENT_STATE, DELETE_PROJECT_SUCCESS, EDIT_PROJECT_SUCCESS,
BECOME_MEMBER, BECOME_MEMBER_SUCCESS, BECOME_MEMBER_FAILURE }
from '../actions/projects';

import { CREATE_PROJECT_SUCCESS } from '../actions/createProject';

import { ADD_TASK_SUCCESS } from '../actions/addTasks';

function removeProject(projectId, state) {
  let copy = Object.assign({}, state);
  delete copy[projectId];
  return copy;
}

function editProject(project, state) {
  let copy = Object.assign({}, state);
  copy[project.id] = project;
  return copy;
}

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
            tasks: action.details
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
      case ADD_TASK_SUCCESS:
        console.log(action);
        console.log(state);
        return {
          ...state,
          projects: {
            ...state.projects,
            [action.payload.rows[0].projectid]: {
              ...state.projects[action.payload.rows[0].projectid],
              tasks: [
                ...state.projects[action.payload.rows[0].projectid].tasks,
                action.payload.rows[0]
              ]
            }
          }
        };
      case DELETE_PROJECT_SUCCESS:
        let projects = removeProject(action.projectId, state.projects);
        return {
          ...state,
          projects
        }
      case EDIT_PROJECT_SUCCESS:
        projects = editProject(action.project, state.projects);
        return {
          ...state,
          projects
        }
      case CREATE_PROJECT_SUCCESS:
        return {
          ...state,
          projects: {
            ...state.projects,
            [action.payload.id]: action.payload
          }
        }
      case BECOME_MEMBER_SUCCESS: {
        return {
          ...state,
          projects: {
            ...state.projects,
            [action.projectId]: {
              ...state.projects[action.projectId],
              members: state.projects[action.projectId].members.concat(action.user)
            }
          }
        }
      }
    default:
      return state;
  }
}
