import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchForm from "./components/SearchForm";

function App(props) {
  return (
    <div className="container text-center">
      <h1 className="mt-3 mb-4">Hotel search</h1>
      <SearchForm />
    </div>
  );
}

export default App;
