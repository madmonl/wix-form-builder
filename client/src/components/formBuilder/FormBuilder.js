import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { addFormAsync } from '../formsList/FormsListSlice';

export default function FormBuilder() {
  const dispatch = useDispatch();
  const [body, setBody] = useState({});
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    dispatch(addFormAsync({
      title,
      body,
      submissions: []
    }));
  };

  const handleClose = (id) => {
    setBody({
      ...body,
      [id]: {
        ...body[id],
        open: false
      }
    });
  };

  const handleBodyChange = (event, type, id) => {
    setBody({
      ...body,
      [id]: {
        ...body[id],
        [type]: event.target.value,
        open: false
      }
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleOpen = (id) => {
    setBody({
      ...body,
      [id]: {
        ...body[id],
        open: true
      }
    });
  };

  const handleAddRow = () => {
    const id = uuidv4();
    setBody({
      ...body,
      [id]: {
        id,
        title: '',
        label: '',
        open: false,
        name: '',
        inputType: ''
      }
    });
  };

  return (
    <div className="form-builder">
      <Card className="form-builder__card" variant="outlined">
        <div className="form-builder__title">
          <TextField
            className="form-builder__title--input"
            label="Choose Form Title"
            value={title}
            onChange={(event) => handleTitleChange(event)}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddRow}
            className="form-builder__title--button"
          >
            <AddIcon />
          </Fab>
        </div>
        {Object.values(body).map(({
          label,
          name,
          inputType,
          open,
          id
        }) => (
          <FormControl
            key={id}
            className="form-builder__row"
          >
            <TextField
              label="Label"
              value={label}
              variant="outlined"
              onChange={(event) => handleBodyChange(event, 'label', id)}
            />
            <TextField
              className="form-builder__row--input"
              label="Input name"
              value={name}
              variant="outlined"
              onChange={(event) => handleBodyChange(event, 'name', id)}
            />
            <FormControl
              variant="outlined"
              className="form-builder__row--input form-builder__row--select"
            >
              <InputLabel>Type</InputLabel>
              <Select
                open={open}
                onClose={() => handleClose(id)}
                onOpen={() => handleOpen(id)}
                value={inputType}
                onChange={(event) => {
                  handleBodyChange(event, 'inputType', id);
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="color">Color</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="tel">Telephone</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
        ))}
        <Link className="link" onClick={handleSubmit} to="/forms-list">
          <Button
            color="secondary" 
            className="button--link button--small" 
            variant="contained"
          >Submit</Button>
        </Link>
      </Card>
    </div>
  );
}
