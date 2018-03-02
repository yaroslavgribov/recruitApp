import React from 'react';
import PropTypes from 'prop-types';

const List = ({ list, renderImage, renderContent, renderActions }) => {
  return (
    <div className="list">
      {list &&
        list.map(item => {
          return (
            <article className="item" key={item.id}>
              <figure className="item-image">{renderImage(item)}</figure>
              <section className="item-content">{renderContent(item)}</section>
              <section className="item-actions">{renderActions(item)}</section>
            </article>
          );
        })}
    </div>
  );
};

List.propTypes = {
  list: PropTypes.array.isRequired,

  renderImage: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  renderActions: PropTypes.func.isRequired 
};

export default List;
