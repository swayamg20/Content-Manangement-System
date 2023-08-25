import React,{useState,useEffect} from 'react'
// import { MDBDatatable } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import CompNode from './CompNode';
import { Link } from 'react-router-dom';
import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';
import {useAuth} from '../context/AuthContext'
import { Card } from 'react-bootstrap';
import ReadMoreReact from 'read-more-react';

let allCompetitions;
axios.get('https://testing.techkriti.org/api23/get-competitions').then((response)=>{
    allCompetitions = response.data
    console.log(response.data)
}).catch((e)=>console.log(e))

export default function Competitions() {
  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
  const [datateam, setDatateam] = useState([]);
  const [data,setData] = useState(''); 

  const columns = [
      { field: 'title', headerName: 'ID' },
      { field: 'subTitle', headerName: 'ID' },
      { field: 'competitionsName', headerName: 'ID' },
      { field: 'description', headerName: 'Title'},
      { field: 'prizeMoney', headerName: 'Body' },
      { field: 'updatedBy', headerName: 'rvv'}
      
    ]
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
    useEffect(() => {
      axios.get('https://testing.techkriti.org/api23/get-competitions').then((response)=>{
    allCompetitions = response.data
    console.log(response.data)
    setDatateam(response.data);

}).catch((e)=>console.log(e))
    
    }, [])
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
    
    

  return (
    <div style={{marginTop:'5%', padding:'2%'}}>
    Competitions
    {/* <div style={{ display: 'flex', height: '500px' }}>
  <div style={{ flexGrow: 1 }}>
  <DataGrid rows={datateam} columns={columns} pageSize={12} getRowId={(row) =>  generateRandom()} components={{ Toolbar: GridToolbar }} />

  </div>
</div> */}
{data==="head" || data==="organizer" || data==="admin"?<>
<Table size="sm" bordered hover variant='dark' responsive>
    <thead>
        <tr>
          <th>#</th>
          <th>Competition Name</th>
          <th>Category</th>
          <th>Sub Category</th>
          <th>Image Link</th>
          
          <th>Content</th>
          <th>Prize Money</th>
          <th>Updated by</th>
          <th>Edit Access</th>
          <th>Team Details</th>
          
        </tr>
      </thead>
      <tbody>
      {allCompetitions.map((e,index=1)=>{
        return (
            <tr>
                <td>{index++}</td>
                <td>{e.competitionsName}</td>

                <td>{e.title}</td>
                <td>{e.subTitle}</td>
                <td className='tableData'>{e.imgLink}
               
                </td>
                
                <td>{e.description}</td>
                <td>{e.prizeMoney}</td>
                <td>{e.updatedBy}</td>
                {/* {data==="admin" || data==="head"} */}
                <td><Button variant='outline-dark'><Link style={{textDecoration:'none'}} to={`/edit/${e._id}`}>Click to edit</Link></Button></td>
                <td><Button variant='outline-dark'><Link style={{textDecoration:'none'}} to={`/detail/${e.competitionsName}`}>Registration Details</Link></Button></td>
            </tr>
        )
    })}
        
      </tbody>
   
    </Table></>:<><Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card></>}
     
     

    </div>
  )
}

