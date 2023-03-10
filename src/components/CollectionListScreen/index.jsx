/* eslint-disable */
import React from 'react';
import axios from 'axios';
import './CollectionListScreen.css';
import propTypes from 'prop-types';
import edit from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function CollectionListScreen({ contentType }) {
  const [collections, setCollections] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const handleAddNewEntrySubmit = e => {
    e.preventDefault();
    // console.log('abcd');
    const data = {};
    const formData = new FormData(e.target);
    console.log('formdata', formData);
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log('data', data);
    axios
      .post(`http://localhost:8000/add/collection/${contentType}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        // console.log(response.data);
        // console.log('collections', collections);
        setCollections([...collections, { id: response.data, values: JSON.stringify(data) }]);
      });
  };

  const deleteHandler = id => {
    axios
      .delete(`http://localhost:8000/delete-collection/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        console.log(response.data);
        setCollections(collections.filter(collection => collection.id !== id));
      });
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:8000/get-collections/${contentType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        console.log('collection', response.data[0].values);
        setCollections(response.data);
      });
    axios
      .get(`http://localhost:8000/get-fields/${contentType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        console.log('fields', response.data.fields);
        setFields(response.data.fields);
      });
  }, []);
  const collectionUpdateHandler = e => {
    e.preventDefault();
    const data = {};
    const formData = new FormData(e.target);
    console.log('formdata', formData);
    let id = null;
    for (let [key, value] of formData.entries()) {
      if (key !== 'id') {
        data[key] = value;
      } else {
        id = value;
      }
    }
    // console.log(id);
    // console.log('data', data);
    axios
      .patch(`http://localhost:8000/update/collection/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        // console.log(response.data);
        // console.log('collections', collections);

        setCollections([
          ...collections.filter(collection => collection.id != id),
          { id: id, values: JSON.stringify(data) },
        ]);
      });
  };
  return (
    <div className="collection-list-screen">
      <div className="collection-list-screen-header">{contentType}</div>
      <div className="collection-count-and-entry">
        <div className="collection-count">{collections.length} Entries Found</div>

        <Popup
          contentStyle={{
            width: '40%',
            borderRadius: '10px',
            height: '100%',
            position: 'absolute',
            top: '0',
            right: '0',
          }}
          trigger={<div className="collection-new-entry">Add a New Entry</div>}
          modal
          nested>
          {close => (
            <div className="modal">
              <div className="content">
                <p className="heading">New {contentType}</p>
                <form onSubmit={handleAddNewEntrySubmit}>
                  {fields.map(field => (
                    <div>
                      <p>{field}</p>
                      <input type="text" className="modal-input" name={field} />
                    </div>
                  ))}
                  <div>
                    <button
                      type="button"
                      onClick={() => close()}
                      style={{ border: 'none', backgroundColor: 'white', marginLeft: '45%', width: '10%' }}>
                      Cancel
                    </button>
                    <button
                      style={{
                        backgroundColor: '#5905ce',
                        color: 'white',
                        padding: '13px',
                        width: '200px',
                        borderRadius: '8px',
                        margin: '20px',
                        fontSize: '15px',
                        border: 'none',
                      }}>
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div className="collection-heading">
        {collections.length > 0 && <div className="collection-heading-item"> ID</div>}
        {collections.length > 0 &&
          fields.map(key => (
            <div className="collection-heading-item">
              <p>{key}</p>
            </div>
          ))}
        {collections.length > 0 && <div className="collection-heading-item">Actions</div>}
      </div>
      <div className="collection-list">
        {collections.map(collection => (
          <div className="collection-list-item">
            <div className="collection-list-item-value">{collection.id}</div>
            {Object.values(JSON.parse(collection.values)).map((value, index) => (
              <div className="collection-list-item-value">{value}</div>
            ))}
            {/* {collection.values.map(field => (
              <div className="collection-list-item-value">{field}</div>
            ))} */}
            <div className="collection-list-item-value">
              <Popup
                contentStyle={{
                  width: '40%',
                  borderRadius: '10px',
                  height: '100%',
                  position: 'absolute',
                  top: '0',
                  right: '0',
                }}
                trigger={<img src={edit} alt="" />}
                modal
                nested>
                {close => (
                  <div className="modal">
                    <div className="content">
                      <p className="heading">Update {contentType}</p>
                      <form onSubmit={collectionUpdateHandler}>
                        <input type="text" className="modal-input" name="id" value={collection.id} />
                        {fields.map(field => (
                          <div>
                            <p>{field}</p>
                            <input type="text" className="modal-input" name={field} />
                          </div>
                        ))}
                        <div>
                          <button
                            type="button"
                            onClick={() => close()}
                            style={{ border: 'none', backgroundColor: 'white', marginLeft: '45%', width: '10%' }}>
                            Cancel
                          </button>
                          <button
                            style={{
                              backgroundColor: '#5905ce',
                              color: 'white',
                              padding: '13px',
                              width: '200px',
                              borderRadius: '8px',
                              margin: '20px',
                              fontSize: '15px',
                              border: 'none',
                            }}>
                            Create
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </Popup>

              <img src={deleteIcon} alt="" onClick={() => deleteHandler(collection.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
CollectionListScreen.propTypes = {
  contentType: propTypes.string.isRequired,
};
