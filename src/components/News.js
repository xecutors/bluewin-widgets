import 'isomorphic-unfetch';
import React from 'react';
import Loading from './Loading';

const getFeed = async (url, limit) => {
  try {
    const results = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'bluewin-mail',
      },
    });
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

const teaserColor = (entry) => {
  const backgroundColor = (entry.flag && entry.flag.color && entry.flag.color !== 'default') ?
    entry.flag.color : null;
  return {
    teaserStyle: backgroundColor ? { backgroundColor } : null,
    teaserClass: backgroundColor ? 'teaser__flag--special' : 'teaser__flag--default',
    ...entry,
  };
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
        {loading ? (
          <Loading />
        ) : news
          .map(teaserColor)
          .map(entry => (
            <a className="teaser-short" key={entry.id} target="_blank" rel="noopener noreferer" href={`https://www.bluewin.ch${entry.id}`}>
              <div className="teaser__img-wrap">
                <img className="teaser__img" src={entry.image_rect} alt={entry.title} />
              </div>
              <div className="teaser__text">
                {entry.flag && (
                <div className={`teaser__flag ${entry.teaserClass}`} style={entry.teaserStyle}>{entry.flag.text}</div>
              )}
                <h2 className="teaser__title">{entry.title}</h2>
              </div>
            </a>
        ))}
      </div>
    );
  }
}
