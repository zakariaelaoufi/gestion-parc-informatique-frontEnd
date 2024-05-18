import UpdateArticle from "./UpdateArticle";
import DeleteArticle from "./DeleateArticlet";
import { useGetAllArticle } from "../../../../hooks/api/useArticleApi";

const createData = (id, article_name, article_unity, article_description) => {
  return { id, article_name, article_unity, article_description };
};

export default function useAllArticle() {
  const allArticle = useGetAllArticle();
  const articleData = allArticle?.data?.map((e) =>
    createData(
      e.id,
      e.name,
      e.unity,
      e.description
    )
  );

  const columns = [
    // { field: "id", headerName: "ID", width: 180 },
    { field: "article_name", headerName: "Nom d'article", width: 180 },
    { field: "article_description", headerName: "Description", width: 180 },
    { field: "article_unity", headerName: "Unité ", width: 180 },
    {
      field: "action",
      headerName: "",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <UpdateArticle data={params.row} />
            <DeleteArticle data={params.row} />
          </>
        );
      },
    },
  ];
  return { articleData, columns };
}
