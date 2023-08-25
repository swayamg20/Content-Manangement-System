import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {useAuth} from '../context/AuthContext'
import { Card } from 'react-bootstrap';
import {CSVLink} from 'react-csv';

export default function AllPayments() {

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

    const [datateam, setDatateam] = useState([]);
    const columns = [
        { field: 'techId', headerName: 'TechId', width:100 },
        { field: 'name', headerName: 'Name', width:160},
        { field: 'email', headerName: 'Email', width:230},
        { field: 'college', headerName: 'College', width:135},
        { field: 'phone', headerName: 'Phone Number', width:130},
        { field: 'competitions', headerName: 'Competitions', width:300},
        { field: 'workshops', headerName: 'Workshops', width:300},
        
        { field: 'payment', headerName: 'Payment', width:130}
      ]
    

    let teamDetails;

function ShowData(){
    if(check===false){
        axios.get("https://testing.techkriti.org/api23/main/tcm/paymentData/jfkd/hfkj/1/1/2/3/4/5/6").then((response) =>{
            teamDetails = response.data;
            setDatateam(response.data);
            console.log(teamDetails)
        }).catch((e)=>console.log(e))
    }
        setCheck(true)
}
   
    // const { data, loading } = datateam
  let today = new Date();
    return (
    <div style={{paddingTop:'5.4%', paddingLeft:'3%', paddingRight:'3%'}}>
    {data==="admin" || data==="head" || data==="organizer"?<ShowData />:<>not</>}
    {
        data==="admin" || data==="head" || data==="organizer"?<> <h1>Total Number of Registrations: {datateam.length}</h1>
        {/* <CSVLink filename={`T-23-All-Users-${today.getDate()+"-"+ parseInt(today.getMonth()+1)+"-"+today.getFullYear()}.csv`} data={datateam}>XPORT</CSVLink> */}
<div>

<div style={{ display: 'flex', height: '80vh' }}>
<div style={{ flexGrow: 1 }}>
<DataGrid rows={datateam} columns={columns} pageSize={100} getRowId={(row) =>  generateRandom()} components={{ Toolbar: GridToolbar }} />

</div>
</div>
</div></>:<><Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card></>
    }
   
    </div>
  )
}
