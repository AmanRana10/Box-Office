import { useReducer, useEffect } from 'react';
import { act } from 'react-dom/test-utils';

function showReducer(prevState, action){
    switch(action.type){
        case 'ADD' : {
            return [...prevState, action.showId];
        }

        case 'REMOVE' : {
            return prevState.filter((showId)=> showId !== action.showId);
        }
        default : return prevState;
    }

}
const usePersistedReducer = (reducer, initialState, key) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    let persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(state))
  }, [state, key])

  return [state, dispatch];
};

export function useShow(key = 'shows'){
    return usePersistedReducer(showReducer, [] , key);
}