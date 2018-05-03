import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, NavItem, Card, CardTitle, Row, Col} from 'react-materialize';
import Articles from './components/Articles';
import Article from './components/Article';
import Search from './components/Search';
import * as API from './API';

class App extends Component {
  state = {
    articles: [],
    loading: true,
    searchTerm: ""
  }

  componentDidMount(){
    API.getArticles()
      .then((articles) => {
        this.setState({
          articles,
          loading: false,
          displaySearch: articles
        })
      })
  }

  render() {
    return this.state.loading?  <h1> loading </h1> : (
        <Router> 
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
            </header> 

            <Navbar brand="Northcoders News" left> 
              <li><Search articles={this.state.articles} onSearchChange={this.onSearchChange}/></li>             
              <li><NavLink to="/topics/coding">Coding</NavLink></li>
              <li><NavLink to="/topics/football">Football</NavLink></li>
              <li><NavLink to="/topics/cooking">Cooking</NavLink></li>
            </Navbar>  
            
            <Route exact path="/" render={(props) => <Articles {...props} articles={this.state.articles} searchTerm={this.state.searchTerm}/>}/>
            <Route path="/topics/:topic_id" render={(props) => <Articles {...props} articles={this.state.articles}/>}/>
            <Route path="/articles/:article_id" render={(props) => <Article {...props} articles={this.state.articles}/>}/>
          </div> 
        </Router>      
    );
  }

  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }
} 

export default App;
