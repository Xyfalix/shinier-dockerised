import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <h1>Access Denied!</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default AccessDenied;
