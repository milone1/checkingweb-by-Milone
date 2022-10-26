import React from 'react';
import { Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Stack } from "@mui/system";

const ListDropDown = ({ text, list, handleChangeInputs, name }) => {
  return (
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
            {text}
          </center>
        </InputLabel>
        <Select
          name={name}
          onChange={handleChangeInputs}
          variant="filled"
        >
          {list.length > 0 && list.map(e => (
            <MenuItem value={e.value}>
              {e.text}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Grid>
  );
}

export default ListDropDown;