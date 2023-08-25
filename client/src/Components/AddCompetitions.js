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

export default function AddCompetitions() {
  const navigate = useNavigate();
  const catRef = useRef();
  const subCatRef = useRef();
  const compNameRef= useRef();
  const prizeRef = useRef();
  const imgRef = useRef();
  const psLinkRef = useRef();
  const contentRef = useRef();
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
  console.log(compNameRef.current.value)
        await axios.post("https://testing.techkriti.org/api23/ctm/competitions",{
          compName: compNameRef.current.value,
          content: contentRef.current.value,
          category: catRef.current.value,
          subCategory: subCatRef.current.value,
          prize: prizeRef.current.value,
          psLink: psLinkRef.current.value,
          imgLink: imgRef.current.value,
          updatedBy: currentUser.uid
        }).then((response)=>{
            setLoading(false)
            console.log(response)
            setSuccess('Competition Added')
            navigate('/competitions');

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
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="technical" ref={catRef}  required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Sub Category</Form.Label>
        <Form.Control type="text" placeholder="Mandakini" ref={subCatRef} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Competition Name</Form.Label>
        <Form.Control type="text" placeholder="Comp Name" ref={compNameRef} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Prize Money</Form.Label>
        <Form.Control type="text" placeholder="10 crore" ref={prizeRef} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image Link</Form.Label>
        <Form.Control type="text" placeholder="10 crore" ref={imgRef} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Problem Statement Link</Form.Label>
        <Form.Control type="text" placeholder="10 crore" ref={psLinkRef} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Content</Form.Label>
        <Form.Control type="text" placeholder="Content" ref={contentRef} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
     
     
    </Form>  : <Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card>}

    </div>
    
    </div>
  )
}
