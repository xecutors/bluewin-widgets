import withProps from 'recompose/withProps';
import News from './News';
import Loading from './Loading';

const NewsClassic = withProps(() => ({ isClassic: true }))(News);
const NewsLight = withProps(() => ({ isClassic: false }))(News);

export {
  NewsClassic,
  NewsLight,
  Loading,
};
