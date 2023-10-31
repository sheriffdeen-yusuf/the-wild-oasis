import React from "react";
import ButtonIcon from "./ButtonIcon";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={logout}>
      {!isLoading ? <HiArrowLeftOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
