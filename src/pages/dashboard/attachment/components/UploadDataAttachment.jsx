import { useEffect, useState } from "react";
import useUploadDataXlsx from "../../../../hooks/utils/useUploadDataXlsx";

export default function useUploadDataAttachment({
  setData,
  reset = false,
  setReset = null,
}) {
  const { data = [], UploadButton } = useUploadDataXlsx();
  const articleAttachment = data
    ?.slice(1)
    ?.map((e) => [e[4], e[11], e[12], parseFloat(e[13]) / parseFloat(e[11])]);
  console.log(articleAttachment);
  useEffect(() => {
    setData(
      articleAttachment?.map((e) => {
        return {
          detailArticleMarche: {
            id: -1,
            article: { id: -1, name: e[0], unity: e[2] },
          },
          qte: e[1],
          price_UT: e[3],
        };
      })
    );
  }, [articleAttachment?.length]);

  return { articleAttachment, UploadButton };
}
