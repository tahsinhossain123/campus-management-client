/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Inline styles
  const containerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    margin: '20px auto',
    borderRadius: '10px',
    width: '60%',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  const nameStyle = {
    color: '#1f2e3d',
    fontWeight: 'bold'
  };

  const imageStyle = {
    border: '2px solid white',
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    margin: '20px 0'
  };

  const infoStyle = {
    color: '#1f2e3d',
    margin: '10px 0'
  };

  const campusStyle = {
    fontWeight: 'bold',
    color: '#1f2e3d'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px'
  };

  const buttonStyle = {
    backgroundColor: '#1f2e3d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#3e4b5b'
  };

  return (
    <div style={containerStyle}>
      <h1 style={nameStyle}>{student.firstname + " " + student.lastname}</h1>
      <img 
        src={student.imageURL} 
        alt="student" 
        style={imageStyle}
      />
      <div>
        <h3 style={infoStyle}>First Name: {student.firstname}</h3>
        <h3 style={infoStyle}>Last Name: {student.lastname}</h3>
        <h3 style={infoStyle}>Email: {student.email}</h3>
        <h3 style={infoStyle}>GPA: {student.gpa}</h3>
        {student.campus ? (
        <h3 style={infoStyle}>Attends: <span style={campusStyle}>{student.campus.name}</span></h3>
        ) : (
          <h3 style={infoStyle}>Attends: Not enrolled</h3>
        )}
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => window.location.href=`/editstudent/${student.id}`}>Edit Student Information</button>
        <button style={buttonStyle} onClick={() => deleteStudent(student.id)}>Delete Student</button>
      </div>
    </div>
  );
};

export default StudentView;
