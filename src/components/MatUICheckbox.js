import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const MatUICheckbox = ({onChange, checked, id, label, disabled = false}) => {

  const handleChange = name => event => {
    onChange(name, event.target.checked);
  }

  return(
    <FormControlLabel
      control={
        <Checkbox 
          disabled={disabled}
          checked={checked} 
          onChange={handleChange(id)} 
          value={id} 
          color="primary"  
        />
      }
      label={label ? label : "Checkbox"}
    />
  );

}

export { MatUICheckbox }