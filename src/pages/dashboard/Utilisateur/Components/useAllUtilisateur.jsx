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
  }));

  const columns = [
    {
      field: "immatricule",
      headerName: "Immatricule",
      width: 180,
      renderCell: (params) => {
        return (
          <Drawer
            width="60%"
            btnName={params.formattedValue}
            title="Details Utilisateur"
          >
            <AgentDetails idUtilisateur={params.row.idUtilisateur} />
          </Drawer>
        );
      },
    },
    {
      field: "nomUtilisateur",
      headerName: "Nom",
      width: 180,
      flex: 1.5,
    },
    {
      field: "prenomUtilisateur",
      headerName: "Prenom",
      width: 180,
    },
    {
      field: "nomTravail",
      headerName: "Travaille dans",
      width: 180,
      flex: 2,
    },
    { field: "email", headerName: "Email", width: 180, flex: 2 },
    {
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <UpdateUtilisateur data={params.row} />
            <DeleteUtilisateur data={params.row} />
          </>
        );
      },
    },
  ];

  return { rowsData, columns };
}

export default useAllUtilisateur;
