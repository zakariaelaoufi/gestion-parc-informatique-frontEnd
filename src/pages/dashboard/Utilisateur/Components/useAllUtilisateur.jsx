import { Typography } from "@mui/material";
import Drawer from "../../../../components/Drawer/Drawer";
import { useGetAllUtilisateur } from "../../../../hooks/api/useUtilisateur";
import AgentDetails from "./AgentDetails";
import DeleteUtilisateur from "./DeleteUtilisateur";
import UpdateUtilisateur from "./UpdateUtilisateur";

function useAllUtilisateur() {
  const rowsData = useGetAllUtilisateur().data?.map((e, index) => ({
    id: index,
    idUtilisateur: e.idUtilisateur,
    immatricule: e.immatricule,
    email: e.email,
    nomUtilisateur: e.nomUtilisateur,
    prenomUtilisateur: e.prenomUtilisateur,
    nomTravail: e.travaillers?.reverse()[0]?.nomEntiteTravail?.toLowerCase(),
    idTravaill: e.travaillers?.reverse()[0]?.idTravail,
    idEntiteTravail: e.travaillers?.reverse()[0]?.idEntiteTravail,
    dateDebut: e.travaillers?.reverse()[0]?.dateDebut,
    typeEntiteTravail: e.travaillers?.reverse()[0]?.typeEntiteTravail,
    status: e.deleted ? "Hors service" : "En service",
  }));

  const columns = [
    {
      field: "immatricule",
      headerName: "Matricule",
      width: 180,
      renderCell: (params) => {
        return (
          <Drawer
            width="60%"
            btnName={params.formattedValue}
            title="Details Employé"
          >
            <AgentDetails idUtilisateur={params.row.idUtilisateur} />
          </Drawer>
        );
      },
    },
    {
      field: "",
      headerName: "Nom et Prénom",
      width: 180,
      flex: 2,
      renderCell: (params) => {
        return params.row.nomUtilisateur + " " + params.row.prenomUtilisateur;
      },
    },
    {
      field: "nomTravail",
      headerName: "Entité",
      width: 180,
      flex: 2,
    },
    {
      field: "status",
      headerName: "Statut",
      width: 180,
      flex: 2,
      renderCell: (params) => {
        return (
          <Typography
            color={params.row.status == "En service" ? "green" : "red"}
          >
            {params.row.status}
          </Typography>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180, flex: 2 },
    {
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          params.row.status == "En service" && (
            <>
              <UpdateUtilisateur data={params.row} />
              <DeleteUtilisateur data={params.row} />
            </>
          )
        );
      },
    },
  ];

  return { rowsData, columns };
}

export default useAllUtilisateur;
