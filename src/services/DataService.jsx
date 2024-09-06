import axios from "axios"

export const authAPI = axios.create({ baseURL: 'http://localhost:3000' });

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosServices.get(url, { ...config });

    return res.data;
};

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



  export const axiosServices = axios.create({ baseURL: 'http://localhost:3000/api' }); 

    axiosServices.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

  export const sendIncident = async (props) => {
    try {
      const {data} = await axiosServices.post('/incidents/inc/create', props) 
      return data;
    } catch (error) {
      console.log({error})
      throw 'HUBO UN ERROR'
    }
  
  };

  export const getReports = async () => {
    try {
      const {data} = await axiosServices.get('/incidents/inc/all') 
      return data;
    } catch (error) {
      console.log({error})
      throw 'HUBO UN ERROR'
    }
  
  };

  export const getReportbyId = async (id) => {
    try {
      const {data} = await axiosServices.get(`/incidents/inc/${id}`) 
      return data[0];
    } catch (error) {
      console.log({error})
      throw 'HUBO UN ERROR'
    }
  
  };

  export const updateIncident = async (props,id) => {
    try {
      const {data} = await axiosServices.put(`/incidents/inc/${id}`, props) 
      return data;
    } catch (error) {
      console.log({error})
      throw 'HUBO UN ERROR'
    }
  };


