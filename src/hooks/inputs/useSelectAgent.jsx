import { useState } from "react";
import { useGetAllTravaille } from "../api/useTravailleApi";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function useSelectAgent() {
  const [travail, setTravail] = useState(-1);
  const allTravail = useGetAllTravaille();
  console.log(allTravail.data);
  const handleChange = (event) => {
    setTravail(event.target.value);
  };

  const renderHTML = (
    <>
      <FormControl fullWidth></FormControl>
      <InputLabel id="AgentTravail_label">Agent</InputLabel>
      <Select
        labelId="AgentTravail_label"
        value={travail}
        label="AgentTravail"
        variant="outlined"
        onChange={handleChange}
        required
      >
        <MenuItem value={-1} disabled>
          Choisir un agent
        </MenuItem>
        {allTravail?.data?.map((e) => (
          <MenuItem key={e.idTravail} value={e.idTravail}>
            {e.immatriculeFullName}
          </MenuItem>
        ))}
      </Select>
    </>
  );
  return { selectAgentHTML: renderHTML, travail };
}
