import axios from "axios"

export const authAPI = axios.create({ baseURL: 'http://localhost:3000' }); // http://localhost:3000/api/auth/login

export const loginUser = async ({ usernameOrEmail, password }) => {
    const user = await authAPI.post('/api/auth/login', { usernameOrEmail, password });
    return user.data
}

export const infoUser = async () => {
    const token = localStorage.getItem('token')
    const info = await authAPI.get('/api/auth/me', {
        headers: { Authorization: token }
    })
    return info.data
}

export const getExamenesByCurso = async (cursoId, token) => {
    const res = await authAPI.get(`/api/examenes/curso/${cursoId}`, {
      headers: { Authorization: token },
    });
    return res.data;
  };
  
  export const getExamenById = async (examenId, token) => {
    const res = await authAPI.get(`/api/examenes/${examenId}`, {
      headers: { Authorization: token },
    });
    return res.data;
  };
  
  export const sendRespuestaExamen = async (data, token) => {
    console.log(data);
    const res = await authAPI.post('/api/respuestas', data, {
      headers: { Authorization: token },
    });
    return res.data;
  };

