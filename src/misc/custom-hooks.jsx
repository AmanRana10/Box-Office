import { useReducer, useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { apiGet } from './config';

function showReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }
    default:
      return prevState;
  }
}
const usePersistedReducer = (reducer, initialState, key) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    let persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
};

export function useShow(key = 'shows') {
  return usePersistedReducer(showReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    let persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });

  function setPersistedInput(newState) {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  }
  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, show: action.show, error: null };
    }

    case 'FETCH-FAILURE': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

export function useShowHook(showId) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      show: null,
      isLoading: true,
      error: null,
    }
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FAILED', error: err.message });
      });

    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}
