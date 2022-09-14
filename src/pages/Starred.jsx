/* eslint-disable object-shorthand */
import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { useShow } from '../misc/custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

const Starred = () => {
  const [starred] = useShow();

  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show }) ))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Page is Loading</div>}
      {error && <div>Oops, error occured : {error}</div>}
      {!isLoading && !shows && <div>No shows were added.</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
