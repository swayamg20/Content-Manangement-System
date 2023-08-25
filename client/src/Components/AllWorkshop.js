import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {useAuth} from '../context/AuthContext'
import { Card } from 'react-bootstrap';
import { Button } from '@mui/material';
import { height } from '@mui/system';

export default function AllWorkshop() {

    function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
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
      }, [currentUser]);

    const params = useParams()
    const [data,setData] = useState(''); 
    const [check,setCheck]= useState(false)

    const [datawork, setDataWork] = useState([]);
    const renderDetailsButton = (params) => {
      return (
          <strong>
              <Button
              disabled={true}
                  variant="contained"
                  color="primary"
                  // disabled={true}
                  size="small"
                  style={{ marginLeft: 16 }}
                  onClick={() => {
                      const currentRow = params.row;
                      axios.delete(`https://testing.techkriti.org/api23/main/tcm/delete-team/${currentRow._id}`)
                      .then((response)=>{
                          console.log(response.data)
                      }).catch((e)=>{
                          console.log(e)
                      })
                      Navigate('/')
                  }}
                     
  >
                 Delete 
              </Button>
          </strong>
      )
  }
  const renderAbstractButton = (params) => {
      return (
          <strong>
              <Button
                  disabled={true}
                  style={{ marginLeft: 16 }}
                  onClick={() => {
                      const currentRow = params.row;
                      if(currentRow.abstractLink)
                      return window.open(`${currentRow.abstractLink}`,'_blank')
                      else
                      return alert('Not Submit')
                  }}
              >               Link
                 
              </Button>
          </strong>
      )
  }

  const rendermemberPhone = (params) => {
    const phones = params.row.memberPhones;
    console.log(params.row)
    return (
        <strong>
               {
                    phones.map((e)=>{
                    return (
                        <>{e}<br/></>
                    )
                })}
               
          
        </strong>
    )
}
const rendermemberNames = (params) => {
    const phones = params.row.memberNames;
    console.log(params.row)
    return (
        <strong>
               {
                    phones.map((e)=>{
                    return (
                        <>{e}<br/></>
                    )
                })}
               
          
        </strong>
    )
}
const rendermemberTechIds = (params) => {
    const phones = params.row.memberTechIds;
    console.log(params.row)
    return (
        <strong>
               {
                    phones.map((e)=>{
                    return (
                        <>{e}<br/></>
                    )
                })}
               
          
        </strong>
    )
}
  const columns = [
      // { field: 'date', headerName: 'Time Stamp' , width:170},
      { field: 'createdAt', headerName: 'Time', width:100},
      { field: 'name', headerName: 'NAME', width:230},
      { field: 'email', headerName: 'EMAIL', width:230},
      { field: 'workshopName', headerName: 'WORKSHOP NAME' , width:300},
      { field: 'phone', headerName: 'PHONE', width:150},
      { field: 'city', headerName: 'CITY' , width:150},
      { field: 'state', headerName: 'STATE' , width:200},
      { field: 'payment', headerName: 'PAYMENT' , width:200},
      { field: 'caRef', headerName: 'CAREF' , width:200}
    ]

    let teamDetails;

function ShowData(){
    if(check===false){
        axios.get(`https://testing.techkriti.org/api23/main/tcm/get-all-workshops/`).then((response) =>{
            teamDetails = response.data;
            
            setDataWork(response.data);
            console.log(teamDetails)
        }).catch((e)=>console.log(e))
    }
        setCheck(true)

}  
    return (
    <div style={{paddingTop:'5.4%', paddingLeft:'3%', paddingRight:'3%'}}>
    {data==="admin" || data==="head"?<ShowData />:<>not</>}
    {
        data==="admin" || data==="head"?<> <h1>Total Number of Registrations: {datawork.length}</h1>
<div>
<div style={{ display: 'flex', height: '80vh' }}>
<div style={{ flexGrow: 1 }}>
<DataGrid getRowHeight={() => 'auto'} rows={datawork} columns={columns} pageSize={100} getRowId={(row) =>  generateRandom()} components={{ Toolbar: GridToolbar }} />

</div>
</div>
</div></>:<><Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card></>
    }
   
    </div>
  )
}
