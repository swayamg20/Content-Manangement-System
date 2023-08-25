import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {useAuth} from '../context/AuthContext'
import { Card } from 'react-bootstrap';
import { Button } from '@mui/material';

export default function TeamData() {

    function generateRandom() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const params = useParams()
    const [datateam, setDatateam] = useState([]);
    const [data, setData] = useState('');
    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={true}
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
                        // return alert(JSON.stringify(response.data, null, 4));
                        // window.location.reload(true);
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
    const columns = [
        { field: 'teamId', headerName: 'teamId' , width:80},
        { field: 'createdAt', headerName: 'Time Stamp' , width:120},
        { field: 'teamName', headerName: 'Team Name' , width:100},
        { field: 'leaderName', headerName: 'Leader Name' , width:100},
        { field: 'leaderTechId', headerName: 'Leader Tech Id', width:100},
        { field: 'memberNames', headerName: 'Member Names' , width:200},
        { field: 'memberTechIds', headerName: 'Member Tech Id', width:200},
        // { field: 'competitions', headerName: 'Competitions', width:80},
        { field: 'memberPhones', headerName: 'Member Phones', width:200},
        { field: 'abstractLink', headerName: 'Abstract Link', width:80,renderCell: renderAbstractButton,
        disableClickEventBubbling: true},
        {
            field: '_id',
            headerName: 'Delete',
            width: 150,
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,
        }
      ]
      
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

    let teamDetails;
    useEffect(()=>{
       
        axios.get(`https://testing.techkriti.org/api23/main/tcm/get-teams/${params.comp}`).then((response) =>{
            teamDetails = response.data;
            setDatateam(response.data);
            console.log(teamDetails)
        }).catch((e)=>console.log(e))
    
    },[])
  
    return (
    <div style={{marginTop:'5%'}}>TeamData
    <h1>{params.comp}</h1><br/>
    {data==="admin" || data==="head"?<>    <h1>Total Number of Teams: {datateam.length}</h1>

<div>
Competitions


<div style={{ display: 'flex', height: '500px' }}>
<div style={{ flexGrow: 1 }}>
<DataGrid rows={datateam} columns={columns} pageSize={12} getRowId={(row) =>  generateRandom()} components={{ Toolbar: GridToolbar }} />

</div>
</div>
</div></>:<Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card>}
    

    {/* <Table striped bordered hover>
    <thead>
        <tr>
          <th>#</th>
          <th>Team Id</th>
          <th>Team Name</th>
          <th>Members</th>
          <th>TechIds</th>
          <th>Phones</th>
          <th>Abstract Link</th>
        </tr>
      </thead>
      <tbody>
      {datateam.map((e,index=1)=>{
        return (
            <tr>
                <td>{index++}</td>
                <td>{e.teamId}</td>
                <td>{e.teamName}</td>
                <td>{e.memberNames.map(el=>{
                    return (
                        <tr>{el}</tr>
                    )
                })
                }</td>
                <td>{e.memberTechIds.map(el=>{
                    return (
                        <tr>{el}</tr>
                    )
                })
                }</td>
                <td>{e.memberPhones.map(el=>{
                    return (
                        <tr>{el}</tr>
                    )
                })

                }</td>
                <td><a href={e.abstractLink} target='_blank'>Abstract Link</a></td>
                <td><button>delete</button></td>
            </tr>
        )
    })}
        
      </tbody>
   
    </Table> */}
    </div>
  )
}
