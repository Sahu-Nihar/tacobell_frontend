import React, { useState } from 'react'
import { Box, Button, Divider, TextField } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
export default function AddItemDialog({ open, handleClose, cartData }) {
    const [name1, setName1] = useState('')
    const [price1, setPrice1] = useState(0);

    const handleChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        if (name === 'price') {
            setPrice1(value)
        } else if (name === 'name') {
            setName1(value)
        }
    }
    const onCancel = (e) => {
        handleClose()
    }

    const handleSubmit = async () => {
        console.log("User Id status:", cartData.userId);
        var itemsData = []
        if (name1 !== '' && price1 !== 0) { itemsData.push({ name: name1, price: price1 }) }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemsData)
        };
        fetch(`https://v142vfs394.execute-api.us-east-2.amazonaws.com/dev/${cartData.userId}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                handleClose()
            })
    }

    return (


        <Dialog
            fullWidth
            maxWidth="sm"
            id="hello"
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Add Item</DialogTitle>
            <Divider />
            <DialogContent>
                <Box component="form" autoComplete="off">
                    <div>
                        <TextField
                            label="Name*"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={name1}
                            defaultValue={''}
                        />
                        <TextField
                            label="Price*"
                            type="number"
                            name="price"
                            onChange={handleChange}
                            value={price1}
                            defaultValue={''}
                        />
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>
                    Submit
                </Button>
                <Button
                    onClick={onCancel}
                    color="primary"
                    variant="outlined"
                    style={{ width: '115px' }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
