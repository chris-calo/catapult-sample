import React from 'react';
import Header from './common/header';
import Footer from './common/footer';
import { Link } from 'react-router-dom';

class Athlete extends React.Component {
  render() {
    return (
      <div className="athlete-view">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default Athlete;
