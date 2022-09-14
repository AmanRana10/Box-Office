import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
const Navs = () => {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {LINKS.map((item, ind) => (
          <li key={ind}>
            <LinkStyled to={item.to} className={item.to === location.pathname ? 'active' :''}>{item.text}</LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
