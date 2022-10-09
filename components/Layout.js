import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";
import 'semantic-ui-css/semantic.min.css'

const Layout = (props) => {
  return (
    <div style={{height: '100%', backgroundImage: "url(/img/background.png)"}}>
      <Container>
        <Head>
        </Head>
        <Header LOCAL_II_CANISTER_ID={props.LOCAL_II_CANISTER_ID} />
        {props.children}
      </Container>
      <style jsx="true">{`
        #__next {
          height: 100%;
        }
      `}</style>
    </div>
  );
};
export default Layout;
