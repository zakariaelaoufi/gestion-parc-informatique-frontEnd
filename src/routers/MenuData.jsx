/********** pages ************/

import Home from "../pages/dashboard/home";

import { ListUtiliasateurPage } from "../pages/dashboard/Utilisateur";
// import UserManagement2 from "../pages/dashboard/administration/__user-management";
// import Marche from "../pages/dashboard/marche";

/********** icons ************/
import BroadcastOnHomeIcon from "@mui/icons-material/BroadcastOnHome";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { user_role } from "../global";
import { ListEntiteTravailPage } from "../pages/dashboard/EntiteTravail";
import { ListFournisseurPage } from "../pages/dashboard/Fournisseur";
import { CreateProduitPage, ListProduitPage } from "../pages/dashboard/produit";
import {
  GenereBarCodePage,
  ListInventairePage,
} from "../pages/dashboard/Inventaire";
import {
  // AttacherPage,
  AttribuerPage,
  // DemandePage,
  RecupererPage,
} from "../pages/dashboard/Demande";
import { CategoriePage } from "../pages/dashboard/Categorie";
import { MarquePage } from "../pages/dashboard/Marque";

// pfe
import Face4Icon from "@mui/icons-material/Face4";
import DomainIcon from "@mui/icons-material/Domain";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";

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
        name: "Liste produit",
        path: "list-produit",
        component: <ListProduitPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Ajouter un produit",
        path: "ajouter-produit",
        component: <CreateProduitPage />,
        permissions: [user_role.BO],
      },
      // {
      //   name: "Fournisseur",
      //   path: "fournisseurs",
      //   component: <ListFournisseurPage />,
      //   permissions: [user_role.BO, user_role.DEPARTMENT],
      // },
      // {
      //   name: "Categorie",
      //   path: "categories",
      //   component: <CategoriePage />,
      //   permissions: [user_role.BO, user_role.DEPARTMENT],
      // },
      // {
      //   name: "Marque",
      //   path: "marques",
      //   component: <MarquePage />,
      //   permissions: [user_role.BO, user_role.DEPARTMENT],
      // },
    ],
  },
  {
    name: "Parc informatique",
    icon: <InventoryIcon />,
    path: "parc-informatique",
    component: <h1>Inventaire</h1>,
    permissions: [user_role.BOT],
    children: [
      {
        name: "Liste des machines",
        path: "liste-machines",
        component: <ListInventairePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Attribuer machine",
        path: "attibution",
        component: <AttribuerPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Recuperer machine",
        path: "recuperation",
        component: <RecupererPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
      {
        name: "Imprimer Barcode",
        path: "imprimer-barcode",
        component: <GenereBarCodePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Fournisseur",
    icon: <WarehouseIcon />,
    path: "fournisseur",
    component: <h1>Fournisseur</h1>,
    permissions: [user_role.BO, user_role.DEPARTMENT],
    children: [
      {
        name: "Liste fournisseur",
        path: "list-fournisseur",
        component: <ListFournisseurPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Categorie",
    icon: <CategoryIcon />,
    path: "categories",
    component: <h1>Categorie</h1>,
    permissions: [user_role.BO, user_role.DEPARTMENT],
    children: [
      {
        name: "Liste Categorie",
        path: "list-categories",
        component: <CategoriePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Marque",
    icon: <LocalMallIcon />,
    path: "marques",
    component: <h1>Marque</h1>,
    permissions: [user_role.BO, user_role.DEPARTMENT],
    children: [
      {
        name: "Liste Marque",
        path: "list-marques",
        component: <MarquePage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Employe",
    icon: <Face4Icon />,
    path: "employe",
    component: <h1>Employe</h1>,
    permissions: [user_role.BO, user_role.DEPARTMENT],
    children: [
      {
        name: "Liste employe",
        path: "list-employe",
        component: <ListUtiliasateurPage />,
        permissions: [user_role.BO, user_role.DEPARTMENT],
      },
    ],
  },
  {
    name: "Entité de Travail",
    icon: <DomainIcon />,
    path: "entite-travail",
    component: <h1>Entité de Travail</h1>,
    permissions: [user_role.SUPER_ADMIN],
    children: [
      {
        name: "Liste entité de travail",
        path: "list-entite-travail",
        component: <ListEntiteTravailPage />,
        permissions: [user_role.SUPER_ADMIN],
      },
    ],
  },
  // {
  //   name: "Administration",
  //   icon: <AdminPanelSettingsIcon />,
  //   path: "administration",
  //   component: <h1>Administration</h1>,
  //   permissions: [user_role.SUPER_ADMIN],
  //   children: [
  //     {
  //       name: "Gestion Agent",
  //       path: "agents-management",
  //       component: <ListUtiliasateurPage />,
  //       permissions: [user_role.ADMIN, user_role.SUPER_ADMIN],
  //     },
  //     {
  //       name: "Gestion Entité Travail",
  //       path: "entite-travail-management",
  //       component: <ListEntiteTravailPage />,
  //       permissions: [user_role.SUPER_ADMIN],
  //     },
  //   ],
  // },
];
