const { VUE_APP_API_BASE_URL, NODE_ENV = '' } = process.env;

const environment = NODE_ENV.toLowerCase();
const apiBaseUrl = VUE_APP_API_BASE_URL || 'http://localhost:8080';

const storageName = 'silpion.project-timeline';
const AUTH = `${storageName}.auth`;

const TOKEN = `${storageName}.token`;

export { environment, apiBaseUrl, TOKEN, AUTH };
