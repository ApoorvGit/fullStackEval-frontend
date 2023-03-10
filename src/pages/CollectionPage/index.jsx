/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
import React from 'react';
import './CollectionPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CollectionMenu from '../../components/CollectionMenu';
import CollectionListScreen from '../../components/CollectionListScreen';

export default function CollectionPage() {
  const { contentType } = useParams();
  console.log('contenttype', contentType);
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
      <CollectionListScreen contentType={contentType} />
    </div>
  );
}
