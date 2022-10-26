const BASE_URL = "https://www.api.infomatica.pe/api/saveDatosPasajero2/"

export const storeForm = async (passenger) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passenger),
    });
    await response.json();
    // document.querySelector("form").reset();
    console.log("success");
  } catch (error) {
    console.log(error.message);
  }
};