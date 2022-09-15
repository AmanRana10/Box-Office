import React, { useCallback, useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../components/CustomRadio';

/** ***********************************************************       */

const renderResults = results => {
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

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  let isShowsSearch = searchOption === 'shows';

  const onInputChange = useCallback(event => {
    setInput(event.target.value);
  },[setInput]);

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(res => {
      setResults(res);
      console.log(res);
    });
  };

  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  const onEnter = ev => {
    if (ev.keyCode === 13) onSearch();
  };

  
  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={onInputChange}
        onKeyDown={onEnter}
        value={input}
        placeholder="Search"
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="search-shows"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="search-actors"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
