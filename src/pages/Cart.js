import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddItemDialog from './AdditemDialog'
import '../App.css'

function Cart({ cartData }) {
    const cartColumns = [
        {
            field: 'name',
            headerName: 'Item Name',
            width: 100,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 100,
            headerClassName: 'super-app-theme--header',
        },
    ]
    const [addOpen, setAddOpen] = useState(false)
    const [cartItems, setCartItems] = useState(cartData)
    const handleAddItemOpen = () => {
        setAddOpen(true)
    }
    const handleAddClose = () => {
        setAddOpen(false)
        getCartItems()
    }

    const getCartItems = async (accessToken) => {
        const response = await fetch(`https://v142vfs394.execute-api.us-east-2.amazonaws.com/dev/${cartData.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken
            }
        }).then(response => response.json())
            .then((data) => {
                console.log("Data response in cart.js:", data);
                setCartItems(data)
            });
    }

    return (
        <div>
            <div>
                <Box
                    sx={{
                        marginBottom:'20px',
                        '& .MuiDataGrid-root': {
                            width: '500px',
                            color: '#102770',
                            marginLeft: '30%'
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#102770',
                            fontWeight: '600',
                            color: '#ffeba7',
                        },
                        '& .MuiDataGrid-columnHeader--moving': {
                            backgroundColor: 'transparent !important',
                        },
                        '& .MuiDataGrid-row': {
                            backgroundColor: '#102770',
                            opacity: '0.6',
                            color: '#ffeba7',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#102770',
                        }
                    }}
                >
                    <a
                        className="btn mt-4"
                        onClick={() => handleAddItemOpen()}
                        style={{marginBottom:'20px', marginLeft: '56%'}}
                    >
                        Add Item
                    </a>

                    {cartItems.items && <DataGrid
                        disableColumnSelector
                        autoHeight
                        pagination
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        rows={cartItems.items}
                        columns={cartColumns}
                        isRowSelectable={false}
                        disableSelectionOnClick={true}
                        backgroundColor='#ffeba7'
                        width='500px' />}
                    <Typography style={{marginTop:'20px', textAlign:'center'}}>Total price: {cartItems.totalPrice}</Typography>
                    {addOpen && <AddItemDialog open={addOpen} handleClose={handleAddClose} cartData={cartData} />}
                </Box>
            </div>
        </div>
    )
}

export default Cart
