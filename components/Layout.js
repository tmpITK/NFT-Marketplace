import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";
import 'semantic-ui-css/semantic.min.css'

const Layout = (props) => {
  return (
    <div style={{height: '100%'}}>
      <Container>
        <Head>
        </Head>
        <Header />
        {props.children}
      </Container>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        body {
          background-image: url("/img/background.png");
        }
      `}</style>
    </div>
  );
};
export default Layout;
