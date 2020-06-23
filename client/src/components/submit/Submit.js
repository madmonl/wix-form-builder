import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import { FormControl } from '@material-ui/core';
import { selectForm, addFormSubmissionAsync } from '../formsList/FormsListSlice';
import { Link } from 'react-router-dom';

function renderFields(fields, handleChange, submission) {
  return fields.map(({
    label, name, inputType, id
  }) => {
    switch (inputType) {
      case 'tel':
      case 'email':
      case 'number':
      case 'text':
      case 'date':
      case 'color':
        return (
          <div key={id}>
            <FormControl className="form-submit__card--question">
              <InputLabel className="form-submit__input-label">{label}</InputLabel>
              <Input
                name={name}
                type={inputType}
                value={submission[id] || ""}
                onChange={(event) => handleChange(event, id)}
              />
            </FormControl>
          </div>
        );
      default:
        return new TypeError(`Question with id: ${id} - has incorrect field`);
    }
  })
}

export default function Submit({ match }) {
  const dispatch = useDispatch();
  const { formID } = match.params;
  const { title, body } = useSelector((state) => selectForm(state, formID));
  const [submission, setSubmission] = useState({});
  const fields = Object.values(body);

  const handleChange = (event, id) => {
    setSubmission({
      ...submission,
      [id]: event.target.value
    });
  };

  const handleSubmit = () => {
    setSubmission({
      ...submission,
      id: uuidv4()
    });
    dispatch(addFormSubmissionAsync({ submission, formID }));
  };

  return (
    <div className="form-submit">
      <Card className="form-submit__card" variant="outlined">
        <Typography className="form-submit__card--title">
          {title}
        </Typography>
        {renderFields(fields, handleChange, submission)}
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
