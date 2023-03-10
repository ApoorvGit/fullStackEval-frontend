/* eslint-disable */
import React from 'react';
import './ContentMenu.css';
import propTypes from 'prop-types';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

export default function ContentMenu({ contentTypes, setContentTypes, setSelectedType }) {
  const [contentTypeName, setContentTypeName] = React.useState('');
  const contentTypeNameHandler = e => {
    setContentTypeName(e.target.value);
  };
  const createRequestHandler = () => {
    axios
      .post(
        'http://localhost:8000/create/contentType/' + contentTypeName,
        {},
        {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(() => {
        setContentTypeName('');
        setContentTypes([...contentTypes, { content_type_name: contentTypeName, fields: [] }]);
      });
  };
  const contentTypeButtonHandler = selectedType => {
    setSelectedType(selectedType);
  };
  return (
    <div className="content-menu">
      <div className="content-menu-title">Content Types</div>
      <div className="content-count">
        <div className="count">{contentTypes.length} types</div>
        <i className="fa fa-search" aria-hidden="true" />
      </div>
      <Popup
        contentStyle={{ width: '30%', borderRadius: '10px' }}
        trigger={
          <button type="button" className="add-content-type">
            <i className="fa fa-plus" aria-hidden="true" />
            New Type
          </button>
        }
        modal
        nested>
        {close => (
          <div className="modal">
            <div className="content">
              <p className="heading">Create a new content type</p>
              <p>Name of the content type</p>
              <input type="text" onChange={contentTypeNameHandler} />
            </div>
            <div>
              <button
                type="button"
                onClick={() => close()}
                style={{ border: 'none', backgroundColor: 'white', marginLeft: '42%' }}>
                Cancel
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: '#5905ce',
                  color: 'white',
                  padding: '13px',
                  width: '200px',
                  borderRadius: '8px',
                  margin: '20px',
                  fontSize: '15px',
                  border: 'none',
                }}
                onClick={createRequestHandler}>
                Create
              </button>
            </div>
          </div>
        )}
      </Popup>
      {contentTypes.map(contentType => (
        <button type="button" className="content-type" onClick={() => contentTypeButtonHandler(contentType)}>
          {contentType.content_type_name}
        </button>
      ))}
    </div>
  );
}
ContentMenu.propTypes = {
  contentTypes: propTypes.arrayOf(propTypes.object).isRequired,
  setContentTypes: propTypes.func.isRequired,
  setSelectedType: propTypes.func.isRequired,
};
