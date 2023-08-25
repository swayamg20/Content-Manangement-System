import React, {useRef, useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom'
import { Card } from 'react-bootstrap';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AnalyticsDashboard } from 'react-analytics-charts';
// Over ten different commonly used charts are available
import { SessionsByDateChart, SessionsGeoChart } from 'react-analytics-charts';
// let value=0;
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



export default function Dashboard() {
  const navigate = useNavigate();
  const catRef = useRef();
  const subCatRef = useRef();
  const compNameRef= useRef();
  const prizeRef = useRef();
  const contentRef = useRef();
  const [error, setError] = useState('');
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState(''); 
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height:'100%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const {currentUser} = useAuth();

  useEffect(() => {
    setLoader(true)
    if (currentUser) {
      axios
        .get(
          `https://testing.techkriti.org/api23/auth/${currentUser.uid}`
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setLoader(false)
        })
        .catch((e) => console.log(e));
    } else {
      setData('');
    }
  }, []);

function CheckAccess(){
  if(data==="restricted")
  return <>You are not authorized</>
  else if(data==="admin")
  return <>you are admin</>
  else if(data==="organizer")
  return <>you are admin</>
  else if(data==="head")
  return <>you are head</>
}
  
  return (
    <div style={{paddingTop:'5%'}} className=''>
      {
        loader?(<><CircularProgress color="success" /></>):(<h1>You Are : {data}</h1>)
      }
      <Row md={3} className="">
      <Col>
    <Card>
      <Card.Header>Site: Main Site (Alpha + Beta)<br/> Access: {data}</Card.Header>
      <Card.Body>
        <Card.Title>Beta+Alpha Competitions</Card.Title>
        <Link to='/add-competition' style={{textDecoration:'none'}}><Button variant="outline-dark" style={{marginRight:'2%'}}>Add competitions</Button></Link>
        <Link to="/competitions" style={{textDecoration:'none'}}><Button variant="outline-dark" style={{marginRight:'2%'}}>List Competitions</Button></Link>
        <Link to="/user-details" style={{textDecoration:'none'}}><Button variant="outline-dark" style={{marginRight:'2%'}}>User Details</Button></Link>
        <Link to='/all-teams' style={{textDecoration:'none'}}><Button variant="outline-dark" style={{marginRight:'2%', marginTop:'2%'}}>Show All Teams</Button></Link>
        <Link to='/all-workshops' style={{textDecoration:'none'}}><Button variant="outline-dark" style={{marginRight:'2%', marginTop:'2%'}}>Show All Workshops</Button></Link>
        {
          data==="head"?<><Button  onClick={handleOpen} variant="outline-dark" style={{marginRight:'2%', marginTop:'2%'}}>Show Analytics <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
        </svg>
        </Button></>:<></>
        }

      </Card.Body>
      <Card.Footer className="text-muted">Active Email: {currentUser.email}</Card.Footer>
    </Card>
    </Col>
    <Col>
    <Card>
      <Card.Header>Site: (TOSC)</Card.Header>
      <Card.Body>
        <Card.Title>TOSC Data</Card.Title>
        
        {/* <Button variant="outline-dark" style={{marginRight:'2%'}}>{data ? <Link to='/add-competition' style={{textDecoration:'none'}}>Add competitions</Link> : <>yupp</>}</Button> */}
        <Button variant="primary">User Details</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Active Email: {currentUser.email}</Card.Footer>
    </Card>

    </Col>
    </Row>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <iframe  src="https://lookerstudio.google.com/embed/reporting/8df967ec-e7ca-4749-8a9b-9326f4b4cda6/page/ObKGD" frameborder="0" style={{border:"0", height:"100%", width:"100%"}} allowfullscreen></iframe>
        </Box>
      </Modal>

    </div>
  )
}
