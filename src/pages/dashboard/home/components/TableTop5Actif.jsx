import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { serverIMG } from "../../../../global";
import { useGetTop5Actif } from "../../../../hooks/api/useHomeApi";
import DeatailProduit from "../../produit/components/DeatailProduit";
import Drawer from "../../../../components/Drawer/Drawer";

export default function TableTop5Actif() {
  const { data, isLoading, isError } = useGetTop5Actif();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const rows =
    data?.map((e, index) => ({
      id: index,
      ...e,
    })) || [];

  const columns = [
    {
      field: "imageURL",
      headerName: "Image",
      renderCell: (params) => (
        <img
          src={`${serverIMG}/${params.row.imageURL}`}
          alt="img"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "contain",
            borderRadius: "5px",
            padding: "2px",
          }}
        />
      ),
    },
    {
      field: "nomProduit",
      headerName: "Nom",
      flex: 2,
      renderCell: (params) => (
        <Drawer
          width="60%"
          btnName={params.row.nomProduit}
          title="Details produit"
        >
          <DeatailProduit idProduit={params.row.idProduit} />
        </Drawer>
      ),
    },
    {
      field: "totalPiece",
      headerName: "Total Piece",
      width: 180,
    },
    {
      field: "nbActif",
      headerName: "Nb Actif",
      width: 180,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#e9d5ff",
              fontFamily: "cursive",
            }}
          >
            <TableCell
              align="center"
              colSpan={4}
              sx={{ borderBottom: "1px solid #e9d5ff", fontFamily: "cursive" }}
            >
              Top 3 des machines les plus actives
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#e9d5ff" }}>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align="center"
                style={{ minWidth: column.width }}
                sx={{ fontWeight: "bold", fontFamily: "cursive" }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align="center"
                  style={{ minWidth: column.width }}
                  scope="row"
                  sx={{ fontFamily: "cursive" }}
                >
                  {column.renderCell
                    ? column.renderCell({ row })
                    : column.field === "nomProduit" &&
                      row[column.field]?.length > 15
                    ? row[column.field].slice(0, 15) + "..."
                    : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
