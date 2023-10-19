import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// const options = ['Option 1', 'Option 2'];

export default function ControllableStates({setUser,options, label,initialValue}:{setUser:any,options:Array<string>,label:string,initialValue:string}) {
  // console.log(initialValue)
  const [inputValue, setInputValue] = React.useState(initialValue);

  return (
    <div>
      <br />
      <Autocomplete
        // value={value}
        onChange={(event, newValue) => {
            setUser(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        // defaultValue={initialValue}
        value={inputValue}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
