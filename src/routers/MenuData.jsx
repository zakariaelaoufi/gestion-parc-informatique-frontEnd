/********** pages ************/

import Home from "../pages/dashboard/home";

import { ListUtiliasateurPage } from "../pages/dashboard/Utilisateur";
// import UserManagement2 from "../pages/dashboard/administration/__user-management";
// import Marche from "../pages/dashboard/marche";
import { CreateSupplierPage } from "../pages/dashboard/supplier";
import { DecomptePage } from "../pages/dashboard/attachment";

/********** icons ************/
import BroadcastOnHomeIcon from "@mui/icons-material/BroadcastOnHome";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { user_role } from "../global";
import { ListEntiteTravailPage } from "../pages/dashboard/EntiteTravail";
import { ListFournisseurPage } from "../pages/dashboard/Fournisseur";
import {
  CreateProduitPage,
  ListProduitPage,
  TestPage,
} from "../pages/dashboard/produit";
import {
  GenereBarCodePage,
  ListInventairePage,
} from "../pages/dashboard/Inventaire";
import { DemandePage, RecupererPage } from "../pages/dashboard/Demande";
import { CategoriePage } from "../pages/dashboard/Categorie";
import { MarquePage } from "../pages/dashboard/Marque";

export const MenuData = [
  {
    name: "Accueil",
    icon: <HomeRoundedIcon />,
    path: "",
    component: <Home />,
    permissions: [user_role.BO],
  },
  {
    name: "Produit",
    icon: <BroadcastOnHomeIcon />,
    path: "produits",
    component: <h1>Produit</h1>,
    permissions: [user_role.BO, user_role.DEPARTMENT],
    children: [
      {
        name: "Ajouter un produit",
        path: "ajouter-produit",
        component: <CreateProduitPage />,
        permissions: [user_role.BO],
      },
      {
        name: "Liste produit",
        path: "list-produit",
        component: <ListProduitPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Categorie",
        path: "categories",
        component: <CategoriePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Marque",
        path: "marques",
        component: <MarquePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Inventaire",
    icon: <InventoryIcon />,
    path: "inventaire",
    component: <h1>Inventaire</h1>,
    permissions: [user_role.BOT],
    children: [
      {
        name: "Liste inventaire",
        path: "liste-inventaire",
        component: <ListInventairePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Attribuer une machine",
        path: "affectation",
        component: <DemandePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Imprimer Barcode",
        path: "imprimer-barcode",
        component: <GenereBarCodePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Recuperation",
        path: "recuperation",
        component: <RecupererPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },

      {
        name: "GGGG",
        path: "decompte",
        component: <TestPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Fournisseur",
    icon: <AccountTreeIcon />,
    path: "fournisseur",
    component: <h1>Fournisseur</h1>,
    permissions: [user_role.BO, user_role.DEPARTMENT],
    children: [
      {
        name: "Ajouter un Fournisseur",
        path: "ajouter-fournisseur",
        component: <CreateSupplierPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "List Fournisseur",
        path: "list-fournisseur",
        component: <ListFournisseurPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Administration",
    icon: <AdminPanelSettingsIcon />,
    path: "administration",
    component: <h1>Administration</h1>,
    permissions: [user_role.SUPER_ADMIN],
    children: [
      {
        name: "Gestion Agent",
        path: "agents-management",
        component: <ListUtiliasateurPage />,
        permissions: [user_role.ADMIN, user_role.SUPER_ADMIN],
      },
      {
        name: "Gestion Entité Travail",
        path: "entite-travail-management",
        component: <ListEntiteTravailPage />,
        permissions: [user_role.SUPER_ADMIN],
      },
    ],
  },
];
