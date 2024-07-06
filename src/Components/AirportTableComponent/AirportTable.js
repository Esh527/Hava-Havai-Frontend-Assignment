import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableView, TableHeader, Column, TableBody, Row, Cell } from '@react-spectrum/table';

const initialAirports = [
  { id: 1, name: "Indira Gandhi International Airport", country: "India", code: "DEL", terminal: "3", terminals: [{ id: 1, title: "Terminal 1", description: "Optional metadata should be two lines." }, { id: 2, title: "Terminal 2", description: "Optional metadata should be two lines." }] },
  { id: 2, name: "Dubai International Airport", country: "UAE", code: "DXB", terminal: 5, terminals: [] },
  { id: 3, name: "Heathrow Airport", country: "England", code: "LHR", terminal: 6, terminals: [] },
  { id: 4, name: "Istanbul Airport", country: "Turkey", code: "IST", terminal: 3, terminals: [] },
  { id: 5, name: "Rajiv Gandhi International Airport", country: "Texas", code: "DFW", terminal: 14, terminals: [] }
];

const AirportTable = () => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const savedAirports = JSON.parse(localStorage.getItem('airports')) || initialAirports;
    setAirports(savedAirports);
  }, []);

  return (
    <TableView  width="100%">
      <TableHeader>
        <Column>Name</Column>
        <Column>Country</Column>
        <Column>Code</Column>
        <Column>Terminal</Column>
      </TableHeader>
      <TableBody>
        {airports.map((airport) => (
          <Row key={airport.id}>
            <Cell>
              <Link to={`/airport/${airport.id}`}>{airport.name}</Link>
            </Cell>
            <Cell>{airport.country}</Cell>
            <Cell>{airport.code}</Cell>
            <Cell>{airport.terminal}</Cell>
          </Row>
        ))}
      </TableBody>
    </TableView>
  );
};

export default AirportTable;


