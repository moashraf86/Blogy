import { createContext, useReducer } from "react";

// Define the initial state for comments
const initialState = {
  comments: [],
};

// Create the reducer function to handle state updates
const commentsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case "EDIT_COMMENT":
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case "FETCH_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    case "RESET_COMMENTS":
      return {
        comments: [],
      };
    default:
      return state;
  }
};

// Create the comments context
export const CommentsContext = createContext();

// Create the comments provider component
export const CommentsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        CommentsDispatch: dispatch,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
