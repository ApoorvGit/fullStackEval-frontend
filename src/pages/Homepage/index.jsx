/* eslint-disable max-len */
/* eslint-disable arrow-parens */
import React from 'react';
import './Homepage.css';
import axios from 'axios';
import CollectionMenu from '../../components/CollectionMenu';
import ContentMenu from '../../components/ContentMenu';
import EditScreen from '../../components/EditScreen';

export default function Homepage() {
  const [contentTypes, setContentTypes] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState({});
  React.useEffect(() => {
    axios
      .get('http://localhost:8000/get-content-types/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        setContentTypes(response.data);
        setSelectedType(response.data[0]);
      });
  }, []);

  return (
    <div className="homepage">
      <CollectionMenu contentTypes={contentTypes} />
      <ContentMenu contentTypes={contentTypes} setContentTypes={setContentTypes} setSelectedType={setSelectedType} />
      <EditScreen selectedType={selectedType} setSelectedType={setSelectedType} />
    </div>
  );
}
