import ListMarche from "./ListMarche";
import CreateMarche from "./CreateMarche";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Index() {
    const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["allMarche"] });   
  }, [queryClient])

  return <h1>Marche</h1>;
}

export const ListMarchePage = ListMarche;
export const CreateMarchePage = CreateMarche;
