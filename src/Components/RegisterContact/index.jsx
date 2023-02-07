import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { AuthContext } from '../../Contexts/AuthContext';
import api from '../../Services/api';

const columns = [
  { field: 'id',
    headerName: 'ID', width: 150,
    headerAlign: 'center',
    align: 'center' 
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 230,
    editable: true,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 300,
    editable: true,   
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    editable: true,
    headerAlign: 'center',
    align: 'center',
    width: 160
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableClickEventBubbling: true,
    
    renderCell: (params) => {

      
        const handleEdit = async (e) => {
          const currentRow = params.row;

          const {name, email, age, phone} = currentRow

          const data = ({name, email, age, phone})

          console.log(data)
          
          const response = await api.patch(`/contacts/${currentRow.id}`, data)
          console.log(response)
        };

        const handleDelete = async (e) => {
          const currentRow = params.row;
          
          await api.delete(`/contacts/${currentRow.id}`)  
          
          return alert('Contato removido!')
        };
        
        
        return (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="warning" sx={{padding: 0}} onClick={handleEdit}>Edit</Button>
            <Button variant="outlined" color="error" size="small" onClick={handleDelete}>Delete</Button>
           </Stack>
        );
    },
  }
];


export default function DataGridTable() {
  
  const { contacts } = React.useContext(AuthContext)
  const [rows, setRows] = React.useState([...contacts])

  
  React.useEffect(()=> {
    setRows([...contacts]) 
  }, [contacts])

  if (!rows) {
    return (
      <>
        <h1>Loading</h1>
      </>
    )
  }
  

  return (
    <Box sx={{height: 620, width: '100%' }}>
      <h2>Lista de contatos</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}

      />
      
    </Box>
  );
}