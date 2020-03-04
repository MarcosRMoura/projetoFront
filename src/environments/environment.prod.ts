export const environment = {
  production: true,
  apiUrl: 'https://projeto-api.herokuapp.com',

  tokenWhitelistedDomains: [ /localhost:8080/ ],
  tokenBlacklistedRoutes: [ /\/oauth\/token/ ]
}