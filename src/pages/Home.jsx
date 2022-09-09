import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(res => {
        console.log(res);
      });
  };

  const onEnter = (ev) => {
    if(ev.keyCode === 13)
      onSearch();
  }
  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onEnter} />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
