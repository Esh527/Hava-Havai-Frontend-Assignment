import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from '@react-spectrum/button';
import { Checkbox } from '@react-spectrum/checkbox';
import { TextField } from '@react-spectrum/textfield';
import { Link } from '@react-spectrum/link';
import { Heading, Text } from '@react-spectrum/text';
import { Flex } from '@react-spectrum/layout';
import './airportdetail.css';

Modal.setAppElement('#root');

const AirportDetail = () => {
  const { id } = useParams();
  const [airport, setAirport] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [terminalTitle, setTerminalTitle] = useState('');
  const [terminalDescription, setTerminalDescription] = useState('');
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description1, setDescription] = useState('');

  useEffect(() => {
    const savedAirports = JSON.parse(localStorage.getItem('airports'));
    const foundAirport = savedAirports.find((airport) => airport.id === parseInt(id));
    setAirport(foundAirport);
  }, [id]);

  const openModal = (terminal) => {
    setSelectedTerminal(terminal);
    setTerminalTitle(terminal.title);
    setTerminalDescription(terminal.description);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSaveTerminal = () => {
    const updatedAirport = { ...airport };
    if (selectedTerminal.id > airport.terminals.length) {
      updatedAirport.terminals.push({
        id: selectedTerminal.id,
        title: terminalTitle,
        description: terminalDescription
      });
    } else {
      const terminalIndex = updatedAirport.terminals.findIndex(t => t.id === selectedTerminal.id);
      updatedAirport.terminals[terminalIndex] = {
        ...selectedTerminal,
        title: terminalTitle,
        description: terminalDescription
      };
    }

    setAirport(updatedAirport);

    const savedAirports = JSON.parse(localStorage.getItem('airports'));
    const airportIndex = savedAirports.findIndex(a => a.id === updatedAirport.id);
    savedAirports[airportIndex] = updatedAirport;
    localStorage.setItem('airports', JSON.stringify(savedAirports));

    setModalIsOpen(false);
  };

  const openUploadModal = () => {
    setUploadModalIsOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalIsOpen(false);
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSaveImage = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedAirport = { ...airport };
        updatedAirport.image = reader.result;

        setAirport(updatedAirport);

        const savedAirports = JSON.parse(localStorage.getItem('airports'));
        const airportIndex = savedAirports.findIndex(a => a.id === updatedAirport.id);
        savedAirports[airportIndex] = updatedAirport;
        localStorage.setItem('airports', JSON.stringify(savedAirports));

        setUploadModalIsOpen(false);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setUploadModalIsOpen(false);
    }
  };

  const handleSaveService = () => {
    const updatedAirport = { ...airport };
    updatedAirport.services = updatedAirport.services || [];
    updatedAirport.services.push({
      serviceName,
      category,
      subCategory,
      description1,
      showImage
    });

    setAirport(updatedAirport);

    const savedAirports = JSON.parse(localStorage.getItem('airports'));
    const airportIndex = savedAirports.findIndex(a => a.id === updatedAirport.id);
    savedAirports[airportIndex] = updatedAirport;
    localStorage.setItem('airports', JSON.stringify(savedAirports));

    // Clear the form fields
    setServiceName('');
    setCategory('');
    setSubCategory('');
    setDescription('');
    setShowImage(false);
  };

  if (!airport) return <div>Loading...</div>;

  return (
    <div className="airport-detail-container">
      <Link>
        <RouterLink to="/">Airports<span>></span></RouterLink>
      </Link><Heading level={2}>{airport.name}</Heading>
      
      <Text>Country: {airport.country}</Text><br/>
      <Text>Code: {airport.code}</Text>
      <Heading level={3}>Terminals</Heading>
      <Flex direction="column" gap="size-200">
        {airport.terminals.map(terminal => (
          <Button key={terminal.id} variant="primary" onPress={() => openModal(terminal)}>
            {terminal.title} - {terminal.description}
          </Button>
        ))}
        <Button variant="cta" onPress={() => openModal({ id: airport.terminals.length + 1, title: '', description: '' })}>
          +Add Terminal
        </Button>
      </Flex>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Heading level={2}>Terminal title</Heading>
        <TextField label="Title:" placeholder="Please enter the terminal" value={terminalTitle} onChange={setTerminalTitle} />
        <TextField label="Description:" placeholder="Please enter the description" value={terminalDescription} onChange={setTerminalDescription} />
        <Flex gap="size-100" justifyContent="end">
          <Button variant="secondary" onPress={closeModal}>Cancel</Button>
          <Button className="save-button" onPress={handleSaveTerminal}>Save</Button>
        </Flex>
      </Modal>
      <Heading level={3}>Services</Heading>
      <Flex direction="column" gap="size-200">
        <h3>Lost & Found</h3>
        <TextField label="Service Name" placeholder='Lost&Found' value={serviceName} onChange={setServiceName} />
        <TextField label="Category" placeholder='option1' value={category} onChange={setCategory} />
        
        <TextField label="SubCatgory" placeholder='option1' value={subCategory} onChange={setSubCategory} />
        <TextField label="Description" placeholder='type here' value={description1} onChange={setDescription} />
        <Button variant="primary" onPress={openUploadModal}>Upload Image</Button>
        <Checkbox isSelected={showImage} onChange={setShowImage}>Show image</Checkbox>
        <Button  onPress={handleSaveService}>Save</Button>
      </Flex>
      <Modal isOpen={uploadModalIsOpen} onRequestClose={closeUploadModal}>
        <Heading level={2}>Upload Image</Heading>
        <input type="file" onChange={handleFileChange} />
        <Flex gap="size-100" justifyContent="end">
          <Button variant="secondary" onPress={closeUploadModal}>Cancel</Button>
          <Button variant="va" onPress={handleSaveImage}>Save</Button>
        </Flex>
      </Modal>
    </div>
  );
};

export default AirportDetail;

