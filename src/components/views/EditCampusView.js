import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#e0f7fa',
    borderRadius: '5px',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#9c27b0', // Changed to purple
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none',
    color: '#FFFFFF', // Changed text color to white for contrast
    marginBottom: '20px',
  },
  formTitle: {
    backgroundColor: '#7b1fa2', // Darker shade of purple
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0 0',
    padding: '10px',
  },
  label: {
    color: '#FFFFFF', // Changed label color to white for contrast
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: '#00796b',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    marginTop: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px',
  },
}));

const EditCampusView = (props) => {
  const { handleChange, handleSubmit } = props;
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.title}>Edit Campus</h1>
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography style={{ fontWeight: 'normal', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#FFFFFF' }}>
            Enter New Info
          </Typography>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className={classes.label}>Image URL:</label>
          <input type="text" name="imageURL" className={classes.input} onChange={(e) => handleChange(e)} />

          <label className={classes.label}>Name:</label>
          <input type="text" name="name" className={classes.input} onChange={(e) => handleChange(e)} />

          <label className={classes.label}>Address:</label>
          <input type="text" name="address" className={classes.input} onChange={(e) => handleChange(e)} />

          <label className={classes.label}>Description:</label>
          <input type="text" name="description" className={classes.input} onChange={(e) => handleChange(e)} />

          <Button variant="contained" className={classes.submitButton} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCampusView;
