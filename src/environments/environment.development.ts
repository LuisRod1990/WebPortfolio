export const environment = {
  production: false,
  authApi: 'https://larj-services.duckdns.org/api/auth',  // API de autenticación en prod
  dataApi: 'http://ec2-3-142-208-223.us-east-2.compute.amazonaws.com:5001/api/Portfolio',       // API de información en prod
  endpoints: {
    login: '/login',
    refresh: '/refresh',
    getContacto: '/get_contact',
    getAptitudes: '/get_aptitudes',
    getExperiencia: '/get_experiencia',
    getFormacion: '/get_formacion',
    getSkills: '/get_skills',
    getTotalExperiencia: '/get_totalexperiencia',
  }
};
