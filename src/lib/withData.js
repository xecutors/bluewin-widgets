import withProps from 'recompose/withProps';

export default ({ url }) => withProps(() => ({ data: [], url }));
