import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext("");

export function UserContextData() {
  const [activeUser, setActiveUser] = useState(null);
  const modalStateData = useModalState();
  const modalTypeData = useModalType();
  const { initUserData, setInitUserData, currentUserData, setCurrentUserData } =
    useUserData();

  const searchUser = (searchData) =>
    searchUserHandler(searchData, initUserData, setCurrentUserData);
  const deleteUser = (userId) =>
    deleteUserHandler(userId, setInitUserData, setCurrentUserData);
  const createUser = (userData) =>
    createUserHandler(userData, setInitUserData, setCurrentUserData);
  const updateUser = (userData) =>
    updateUserHandler(
      userData,
      activeUser.id,
      setInitUserData,
      setCurrentUserData
    );

  return {
    userRoles,
    activeUser,
    setActiveUser,
    modalStateData,
    modalTypeData,
    userData: currentUserData,
    searchUser,
    deleteUser,
    createUser,
    updateUser,
  };
}

/***********************  *************************** */
const userRoles = [
  { name: "Administrateur", value: "ADMIN" },
  { name: "Utilisateur", value: "USER" },
];

const createData = (id, user_name, user_nbr, user_role) => {
  return { id, user_name, user_nbr, user_role };
};
// function getUserData() {
//   const data = [
//     createData(1, "iliass el aoufi", "02236", ["admin", "cpt"]),
//     createData(2, "ghita mohim", "02237", ["bo"]),
//     createData(3, "ayoub taki", "02260", ["cpt"]),
//   ];
//   // console.log(data)
//   return data;
// }
const getUsers = async (setInitUserData, setCurrentUserData) => {
  const url = "/users";
  const { data } = await axios.get(url);
  const users = data.map((e) =>
    createData(e.id, e.fullName, e.userNumber, e.role)
  );
  setInitUserData(users);
  setCurrentUserData(users);
};

function useUserData() {
  const [initUserData, setInitUserData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    getUsers(setInitUserData, setCurrentUserData);
  }, []);

  return { initUserData, setInitUserData, currentUserData, setCurrentUserData };
}

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

function searchUserHandler(search, initUserData, setCurrentUserData) {
  const searchFilter = initUserData.filter((elem) => {
    return ("id:" + Object.values(elem).join(" ").toLowerCase()).includes(
      search.toString().toLowerCase()
    );
  });
  if (search.length > 2) setCurrentUserData(searchFilter);
  else setCurrentUserData(initUserData);
}

async function deleteUserHandler(userId, setInitUserData, setCurrentUserData) {
  const url = `/users/${userId}`;
  await axios.delete(url);
  setInitUserData((prev) => prev.filter((e) => e.id !== userId));
  setCurrentUserData((prev) => prev.filter((e) => e.id !== userId));
}
async function createUserHandler(
  userData,
  setInitUserData,
  setCurrentUserData
) {
  const userTemp = createData(null, userData.name, userData.nbr, userData.role);
  setInitUserData((prev) => [...prev, userTemp]);
  setCurrentUserData((prev) => [...prev, userTemp]);

  const createUserAPI = async () => {
    const url = "/users";
    const user = {
      fullName: userData.name,
      userNumber: userData.nbr,
      role: userData.role,
      password: userData.password,
    };
    const data = await axios.post(url, user);
    console.log(data);
  };

  await createUserAPI();
  await getUsers(setInitUserData, setCurrentUserData);
}
function updateUserHandler(
  userData,
  activeUserId,
  setInitUserData,
  setCurrentUserData
) {
  const userTemp = createData(
    activeUserId,
    userData.name,
    userData.nbr,
    userData.role
  );

  setInitUserData((prev) =>
    prev?.map((e) => (e.id === activeUserId ? userTemp : e))
  );
  setCurrentUserData((prev) =>
    prev?.map((e) => (e.id === activeUserId ? userTemp : e))
  );
}
