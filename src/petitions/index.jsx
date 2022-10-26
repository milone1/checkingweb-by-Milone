const BASE_URL = 'https://www.api.infomatica.pe/api/getCodigoPasajero/801138/12';
export const getDataFromCodePassenger = async (url = BASE_URL) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(e) {
    console.log(e.message)
  }
}
