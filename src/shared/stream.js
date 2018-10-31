import React from 'react';
import Header from './common/header';
import Footer from './common/footer';
import { Link } from 'react-router-dom';

class Stream extends React.Component {
  render() {
    return (
      <div className="stream-view">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default Stream;
