import UpdateSupplier from "./UpdateSupplier";
import DeleteSupplier from "./DeleateSupplier";
import { useGetAllSupplier } from "../../../../hooks/api/useSupplierApi";
import { Typography } from "@mui/material";
import Drawer from "../../../../components/Drawer/Drawer";
import DetailAttachment from "../../attachment/components/DetailAttachment";
import DetailSupplier from "./DetailSupplier";

const createData = (
  id,
  fullName,
  ice,
  identifyFiscal,
  telephone,
  fax,
  address
) => {
  return { id, fullName, ice, identifyFiscal, telephone, fax, address };
};

export default function useAllSupplier() {
  const allSupplier = useGetAllSupplier();
  const supplierData = allSupplier?.data?.map((e) =>
    createData(
      e.id,
      e.name,
      e.ice,
      e.identifyFiscal,
      e?.telephone,
      e?.fax,
      e?.address
    )
  );

  const columns = [
    {
      field: "fullName",
      headerName: "Nom",
      width: 180,
      flex: 1.5,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Drawer btnName={params.formattedValue} title="Details Fournisseur">
            <DetailSupplier idSupplier={params.row.id} />
          </Drawer>
        );
      },
    },
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 180,
    //   renderCell: (params) => {
    //     // console.log(params);
    //     return (
    //       <Drawer btnName={params.formattedValue} title="Details Fournisseur">
    //         <DetailAttachment id={params.id} />
    //       </Drawer>
    //     );
    //   },
    // },
    { field: "ice", headerName: "ICE", width: 180 },
    { field: "identifyFiscal", headerName: "Identifient Fiscal", width: 180 },
    {
      field: "tel-fax",
      headerName: "Tel / Fax",
      width: 100,
      renderCell: (params) => {
        // return `${params?.row?.phone} / ${params?.row?.fax} `;
        return (
          <>
            <Typography variant="caption">
              tel: {params.row.telephone}
              <br />
              fax: {params.row.fax}
            </Typography>

            {/* <Typography variant="caption"></Typography> */}
          </>
        );
      },
    },
    { field: "address", headerName: "Adresse", width: 180, flex: 2 },

    // {
    //   field: "action",
    //   headerName: "",
    //   width: 100,
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <UpdateSupplier data={params.row} />
    //         <DeleteSupplier data={params.row} />
    //       </>
    //     );
    //   },
    // },
  ];
  return { supplierData, columns };
}
