import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddItemDialog from './AdditemDialog'

function Cart({ cartData }) {
    // const [data, setData] = useState({})
    // const [totalPrice, setTotalPrice] = useState(0)
    // const [first, setFirst] = useState(true)
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
        getCartItems(cartData.accessToken)
    }

    const getCartItems = async (accessToken) => {
        const response = await fetch('http://18.225.10.147:4000/api/v1/cart/view', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken
            }
        }).then(response => response.json())
        .then((data) => {
            setCartItems(data.data)
        });
    }

    return (
        <div>
            <div>
                <Box
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#0d688d73',
                            fontWeight: '600',
                        },
                        '& .MuiDataGrid-columnHeader--moving': {
                            backgroundColor: 'transparent !important',
                        },
                    }}
                >
                    <Button
                        onClick={() => handleAddItemOpen()}
                    >
                        Add Item
                    </Button>

                    {cartItems.items && <DataGrid
                        disableColumnSelector
                        autoHeight
                        pagination
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        rows={cartItems.items}
                        columns={cartColumns}
                    />}
                    <Typography>Total price: {cartItems.totalPrice}</Typography>
                    {addOpen && <AddItemDialog open={addOpen} handleClose={handleAddClose} cartData={cartData} />}
                </Box>
            </div>
        </div>
    )
}

export default Cart
