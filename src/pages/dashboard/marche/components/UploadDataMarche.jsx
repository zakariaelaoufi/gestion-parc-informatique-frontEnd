import { useEffect, useState } from "react";
import useUploadDataXlsx from "../../../../hooks/utils/useUploadDataXlsx";

export default function useUploadDataMarche({
  setData,
  reset = false,
  setReset = null,
}) {
  const { data = [], UploadButton } = useUploadDataXlsx();
  const articleMarche = data?.slice(2)?.map((e) => [e[9], e[15], e[16], e[19]]);

  useEffect(() => {
    setData(
      articleMarche?.map((e) => {
        return {
          article: { id: -1 , name: e[0], unity: e[2] },
          price_UT: e[3],
          qte: e[1],
        };
      })
    );
  }, [articleMarche?.length]);

  return { articleMarche, UploadButton };
}
