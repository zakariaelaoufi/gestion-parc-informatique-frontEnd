import Drawer from "../../../../components/Drawer/Drawer";
import { useGetAllAttachment } from "../../../../hooks/api/useAttachmentApi";
import { Typography } from "@mui/material";
import DetailAttachment from "./DetailAttachment";

const createData = (
  id,
  numberAttachement,
  state,
  date_work_start,
  date_work_end,
  numberMarche,
  nameDepartement
) => {
  return {
    id,
    numberAttachement,
    state,
    date_work_start,
    date_work_end,
    numberMarche,
    nameDepartement,
  };
};

export default function useAllAttachment() {
  const allAttachment = useGetAllAttachment();
  // console.log(allAttachment.data);
  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  }
  const attachmentData = allAttachment?.data?.map((e) => {
    const sortedOper = e.operationAttachement
      ?.sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA - dateB;
      })
      .reverse();
    return createData(
      e.id,
      e.numberAttachement,
      sortedOper[0]?.state,
      e.date_works_start,
      e.date_works_end,
      e.marche.numberMarche,
      e.marche.departement.nameDepartement
    );
  });

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 180,
    //   renderCell: (params) => {
    //     // console.log(params);
    //     return (
    //       <Drawer btnName={params.formattedValue} title="Details Attachement">
    //         <DetailAttachment id={params.id} />
    //       </Drawer>
    //     );
    //   },
    // },
    {
      field: "numberAttachement",
      headerName: "Numero attachement",
      width: 180,
      flex: 1.5,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Drawer btnName={params.formattedValue + " | " + params.row.numberMarche} title="Details Attachement">
            <DetailAttachment id={params.row.id} />
          </Drawer>
        );
      },
    },
    { field: "state", headerName: "Etat", width: 180 },
    {
      field: "date_work_start",
      headerName: "Date debut du travaux",
      width: 180,
    },
    { field: "date_work_end", headerName: "Date fin du travaux", width: 180 },
    { field: "numberMarche", headerName: "Numero marche", width: 180 },
    { field: "nameDepartement", headerName: "Nom departement", width: 180 },
  ];
  return { attachmentData, columns };
}