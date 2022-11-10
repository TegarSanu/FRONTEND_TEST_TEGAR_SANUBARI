import React, { useEffect, useState } from 'react';
import { Navbar, Form, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {

  const [provinsi, setProvinsi] = useState([]);
  const [provinsiid, setProvinsiid] = useState('');
  const [kab, setKab] = useState([]);
  const [kabupatenid, setKabupatenid] = useState('');
  const [kec, setKec] = useState([]);

  useEffect(() => {
    fectData();
  }, []);

  const fectData = async () => {
    const response = await fetch('https://dev.farizdotid.com/api/daerahindonesia/provinsi');
    const data = await response.json();
    setProvinsi(data.provinsi);
    console.log(data);
  }

  const handleProvinsi=(event)=> {
    const getProvinsiid = event.target.value;
    console.log(getProvinsiid);
    setProvinsiid(getProvinsiid);
  }

  useEffect(() => {
    const getKab =async() =>{
      const response = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provinsiid}`);
      const data = await response.json();
      console.log(data);
      setKab(data.kota_kabupaten);
    }
    getKab();
  },[provinsiid]);

  const handleKabupaten=(event) => {
    const getKabupatenid = event.target.value;
    console.log(getKabupatenid)
    setKabupatenid(getKabupatenid);
  }

  useEffect(() => {
    const getKec =async() =>{
      const response = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${kabupatenid}`);
      const data = await response.json();
      console.log(data);
      setKec(data.kecamatan);
    }
    getKec();
  },[kabupatenid])

  return (

    <div>
      <h1>Soal 1 : Dropdown Bersambung</h1>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Form.Group className="mb-3" style={{ margin: '10px' }}>
          <Form.Label style={{ color: 'white' }}>Provinsi</Form.Label>
          <Form.Select onChange={(e) => handleProvinsi(e)}>
            <option>--Pilih Provinsi--</option>
            {provinsi.map((nama) => (
              <option value={nama.id} key={nama.id}>{nama.nama}</option>   
                ))
              }
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" style={{ margin: '10px' }}>
          <Form.Label style={{ color: 'white' }}>Kabupaten / Kota</Form.Label>
          <Form.Select onChange={(e) => handleKabupaten(e)}>
            <option>Pilih Kabupaten / Kota</option>
            {kab.map((kota) => (
              <option value={kota.id} key={kota.id}>{kota.nama}</option>   
                ))
              }
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" style={{ margin: '10px' }}>
          <Form.Label style={{ color: 'white' }}>Kecamatan</Form.Label>
          <Form.Select>
            <option>Pilih Kecamatan</option>
            {kec.map((camat) => (
              <option value={camat.id} key={camat.id}>{camat.nama}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Navbar>
    </div>
  )
}

export default NavbarComponent;
