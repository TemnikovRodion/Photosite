import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function Logo(props) {
  return (
    <section className="logo">
      <Link to="/">Romanchuk Polina</Link>
    </section>
  );
}