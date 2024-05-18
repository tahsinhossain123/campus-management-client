/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles({
  formContainer: {
    width: '500px',
    padding: '20px',
    margin: '20px auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'left'
  },
  formTitle: {
    backgroundColor: '#1f2e3d',
    color: '#fff',
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '10px 10px 0 0',
    textAlign: 'center'
  },
  textField: {
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#1f2e3d',
    color: '#fff',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#3e4b5b',
    },
  },
});

const NewStudentView = ({ handleChange, handleSubmit, studentData, errors }) => {
  const classes = useStyles();

  // Render a New Student view with an input form
  return (
    <div className={classes.formContainer}>
      <Typography className={classes.formTitle} variant="h5">
        Add a Student
      </Typography>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div>
          <label>First Name:</label>
          <TextField
            variant="outlined"
            name="firstname"
            value={studentData.firstname}
            onChange={handleChange}
            error={!!errors.firstname}
            helperText={errors.firstname}
            fullWidth
            className={classes.textField}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <TextField
            variant="outlined"
            name="lastname"
            value={studentData.lastname}
            onChange={handleChange}
            error={!!errors.lastname}
            helperText={errors.lastname}
            fullWidth
            className={classes.textField}
          />
        </div>
        <div>
          <label>Email:</label>
          <TextField
            variant="outlined"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            className={classes.textField}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <TextField
            variant="outlined"
            name="imageUrl"
            value={studentData.imageUrl}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
        </div>
        <div>
          <label>GPA:</label>
          <TextField
            variant="outlined"
            name="gpa"
            type="number"
            value={studentData.gpa}
            onChange={handleChange}
            error={!!errors.gpa}
            helperText={errors.gpa}
            fullWidth
            className={classes.textField}
            inputProps={{ step: "0.01", min: "0.0", max: "4.0" }}
          />
        </div>
        <div>
          <label>Campus ID (optional):</label>
          <TextField
            variant="outlined"
            name="campusId"
            value={studentData.campusId}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
        </div>
        <Button type="submit" variant="contained" className={classes.button}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewStudentView;
