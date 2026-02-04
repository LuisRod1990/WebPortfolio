export const environment = {
  production: true,
  //authApi: 'https://localhost:44344/api/auth',  // API de autenticación en prod
  //dataApi: 'https://localhost:44347/api/Portfolio',       // API de información en prod
  authApi: 'https://localhost:44339/api/auth',  // API de autenticación en prod
  dataApi: 'https://localhost:44347/api/Portfolio',       // API de información en prod
  endpoints: {
    login: '/login',
    refresh: '/refresh',
    getContacto: '/Get_Contact',
    getAptitudes: '/Get_Aptitudes',
    getExperiencia: '/Get_Experiencia',
    getFormacion: '/Get_Formacion',
    getSkills: '/Get_Skills',
    getTotalExperiencia: '/Get_TotalExperiencia',
  }
};
