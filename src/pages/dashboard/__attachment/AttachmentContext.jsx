import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AttachmentContext = createContext("");

export function AttachmentContextData() {
  const [activeAttachment, setActiveAttachment] = useState(null);
  const modalStateData = useModalState();
  const modalTypeData = useModalType();
  const {
    initAttachmentData,
    setInitAttachmentData,
    currentAttachmentData,
    setCurrentAttachmentData,
  } = useAttachmentData();

  const searchAttachment = (searchData) =>
  searchAttachmentHandler(searchData, initAttachmentData, setCurrentAttachmentData);
  // const deleteUser = (userId) =>
  //   deleteUserHandler(userId, setInitUserData, setCurrentUserData);
  // const createUser = (userData) =>
  //   createUserHandler(userData, setInitUserData, setCurrentUserData);
  // const updateUser = (userData) =>
  //   updateUserHandler(
  //     userData,
  //     activeUser.id,
  //     setInitUserData,
  //     setCurrentUserData
  //   );
  getAttachmentData();

  return {
    AttachmentState,
    activeAttachment,
    setActiveAttachment,
    modalStateData,
    modalTypeData,
    attachmentData: currentAttachmentData,

    searchAttachment,
    // deleteUser,
    // createUser,
    // updateUser,
  };
}

/***********************  ************************* */

const AttachmentState = [
  { name: "in_progress", value: "encours" },
  { name: "valid", value: "validé" },
];

/****************** ****************/

const createAttachmentData = (
  id,
  nbr,
  date_work_start,
  date_work_end,
  date_attachment,
  marche,
  department
) => {
  return {
    id,
    nbr,
    date_work_start,
    date_work_end,
    date_attachment,
    marche,
    department,
  };
};
const createDateAttachmentData = (data) => {
  return data.map((e) => {
    return {
      id: e.id,
      date_arrival: e.date_arrival,
      date_return_four: e.date_return_four,
      date_send_dep: e.date_send_dep,
      date_return_dep: e.date_return_dep,
      observation: e.observation,
      state: e.state,
      isActive: e.isActive,
    };
  });
};
const createMarcheData = (
  id,
  nbr,
  label,
  amount,
  dateNotification,
  fournisseur
) => {
  return { id, nbr, label, amount, dateNotification, fournisseur };
};
const createFournisseurData = (id, ice, name) => {
  return { id, ice, name };
};
const createDepartmentData = (id, name) => {
  return { id, name };
};
function getAttachmentData() {
  const list_date_attachment = [
    {
      id: 545,
      date_arrival: "20/05/2023",
      date_return_four: "",
      date_send_dep: "28/05/2023",
      date_return_dep: "",
      state: "Encours",
      isActive: true,
    },
  ];
  const list_date_attachment2 = [
    {
      id: 54575,
      date_arrival: "20/05/2023",
      date_return_four: "",
      date_send_dep: "28/05/2023",
      date_return_dep: "",
      state: "Encours",
      observation: "",
      isActive: true,
    },
    {
      id: 545,
      date_arrival: "20/05/2023",
      date_return_four: "14/08/2024",
      date_send_dep: "28/05/2023",
      date_return_dep: "01/05/2024",
      state: "Annulé",
      observation:
        "Tables display information in a way that's easy to scan, so that users can look for patterns and insights. They can be embedded in primary content, such as cards ",
      isActive: false,
    },
  ];
  const marcheTemp = {
    id: 98,
    nbr: "AO 37/23",
    label: "renforcement des équipements",
    amount: "120000",
    dateNotification: "01/01/2023",
  };
  const fournisseur = {
    id: 6989,
    ice: "5415030062006634503",
    name: "creatoore mediaa",
  };
  const department = {
    id: 7,
    name: "DSI",
  };
  const marche = createMarcheData(
    ...Object.values(marcheTemp),
    createFournisseurData(...Object.values(fournisseur))
  );
  const data = [
    createAttachmentData(
      1,
      "0251657177",
      "15/02/2023",
      "01/04/2023",
      createDateAttachmentData(list_date_attachment),
      createMarcheData(...Object.values(marche)),
      createDepartmentData(...Object.values(department))
    ),
    createAttachmentData(
      2,
      "9849810800",
      "16/02/2023",
      "01/04/2023",
      createDateAttachmentData(list_date_attachment2),
      createMarcheData(...Object.values(marche)),
      createDepartmentData(...Object.values(department))
    ),
  ];
  //  console.log(data)
  return data;
}
/****************** ****************/

const getUsers = async (setInitUserData, setCurrentUserData) => {
  // const url = "/users";
  // const { data } = await axios.get(url);
  // const users = data.map((e) =>
  //   createData(e.id, e.fullName, e.userNumber, e.role)
  // );
  // setInitUserData(users);
  // setCurrentUserData(users);
};

function useAttachmentData() {
  const [initAttachmentData, setInitAttachmentData] = useState(null);
  const [currentAttachmentData, setCurrentAttachmentData] = useState(null);

  useEffect(() => {
    // getUsers(setInitUserData, setCurrentUserData);
    const temp = getAttachmentData();
    setInitAttachmentData(temp);
    setCurrentAttachmentData(temp);
  }, []);

  return {
    initAttachmentData,
    setInitAttachmentData,
    currentAttachmentData,
    setCurrentAttachmentData,
  };
}

/************** **************/

function useModalState() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return { modalState: open, handleOpen, handleClose };
}

function useModalType() {
  const [modalType, setModalType] = useState("");
  return { modalType, handleSetModalType: setModalType };
}

/************** **************/

function searchAttachmentHandler(search, initUserData, setCurrentUserData) {

  const searchFilter = initUserData.filter((elem) => {
    const temp = (Object.values(elem).join(" ").toLowerCase()) ; 
    return temp.includes(
      search.toString().toLowerCase()
    );
  });
  if (search.length > 2) setCurrentUserData(searchFilter);
  else setCurrentUserData(initUserData);
}



// async function deleteUserHandler(userId, setInitUserData, setCurrentUserData) {
//   const url = `/users/${userId}`;
//   await axios.delete(url);
//   setInitUserData((prev) => prev.filter((e) => e.id !== userId));
//   setCurrentUserData((prev) => prev.filter((e) => e.id !== userId));
// }
// async function createUserHandler(
//   userData,
//   setInitUserData,
//   setCurrentUserData
// ) {
//   const userTemp = createData(null, userData.name, userData.nbr, userData.role);
//   setInitUserData((prev) => [...prev, userTemp]);
//   setCurrentUserData((prev) => [...prev, userTemp]);

//   const createUserAPI = async () => {
//     const url = "/users";
//     const user = {
//       fullName: userData.name,
//       userNumber: userData.nbr,
//       role: userData.role,
//       password: userData.password,
//     };
//     const data = await axios.post(url, user);
//     console.log(data);
//   };

//   await createUserAPI();
//   await getUsers(setInitUserData, setCurrentUserData);
// }
// function updateUserHandler(
//   userData,
//   activeUserId,
//   setInitUserData,
//   setCurrentUserData
// ) {
//   const userTemp = createData(
//     activeUserId,
//     userData.name,
//     userData.nbr,
//     userData.role
//   );

//   setInitUserData((prev) =>
//     prev?.map((e) => (e.id === activeUserId ? userTemp : e))
//   );
//   setCurrentUserData((prev) =>
//     prev?.map((e) => (e.id === activeUserId ? userTemp : e))
//   );
// }