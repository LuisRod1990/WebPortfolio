export const environment = {
  production: false,
  authApi: 'https://localhost:44339/api/auth',  // API de autenticación en prod
  dataApi: 'https://localhost:44347/api/Portfolio',       // API de información en prod
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
