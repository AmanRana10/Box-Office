import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  let isShowsSearch = searchOption === 'shows';
  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(res => {
      setResults(res);
      console.log(res);
    });
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onEnter = ev => {
    if (ev.keyCode === 13) onSearch();
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };
  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onEnter} value={input} />
      <div>
        <label htmlFor="search-shows">
          Shows
          <input
            id="search-shows"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="search-actors">
          Actors
          <input
            id="search-actors"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>

      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
