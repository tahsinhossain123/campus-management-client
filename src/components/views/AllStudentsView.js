/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  studentCard: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    minHeight: '150px',
  },
  studentName: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0 auto',
    transition: 'text-decoration 0.3s',
    fontSize: '24px',  // Adjust font size for larger text
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    gap: '10px',  // Adjust gap between buttons
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  addButton: {
    fontSize: '18px',  // Larger font size for the button
    padding: '10px 20px',  // Larger padding for the button
    marginBottom: '20px',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '20px',  // Add some margin to the bottom of the title
  }
}));

const AllStudentsView = (props) => {
  const { students, deleteStudent, campusId } = props;
  const classes = useStyles();

  // If there is no student, display a message
  if (!students.length) {
    return (
      <div className={classes.container}>
        <p>There are no students.</p>
        <Link to={`newstudent`} className={classes.link}>
          <Button variant="contained" color="primary" className={classes.addButton}>Add New Student</Button>
        </Link>
      </div>
    );
  }

  // If there is at least one student, render All Students view 
  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>All Students</Typography>
      {students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id} className={classes.studentCard}>
            <Link to={`/student/${student.id}`} className={classes.link}>
              <Typography variant="h6" className={classes.studentName}>{name}</Typography>
            </Link>
            <div className={classes.buttonContainer}>
              <Button variant="contained" color="secondary" onClick={() => deleteStudent(student.id)}>Delete</Button>
              <Link to={`/editstudent/${student.id}`} className={classes.link}>
                <Button variant="contained" color="primary">Edit</Button>
              </Link>
              {campusId && campusId !== null && (
                <Link to={{
                  pathname: `/editstudent/${student.id}`,
                  query: { campusId }
                }} className={classes.link}>
                  <Button variant="contained" color="default">Enroll</Button>
                </Link>
              )}
            </div>
          </div>
        );
      })}
      <Link to={`/newstudent`} className={classes.link}>
        <Button variant="contained" color="primary" className={classes.addButton}>Add New Student</Button>
      </Link>
    </div>
  );
};

export default AllStudentsView;
