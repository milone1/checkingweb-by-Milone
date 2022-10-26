import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Button, Select, InputLabel, DialogContentText, DialogContent, DialogTitle, Dialog, IconButton } from '@material-ui/core'
import { UserContext } from "../context/UserContext";
import { Box, FormControl, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import Slide from '@mui/material/Slide';
import { listTravel } from "../list";
import { listDocument } from "../list";
import { listSex } from "../list";
import { storeForm } from "../service";
import { getDataFromCodePassenger } from "../petitions";
import ListDropDown from "../components/ListDropDown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FormPassenger = ({ id }) => {

  const { listUser } = React.useContext(UserContext);

  const params = useParams();
  // const { correct, setCorrect } = React.useState('');
  const paperStyle = { margin: 120, padding: 20, height: 'auto', width: 350 }
  // const btnstyle = { margin: '50px 10px 20px 10px' }

  const [values, setValues] = useState({
  });
  const [open, setOpen] = useState(false);

  const [country, setCountry] = useState([]);

  //* change tNombre
  const [errorTNombre, setErrorTNombre] = useState(false);
  const [leyendTNombre, setLeyendTNombre] = useState("");

  //* change tApellido
  const [errorTApellidoPaterno, setErrorTApellidoPaterno] = useState(false);
  const [leyendTApellidoPaterno, setLeyendTApellidoPaterno] = useState("");

  //* change tMaterno
  const [errorTApellidoMaterno, setErrorTApellidoMaterno] = useState(false);
  const [leyendTApellidoMaterno, setLeyendTApellidoMaterno] = useState("");
  //* change tMaterno
  const [errorTDocumento, setErrorTDocumento] = useState(false);
  const [leyendTDocumento, setLeyendTDocumento] = useState("");
  //* change tDomicilio
  const [errorTDomicilio, setErrorTDomicilio] = useState(false);
  const [leyendTDomicilio, setLeyendTDomicilio] = useState("");
  //* change telePhone
  const [errorTelePhone, setErrorTelePhone] = useState(false);
  const [leyendTelePhone, setLeyendTelePhone] = useState("");
  //* change Button
  const [button, setButton] = useState(true)

  const [codePassenger, setCodePassenger] = useState([]);

  const [ids, setIds] = useState(0)

  var regName = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
  var regNumbers = /^([0-9])*$/;

  const fetchDataFromCountry = async () => {
    const response = await getDataFromCodePassenger('https://www.api.infomatica.pe/api/getPaises/');
    setCountry(response);
  };

  const fetchDataCodePassenger = async () => {
    const response = await getDataFromCodePassenger('https://www.api.infomatica.pe/api/getCodigoPasajero/' + params.reserva + '/' + params.hotel);
    setCodePassenger(response)
  };

  const handleChangeInputs = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "tNombre":
        if (!regName.test(value)) {
          setErrorTNombre(true);
          setLeyendTNombre("Nombre Incorrecto.");
        } else {
          setErrorTNombre(false);
          setLeyendTNombre("");
        }
        break;
      case "tPaterno":
        if (!regName.test(value)) {
          setErrorTApellidoPaterno(true);
          setLeyendTApellidoPaterno("Apellido Paterno Incorrecto");
        } else {
          setErrorTApellidoPaterno(false)
          setLeyendTApellidoPaterno("");
        }
        break;
      case 'tMaterno':
        if (!regName.test(value)) {
          setErrorTApellidoMaterno(true);
          setLeyendTApellidoMaterno("Apellido Materno Incorrecto");
        } else {
          setErrorTApellidoMaterno(false)
          setLeyendTApellidoMaterno("");
        }
        break;
      case 'tDocumento':
        if (!regNumbers.test(value)) {
          setErrorTDocumento(true);
          setLeyendTDocumento("Documento Incorrecto");
        } else {
          setErrorTDocumento(false)
          setLeyendTDocumento("");
        }
        break;
      case 'tDomicilio':
        if (value.length === 0) {
          setErrorTDomicilio(true);
          setLeyendTDomicilio("Ingrese Domicilio Valido");
        } else {
          setErrorTDomicilio(false)
          setLeyendTDomicilio("");
        }
        break;
      case 'tCelular':
        if (!regNumbers.test(value)) {
          setErrorTelePhone(true);
          setLeyendTelePhone("Ingrese telefono válido");
        } else {
          setErrorTelePhone(false)
          setLeyendTelePhone("");
        }
        break;
      default:
    }

    setValues({
      ...values,
      [name]: value,
      tCodigoReserva: params.reserva,
      tHotel: params.hotel,
      lMigrado: 1,
      tCodigoPasajero: codePassenger[ids].tCodigoPasajero,
    });

    if (errorTNombre === false && errorTApellidoMaterno === false && errorTApellidoPaterno === false && errorTDocumento === false && errorTDomicilio === false && errorTelePhone === false && Object.entries(values).length === 13) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  const handleOpenDialog = () => {
    setOpen(!open);
  }

  const fetchStoreForm = async (id) => {
    if (listUser.length === 0) {
      listUser.push(values)
    } else {
      listUser[id] = values;
    }


    if ((id + 1) === parseInt(params.numPassenger)) {
      await storeForm(listUser);
      //* listUser.push(values)
      handleOpenDialog()
    }
  }

  console.log('parado en ' + ids);

  useEffect(() => {
    fetchDataFromCountry()
    fetchDataCodePassenger()
    setIds(id)
  }, [])
  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={10} style={paperStyle} key={id} className="paper">
              <FormControl >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        error={errorTNombre}
                        name="tNombre"
                        helperText={leyendTNombre}
                        onChange={handleChangeInputs}
                        label='Ingrese su Nombre:'
                        required
                      />
                    </Grid>
                    <Grid item={true} xs={12} sm={6}>
                      <TextField
                        error={errorTApellidoPaterno}
                        name="tPaterno"
                        helperText={leyendTApellidoPaterno}
                        onChange={handleChangeInputs}
                        label='Apellido paterno:'
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        error={errorTApellidoMaterno}
                        name="tMaterno"
                        helperText={leyendTApellidoMaterno}
                        onChange={handleChangeInputs}
                        label='Apellido Materno:'
                        required
                      />
                    </Grid>

                    <ListDropDown text="Ingrese el Documento:" list={listDocument} handleChangeInputs={handleChangeInputs} name="tTipoDocumento" />


                    <Grid item xs={12} md={12} >
                      <TextField
                        error={errorTDocumento}
                        name="tDocumento"
                        helperText={leyendTDocumento}
                        onChange={handleChangeInputs}
                        label='Documento'
                        placeholder='Número de documento:'
                        required
                      />
                    </Grid>

                    <ListDropDown text="Ingrese su género:" list={listSex} handleChangeInputs={handleChangeInputs} name="tSexo" />

                    <Grid item xs={12} md={12}>
                      <TextField
                        error={errorTDomicilio}
                        name="tDomicilio"
                        helperText={leyendTDomicilio}
                        onChange={handleChangeInputs}
                        label='Ingrese Domicilio:'
                        required
                      />
                      <TextField
                        error={errorTelePhone}
                        name="tCelular"
                        helperText={leyendTelePhone}
                        onChange={handleChangeInputs}
                        label='n° de Teléfono:'
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={{ xs: 4, sm: 4, md: 4 }}>
                        <InputLabel
                          variant="filled"
                          sx={{ color: "black" }}
                        >
                          <center>
                            Ingrese su pais:
                          </center>
                        </InputLabel>
                        <Select
                          name="tIdentificadorSunat"
                          onChange={handleChangeInputs}
                          variant="filled"
                        >
                          {country.length > 0 && country.map(element => (
                            <MenuItem value={element.tIdentificadorSunat}>
                              {element.tDescripcionPais}
                            </MenuItem>
                          ))
                          }
                        </Select>
                      </Stack>
                    </Grid>

                    <ListDropDown text="Ingrese su motivo de viaje:" list={listTravel} handleChangeInputs={handleChangeInputs} name="tMotivoViaje" />

                  </Grid>
                </Box>
                <center>
                  <Button className="btn-enviar" onClick={() => fetchStoreForm(id)} type='submit' color='primary' variant="contained" disabled={button}>Enviar</Button>
                </center>
              </FormControl >
            </Paper>

            <Dialog TransitionComponent={Transition} open={open} onClose={() => setOpen(!open)} maxWidth={"md"} fullWidth={true}>
              <div>
                <DialogTitle className="title-modal">
                  <IconButton onClick={() => setOpen(!open)} className="button-close">
                    Cerrar
                  </IconButton>
                </DialogTitle>
                <DialogContent className="modal">
                  <center className="content-title">
                    ENCUESTA DE SATISFACCION DEL CLIENTE
                  </center>
                  <DialogContentText>
                    ¿Que tan satisfecho estás con el proceso de Check in Express -- Llenando las Fichas?
                  </DialogContentText>
                  {/* <ListChips /> */}
                  <DialogContentText>
                    Comparta cualquier comentario y/o sugerencia.
                  </DialogContentText>
                  <TextField
                    label="Motivo de Viaje"
                    multiline
                    maxRows={10}
                  />
                  <Button variant="outlined">Enviar</Button>
                </DialogContent>
              </div>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
  );
}
