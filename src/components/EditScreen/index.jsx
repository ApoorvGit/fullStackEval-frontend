/* eslint-disable */
import React from 'react';
import './EditScreen.css';
import propTypes from 'prop-types';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import penIcon from '../../assets/user-pencil-write-ui-education.png';
import edit from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import Logout from '../../components/Logout';

export default function EditScreen({ selectedType, setSelectedType }) {
  const [newFieldName, setNewFieldName] = React.useState('');
  const [updatedTypeName, setUpdatedTypeName] = React.useState('');
  const newFieldHandler = e => {
    setNewFieldName(e.target.value);
  };
  const addNewFieldHandler = () => {
    axios
      .patch(
        `http://localhost:8000/add/field/${selectedType.content_type_name}`,
        { fieldName: newFieldName },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(() => {
        setNewFieldName('');
        setSelectedType({
          content_type_name: selectedType.content_type_name,
          fields: [...selectedType.fields, newFieldName],
        });
      });
  };
  const nameChangeHandler = e => {
    setUpdatedTypeName(e.target.value);
  };
  const updateHandler = () => {
    axios
      .patch(
        `http://localhost:8000/update/content-type-name/${selectedType.content_type_name}`,
        {
          contentTypeName: updatedTypeName,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then(() => {
        setSelectedType({
          content_type_name: updatedTypeName,
          fields: selectedType.fields,
        });
      });
  };
  const deleteFieldHandler = (contentTypeName, fieldName) => {
    axios
      .delete(`http://localhost:8000/delete/field/${contentTypeName}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { fieldName },
      })
      .then(() => {
        setSelectedType({
          content_type_name: selectedType.content_type_name,
          fields: selectedType.fields.filter(field => field !== fieldName),
        });
      });
  };

  return (
    <div className="edit-screen">
      <div className="edit-screen-title">
        <Logout />
      </div>
      <div className="edit-screen-content">
        <div className="content-type-name">
          {selectedType.content_type_name}
          <Popup
            contentStyle={{ width: '30%', borderRadius: '10px' }}
            trigger={<img src={penIcon} alt="pen" />}
            modal
            nested>
            {close => (
              <div className="modal">
                <div className="content">
                  <p className="heading">Change Content Type name</p>
                  <p>New Name</p>
                  <input type="text" onChange={nameChangeHandler} />
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
                    onClick={updateHandler}>
                    Create
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
        {selectedType.fields != null && <div className="field-count">{selectedType.fields.length} Fields</div>}
        <Popup
          contentStyle={{ width: '30%', borderRadius: '10px' }}
          trigger={
            <button className="add-another-field" type="button">
              Add Another Field
            </button>
          }
          modal
          nested>
          {close => (
            <div className="modal">
              <div className="content">
                <p className="heading">Add a new field</p>
                <p>Name of the field</p>
                <input type="text" onChange={newFieldHandler} />
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
                  onClick={addNewFieldHandler}>
                  Create
                </button>
              </div>
            </div>
          )}
        </Popup>
        {selectedType.fields != null &&
          selectedType.fields.map(field => (
            <div className="field">
              <div className="field-type">Ab</div>
              <div className="field-name">{field}</div>
              <div className="field-type-text">Text</div>
              <img src={edit} alt="edit" />
              <img
                src={deleteIcon}
                alt="delete"
                onClick={() => deleteFieldHandler(selectedType.content_type_name, field)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
EditScreen.propTypes = {
  selectedType: propTypes.objectOf(propTypes.any).isRequired,
  setSelectedType: propTypes.func.isRequired,
};
