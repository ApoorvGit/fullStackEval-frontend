/* eslint-disable */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import './CollectionMenu.css';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function CollectionMenu({ contentTypes }) {
  const navigate = useNavigate();
  return (
    <div className="collection-menu">
      <div className="site-logo" onClick={() => navigate('/')}>
        CMS+
      </div>
      <div className="collection-menu-header">
        <div className="collection-menu-header-title">COLLECTION TYPES</div>
        <i className="fa fa-search" aria-hidden="true" style={{ color: '#a8a8a8' }} />
      </div>
      <ul className="collection-item-list">
        {contentTypes.map((contentType, index) => (
          <li key={index}>
            <div
              className="collection-menu-item"
              onClick={() => {
                navigate(`/collection/${contentType.content_type_name}`);
                window.location.reload(false);
              }}>
              {contentType.content_type_name}
            </div>
          </li>
        ))}
      </ul>
      <div className="content-menu-header" onClick={() => navigate('/')}>
        CONTENT TYPES BUILDER
      </div>
    </div>
  );
}
CollectionMenu.propTypes = {
  contentTypes: propTypes.arrayOf(propTypes.object).isRequired,
};
