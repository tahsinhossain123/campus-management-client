/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#9c27b0', // Purple background
    color: '#ffffff', // White text for contrast
    minHeight: '100vh',
  },
  image: {
    width: '60%',
    height: 'auto',
    objectFit: 'scale-down',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  text: {
    color: '#ffffff',
  },
  address: {
    fontSize: '16px',
    color: '#e0f7fa', // Light text for contrast
    marginBottom: '10px',
  },
  description: {
    fontSize: '14px',
    color: '#b2dfdb', // Light text for contrast
    marginBottom: '20px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#007BFF', // Primary blue
    color: '#ffffff',           // White text
    border: 'none',
    padding: '10px 20px',
    margin: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#0056b3', // Darker blue on hover
    },
  },
  editButton: {
    backgroundColor: '#4CAF50', // Green for edit
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#388e3c', // Darker green on hover
    },
  },
  deleteButton: {
    backgroundColor: '#f44336', // Red for delete
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#c62828', // Darker red on hover
    },
  },
  studentContainer: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    textAlign: 'left',
    backgroundColor: '#7b1fa2', // Darker purple
  },
  studentName: {
    margin: '5px 0',
    textDecoration: 'none',
    color: '#ffffff',
  },
}));

const CampusView = (props) => {
  const { campus, handleDelete, deleteStudent } = props;
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <img
        src={campus.imageURL}
        className={classes.image}
        alt={campus.name}
      />
      <Typography variant="h1" className={classes.text}>{campus.name}</Typography>
      <Typography className={classes.address}>{campus.address}</Typography>
      <Typography className={classes.description}>{campus.description}</Typography>
      
      {campus.students.length > 0 ? (
        campus.students.map((student) => (
          <div key={student.id} className={classes.studentContainer}>
            <Link to={`/student/${student.id}`} className={classes.studentName}>
              <Typography variant="h6">{student.firstname} {student.lastname}</Typography>
            </Link>
            <Button
              variant="contained"
              className={classes.deleteButton}
              onClick={() => deleteStudent(student)}
            >
              Remove Student
            </Button>
          </div>
        ))
      ) : (
        <Typography variant="h6" style={{ color: '#888', marginTop: '20px' }}>
          No students currently enrolled at this campus.
        </Typography>
      )}

      <div className={classes.buttonContainer}>
        <Link to={`/editcampus/${campus.id}`}>
          <Button className={`${classes.button} ${classes.editButton}`}>Edit Campus</Button>
        </Link>
        <Button
          variant="contained"
          className={`${classes.button} ${classes.deleteButton}`}
          onClick={handleDelete}
        >
          Delete Campus
        </Button>
        <Link to={{
          pathname: `/newstudent`,
          query: { campus_id: campus.id }
        }}>
          <Button className={classes.button}>Enroll New Student</Button>
        </Link>
        <Link to="/students">
          <Button className={classes.button}>Enroll Registered Student</Button>
        </Link>
      </div>
    </div>
  );
};

export default CampusView;
