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
import Swal from 'sweetalert2';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FormPassenger = ({ id }) => {

  const { listUser } = React.useContext(UserContext);

  const params = useParams();
  const paperStyle = { margin: 120, padding: 20, height: 'auto', width: 300 }

  const [values, setValues] = useState({});
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
  const [ids, setIds] = useState(0);

  var Send = "Enviar";
  var Save = "Guardar";
  var lMigrado = 0;

  var regName = /^[a-zA-Z]+$/;
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
    //* al mover el tcodigo pasajero asegurar el cambio del numero valido para activar

    setValues({
      ...values,
      [name]: value,
      tCodigoReserva: params.reserva,
      tHotel: params.hotel,
      lMigrado: lMigrado,
      tCodigoPasajero: codePassenger[ids].tCodigoPasajero,
    });

    if (errorTNombre === false && errorTApellidoMaterno === false && errorTApellidoPaterno === false && errorTDocumento === false && errorTDomicilio === false && errorTelePhone === false && Object.entries(values).length === 13) {
      setButton(false)
    } else {
      setButton(true)
    }
    console.log(values)
  }

  const fetchStoreForm = (id) => {
    if (listUser.length === id) {
      listUser.push(values)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Agregado`,
        showConfirmButton: false,
        timer: 2000,
        color: '#000',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      listUser[id] = values;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Modificado`,
        showConfirmButton: false,
        timer: 2000,
        color: '#000',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }

    if ((id + 1) === parseInt(params.numPassenger)) {
      // listUser.push(values)
      // handleOpenDialog()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${listUser.length} registrados`,
        showConfirmButton: false,
        timer: 2000,
        color: '#000',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
    Swal.fire({
      title: `El formulario se enviara con la informaión de ${listUser.length} pasajeros`,
      showCancelButton: true,
      confirmButtonText: 'Registrar Pasajeros',
    }).then((result) => {
      if (result.isConfirmed) {
        fetchBtn()
        Swal.fire('Enviado Correctamente', '', 'success')
      }
    })

    console.log(listUser)
  }

  const fetchBtn = async () => {
    await storeForm(listUser);
  }

  if (id + 1 === params.numPassenger) {
    fetchBtn()
  }

  useEffect(() => {
    Swal.fire('Asegurese de rellenar los formularios en el orden asignado.')
    fetchDataFromCountry()
    fetchDataCodePassenger()
    setIds(id)
  }, [listUser])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={10} style={paperStyle} key={id} className="paper">
            <center>
              <Grid align='center' className="avatar">
                <h2>{id + 1}</h2>
              </Grid>
            </center>
            <FormControl >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      error={errorTNombre}
                      name="tNombre"
                      // disabled={stateFirst}
                      helperText={leyendTNombre}
                      onChange={handleChangeInputs}
                      label='Ingrese su Nombre:'
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item={true} xs={12} sm={6}>
                    <TextField
                      error={errorTApellidoPaterno}
                      name="tPaterno"
                      // disabled={stateFirst}
                      helperText={leyendTApellidoPaterno}
                      onChange={handleChangeInputs}
                      label='Apellido paterno:'
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={errorTApellidoMaterno}
                      name="tMaterno"
                      // disabled={stateFirst}
                      helperText={leyendTApellidoMaterno}
                      onChange={handleChangeInputs}
                      label='Apellido Materno:'
                      fullWidth
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
                      // disabled={stateFirst}
                      label='Documento'
                      fullWidth
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
                      // disabled={stateFirst}
                      onChange={handleChangeInputs}
                      label='Ingrese Domicilio:'
                      fullWidth
                      required
                    />
                    <TextField
                      error={errorTelePhone}
                      name="tCelular"
                      // disabled={stateFirst}
                      helperText={leyendTelePhone}
                      onChange={handleChangeInputs}
                      label='n° de Teléfono:'
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Stack
                      // direction={{ xs: 'column', sm: 'row' }}
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
                        displayEmpty
                        // autoWidth={true}
                        // className="dropDown-list"
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
                <Button
                  className="btn-enviar" onClick={() => fetchStoreForm(id)} type='submit' color='primary' variant="contained" disabled={button}>
                  {(id + 1) === parseInt(params.numPassenger) ? Send : Save}
                </Button>
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
