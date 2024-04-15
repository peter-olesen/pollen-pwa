import { apiFetch } from '../utils/fetch.js';

//Used for checking modules works as intended
export const logMessage = async () => {
//  console.log('Hello World (app.js)'); // Console logs the string. Used to see if modular js is working
  const endpoint = 'https://catfact.ninja/fact'; // Change the endpoint variable to the desired endpoint
  const data = await apiFetch(endpoint);
//   console.log(data); // Console logs the data received from the endpoint
  
  // Random Cat Fact View Code
//   console.log(data.fact); // Console logs the data from data.fact received from the endpoint
  const catFactElm = document.getElementById('cat-fact');
  catFactElm.textContent = data.fact;
}