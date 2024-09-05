
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Rediriguir() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return null; 
}

export default Rediriguir;
