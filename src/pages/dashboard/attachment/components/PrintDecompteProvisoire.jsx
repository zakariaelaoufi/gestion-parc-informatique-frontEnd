import Print from "../../../../components/Export/Print/Print";
import TemplateDecompteProvisoire from "../../../../components/Export/Print/template/TemplateDecompteProvisoire";
import { useGetDecompteById } from "../../../../hooks/api/useDecompte";

export default function PrintDecompteProvisoire({ listDecompte = [] }) {
  const decompte = useGetDecompteById({ id: listDecompte[0] }).data;
  if (listDecompte.length <= 0 || !decompte) return <></>;

  const handlePrint = () => {
    console.log("print");
  };
  console.log("listDecompte --> ", listDecompte);
  console.log("decompte ---> ", decompte);

  return (
    <Print
      btnName="Imprimer"
      variant="contained"
      color="primary"
      sx={{ px: 5, color: "white" }}
      onPrint={handlePrint}
    >
      <TemplateDecompteProvisoire data={decompte} />
    </Print>
  );
}
