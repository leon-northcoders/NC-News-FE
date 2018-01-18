import React from "react";

import { fetchArticles } from "../api";
import ArticleList from "./ArticleList";

class HomePage extends React.Component {
  state = {
    loading: true,
    articles: []
  };
  componentDidMount() {
    fetchArticles().then(body => {
      this.setState({ articles: body.articles, loading: false });
    });
  }
  render() {
    const {articles, loading} = this.state;

    return (
      <div>
        <h2>Latest Posts</h2>
        {
          loading ? 
            '🤔🤔🤔' : 
            <ArticleList articles={articles} />
        }
      </div>
    );
  }
}

export default HomePage;
