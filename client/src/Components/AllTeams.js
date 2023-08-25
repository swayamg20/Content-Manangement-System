import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {useAuth} from '../context/AuthContext'
import { Card } from 'react-bootstrap';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';
//   import { GridExcelExportOptions } from '@mui/x-data-grid-premium';
import {CSVLink} from 'react-csv';

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        showLastButton
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

export default function AllTeams() {

    
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
    const [switchState,setSwitchState] = useState(false)
    const [datateam, setDatateam] = useState([]);
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
    // console.log(params.row)
    if(phones.length<6){
        for(var i=0; i<(6-phones.length); i++)
            phones.push("NULL")
    }
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
    // console.log(params.row)
    const len = [];
    if(phones.length<6){
        for(var i=0; i<(6-phones.length); i++)
            phones.push("NULL")
    }
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

const renderCA = (params) => {
    const phones = params.row.memberCA;
    // console.log(params.row)
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
    // console.log(params.row)
    if(phones.length<6){
        for(var i=0; i<(6-phones.length); i++)
            phones.push("NULL")
    }
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

const renderAbstractConfirmButton = (params) => {
    var abstractConfirm = params.row.abstractConfirm;
    console.log(abstractConfirm);
    const teamId = params.row.teamId;
    console.log(teamId)

    function handleAbstrack(){
        axios.put(`https://testing.techkriti.org/api23/tcm/confirm-abstract/${params.row.abstractConfirm}/${teamId}`).
        then((response)=>{
            console.log(response.data)
        }).catch((err)=>{
            console.log(err)
        })
        
        window.location.reload(true)
    }
    return (
        <>
        <Button onClick={handleAbstrack}>{abstractConfirm==="false"?<span style={{backgroundColor:'green', color:'#fff'}}>Set Confirmed</span>:<span style={{backgroundColor:'red', color:'#fff'}}>set Not Confirmed</span>}</Button>   
        </>
    )
    
}

// const renderAccomodation = (params) => {
//     var accomodation = params.row.accomodation;
//     // console.log(abstractConfirm);
//     const teamId = params.row.teamId;


//     function handleAbstrack(){
//         axios.put(`https://testing.techkriti.org/api23/tcm/confirm-abstract/${params.row.abstractConfirm}/${teamId}`).
//         then((response)=>{
//             console.log(response.data)
//         }).catch((err)=>{
//             console.log(err)
//         })
        
//         window.location.reload(true)
//     }
//     return (
//         <>
//         <Button onClick={handleAbstrack}>{abstractConfirm==="false"?<span style={{backgroundColor:'green', color:'#fff'}}>Set Confirmed</span>:<span style={{backgroundColor:'red', color:'#fff'}}>set Not Confirmed</span>}</Button>   
//         </>
//     )
    
// }

var newData = [
    datateam.memberNames,
    datateam.memberPhones
]



  const columns = [
      { field: 'date', headerName: 'Time Stamp' ,type: 'date', width:170},
      { field: 'teamId', headerName: 'teamId' , width:80},
      { field: 'competitions', headerName: 'Competitions', width:120},
      { field: 'teamName', headerName: 'Team Name' , width:130},
      { field: 'leaderName', headerName: 'Leader Name' , width:200},
      { field: 'leaderTechId', headerName: 'Leader Id', width:90},

      { field: 'abstractConfirm', 
      headerName: 'Abstract Confirm', 
      width:90,
      renderCell: renderAbstractConfirmButton,
      disableClickEventBubbling: true
      },
    //   { field: 'accomodation', 
    //   headerName: 'Accomodation', 
    //   width:90,
    //   renderCell: renderAccomodation,
    //   disableClickEventBubbling: true
    //   },
      { field: 'abstractLink', headerName: 'Abstract Link', width:80, renderCell: renderAbstractButton,
        disableClickEventBubbling: true},
      { field: 'memberNames', headerName: 'Member Names' , width:200,renderCell: rendermemberNames,
        disableClickEventBubbling: true},
      { field: 'memberTechIds', headerName: 'Member Tech Id', width:80 ,renderCell: rendermemberTechIds,
        disableClickEventBubbling: true},
      { field: 'memberPhones', headerName: 'Phones', width:100, renderCell: rendermemberPhone,
        disableClickEventBubbling: true},
        { 
            field: 'memberCA', 
            headerName: 'CA Code', 
            width:120 ,
            renderCell: renderCA,
            disableClickEventBubbling: true
          },
     
      
    ]

    let teamDetails;

function ShowData(){
    if(check===false)
    {
        axios.get(`https://testing.techkriti.org/api23/main/tcm/get-all-teams/`).then((response) =>{
            teamDetails = response.data;
            setDatateam(response.data.map((team) => {
				let newteam = team;
				if (newteam.memberNames.length < 6) {
					for (let i = newteam.memberNames.length; i < 6; i++) {
						newteam.memberNames.push("NULL");
					}
				}
                if (newteam.memberTechIds.length < 6) {
					for (let i = newteam.memberTechIds.length; i < 6; i++) {
						newteam.memberTechIds.push("NULL");
					}
				}
                if (newteam.memberPhones.length < 6) {
					for (let i = newteam.memberPhones.length; i < 6; i++) {
						newteam.memberPhones.push("NULL");
					}
				}
				return newteam;
			}));
            const jData=JSON.parse()
            console.log(jData);

            console.log(teamDetails)
        }).catch((e)=>console.log(e))
    }

    useEffect(() => {
        
      }, [datateam]);

        setCheck(true)

} 
let today = new Date();

    return (
    <div style={{paddingTop:'5.4%', paddingLeft:'3%', paddingRight:'3%'}}>
    {data==="admin" || data==="head" || data==="organizer"?<ShowData />:<>not</>}
    {
        data?<> <h1>Total Number of Registrations: {datateam.length}</h1>
        <CSVLink filename={`T-23-All-Users-${today.getDate()+"-"+ parseInt(today.getMonth()+1)+"-"+today.getFullYear()}.csv`} data={datateam}>XPORT</CSVLink>
<div>

<div style={{ display: 'flex', height: '80vh' }}>
<div style={{ flexGrow: 1 }}>
<DataGrid disableSelectionOnClick getRowHeight={() => 'auto'} rows={datateam} columns={columns} pageSize={100} getRowId={(row) =>  generateRandom()} components={{ Toolbar: GridToolbar,Pagination: CustomPagination, }}  />

</div>
</div>
</div></>:<><Card style={{marginTop:'5%'}}><h2 className='text-center'>Not Authorized</h2></Card></>
    }
   
    </div>
  )
}
