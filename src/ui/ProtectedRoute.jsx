import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const naviagte = useNavigate();
  // 1. load authenticated user
  const { user, isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) naviagte("/login");
  }, [isLoading, isAuthenticated, naviagte]);

  //  2. show spinner while loading
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //  3. if no user, redirect to home page

  //  4. load app if theres user
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
