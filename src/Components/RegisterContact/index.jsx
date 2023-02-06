import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

const columns = [
  { field: 'id',
    headerName: 'ID', width: 90,
    headerAlign: 'center',
    align: 'center' 
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,    
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: false,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
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
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };
        
        return (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="warning" sx={{padding: 0}} onClick={onClick}>Edit</Button>
            <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button>
          </Stack>
        );
    },
  }
];


const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridTable() {
  return (
    <Box sx={{ height: 620, width: '100%' }}>
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