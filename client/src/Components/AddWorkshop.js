import React, {useRef, useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom'
import { Card } from 'react-bootstrap';

// let value=0;

export default function AddWorkshop() {
  const navigate = useNavigate();
  const workshopNameRef= useRef();
  const priceRef = useRef();
  const imgRef = useRef();
  const contentRef = useRef();
  const regDeadlineRef = useRef();
  const [error, setError] = useState('');
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(''); 
  const [data,setData] = useState(''); 


const {currentUser} = useAuth();

useEffect(() => {
    if (currentUser) {
      axios
        .get(
          `https://testing.techkriti.org/api23/auth/${currentUser.uid}`
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((e) => console.log(e));
    } else {
      setData('');
    }
  }, []);

async function handleSubmit(e) {
  e.preventDefault();
  console.log(workshopNameRef.current.value)
        await axios.post("https://testing.techkriti.org/api23/ctm/workshop",{
          workshopName: workshopNameRef.current.value,
          description: contentRef.current.value,
          price: priceRef.current.value,
          imgLink: imgRef.current.value,
          registrationDeadline: regDeadlineRef.current.value,
          updatedBy: currentUser.email
        }).then((response)=>{
            setLoading(false)
            console.log(response)
            setSuccess('workshop Added')
            navigate('/workshop');

        }).catch((err)=>{
            setError('Error Aagayi behenchod')
            console.log(err)
        })
}
  
  return (
    <div style={{paddingTop:'5%'}}>
    <h1 className='text-center'> Add Competitions</h1>
    <h3>Logged in as: {data}</h3>
    <div>

    
    {data==="admin" || data==="head" || data==="organizer"? <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Workshop Name</Form.Label>
        <Form.Control type="text" placeholder="workshop Name" ref={workshopNameRef}  required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Workshop Content</Form.Label>
        <Form.Control type="text" placeholder="content" ref={contentRef} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price of Workshop</Form.Label>
        <Form.Control type="text" placeholder="10 crore" ref={priceRef} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image Link</Form.Label>
        <Form.Control type="text" placeholder="image link daal bhai" ref={imgRef} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Registration Deadline</Form.Label>
        <Form.Control type="text" placeholder="main fest se pehle" ref={regDeadlineRef} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
     
     
    </Form>  : <Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card>}

    </div>
    
    </div>
  )
}
