import React,{useEffect, useRef, useState} from 'react'
import {
    useParams, useNavigate
  } from "react-router-dom";
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useAuth} from '../context/AuthContext'
import { Card } from 'react-bootstrap';
export default function EditWorkshop() {

    const params = useParams();
    const navigate = useNavigate();
    const catRef = useRef();
    const subCatRef = useRef();
    const compNameRef= useRef();
    const prizeRef = useRef();
    const contentRef = useRef();
    const imgRef = useRef();
    const psLinkRef = useRef();
    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(''); 
    const [data, setData] = useState([])
    const {currentUser} = useAuth();
    const [access, setAccess] = useState('');

useEffect(()=>{
    axios.get(`https://testing.techkriti.org/api23/get-competitions/${params.id}`).then((response)=>{
    setData(response.data)
    }).catch((e)=>console.log(e))
},[])

console.log(data)
    useEffect(() => {
      if (currentUser) {
        axios
          .get(
            `https://testing.techkriti.org/api23/auth/${currentUser.uid}`
          )
          .then((response) => {
            console.log(response.data);
            setAccess(response.data);
          })
          .catch((e) => console.log(e));
      } else {
        setAccess('');
      }
    }, []);
   

    // console.log(compObj.title)

    async function handleSubmit(e) {

        e.preventDefault();
        console.log(compNameRef.current.value)
              await axios.put("https://testing.techkriti.org/api23/update-competition",{
                compName: compNameRef.current.value,
                content: contentRef.current.value,
                category: catRef.current.value,
                subCategory: subCatRef.current.value,
                prize: prizeRef.current.value,
                psLink:psLinkRef.current.value,
                imgLink: imgRef.current.value,
                objId: params.id,
                updateBy: currentUser.uid
                
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
    <div style={{marginTop:'5%'}}>Competition Id: {params.id} <br/>
    {access==="restricted"?<><Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card></>:<><><Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" ref={catRef} defaultValue={data.title} enabled />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sub Category</Form.Label>
        <Form.Control type="text" ref={subCatRef} defaultValue={data.subTitle}  />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Competition Name</Form.Label>
        <Form.Control type="text" ref={compNameRef} defaultValue={data.competitionsName} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Prize Money</Form.Label>
        <Form.Control type="text" ref={prizeRef} defaultValue={data.prizeMoney} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control type="text" ref={contentRef} defaultValue={data.description} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Problem Statement Link</Form.Label>
        <Form.Control type="text" ref={psLinkRef} defaultValue={data.problemStatementLink} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image Link</Form.Label>
        <Form.Control type="text" ref={imgRef} defaultValue={data.imgLink} />
      </Form.Group>
  
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form></></>}



    </div>
    
  )
}
