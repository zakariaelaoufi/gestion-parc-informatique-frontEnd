import { Alert, Box, Pagination } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
  frFR,
} from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TableData({
  rows = [],
  columns = [],
  isDense = false,
}) {
  const { snackbarHTML, handleOpenSnackbar } = useSnackbar();
  const [clm, setClm] = useState(null);
  useEffect(() => {
    setClm(
      columns.map((e) => {
        // const w = (table?.current?.offsetWidth - 75) / columns.length;
        return {
          ...e,
          flex: e.flex || 1,
          // width: w <= e.width ? e.width : w
        };
      })
    );
  }, [columns]);
  /*-----------------------------*/

  const [filterModel, setFilterModel] = useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [],
  });
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [selectedRowsData, setSelectedRowsData] = useState([]);

  const handleSelectionModelChange = (selectionData) => {
    setSelectedRowsData(rows.filter((e) => selectionData.includes(e.id)));
  };

  return (
    <Box sx={{ my: 2, mb: 7 }}>
      {snackbarHTML}
      <DataGrid
        rows={rows}
        columns={clm || []}
        density={isDense === true ? "comfortable" : "standard"} // Corrected ternary usage
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionModelChange}
        rowSelectionModel={selectedRowsData.map((e) => e.id)}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 350 },
          },
        }}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        ignoreDiacritics
        filterModel={filterModel}
        onFilterModelChange={(newModel) => {
          // setSelectedRows([]) ;
          setFilterModel(newModel);
        }}
        pagination
        pageSize={10}
        pageSizeOptions={[5, 10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        // disableColumnSelector={true}

        autoHeight
        sx={{
          "--DataGrid-overlayHeight": "300px",
          transition: " 0.35s all ease-in-out",

          "& , & .MuiDataGrid-columnHeader , & .MuiDataGrid-cell , &.MuiDataGrid-main":
            {
              transition: " 0.35s all ease-in-out",
            },
        }}
        // onCellDoubleClick={(params) => {
        //   params.value &&
        //     params.value.length > 9 &&
        //     handleOpenSnackbar(params.value);
        // }}
      />
    </Box>
  );
}

function useSnackbar() {
  const [snackbar, setSnackbar] = useState({ state: false, content: "" });
  const handleOpen = (data) => {
    setSnackbar({ state: true, content: data });
  };
  const handleClose = () => {
    setSnackbar({ state: false, content: "" });
  };
  const snackbarHTML = (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackbar?.state || false}
      autoHideDuration={5000}
      onClose={handleClose}
      // message={snackbar?.content || ""}
      key={snackbar?.content || ""}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        variant="filled"
        sx={{ width: "100%", maxWidth: "400px" }}
      >
        {snackbar?.content}
      </Alert>
    </Snackbar>
  );
  return {
    snackbarHTML,
    handleOpenSnackbar: handleOpen,
    handleCloseSnackbar: handleClose,
  };
}
