import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  return (
    <Container>
      <h1>
        Welcome!
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;