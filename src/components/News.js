import fetch from 'isomorphic-unfetch';
import React from 'react';
import Loading from './Loading';

const getFeed = async (url, limit) => {
  try {
    const results = await fetch(url);
    const jsonData = await results.json();
    const filteredResults = jsonData.json
      .filter(({ type }) => (type === 'teaser'))
      .map(({ json }) => json)
      .slice(0, limit);
    return filteredResults || [];
  } catch (e) {
    console.error(e);
  }
  return [];
};

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: true,
    };
    getFeed(props.url, props.isClassic ? 5 : 3)
      .then(result => this.setState({
        news: result,
        loading: false,
      }));
  }

  render() {
    const { isClassic } = this.props;
    const { news, loading } = this.state;
    return (
      <div className={`news ${isClassic ? 'news-classic' : 'news-light'}`}>
        News
        {loading ? (
          <Loading />
        ) : news.map(entry => (
          <div key={entry.id}>
            {entry.flag && (
              <span className={`flag flag-color-${entry.flag.color}`}>{entry.flag.text}</span>
            )}
            <img src={entry.image} alt={entry.title} />
            {entry.supertitle}
            {entry.title}
          </div>
        ))}
      </div>
    );
  }
}
