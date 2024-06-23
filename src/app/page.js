// page.js
"use client";
import Login from "../../components/login";
import StarknetBlock from "../../components/StarknetTransaction";
import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Account from "../../components/account";
export default function App() {

  return (
    <Login>
      <Account/>
    </Login>
  );
}
