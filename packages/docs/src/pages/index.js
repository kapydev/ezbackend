import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import clickhere from './clickhere.png'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player/youtube'
import Hidden from '@material-ui/core/Hidden'

function HomepageHeader() {

  const [raise, setRaise] = useState(false);

  const { siteConfig } = useDocusaurusContext();
  return (
    <Grid container justifyContent="center" alignItems="flex-start" style={{ padding: 48 }} spacing={8}>
      <Grid item>
        <h1 className="hero__title" style={{ fontSize: '80', fontFamily: "monospace", textAlign: "start", maxWidth: 450 }}>
          Create a <span style={{ color: "#5396CE" }}>fully extensible</span> backend in<span style={{ color: "#5396CE" }}> 2 lines</span> of code
        </h1>
        {/* <p style={{fontSize:23}}>
          Scalable, Safe, and Secure
        </p> */}
        <br/>
        <Link to="/docs/intro">
          <Button
            variant="contained"
            size="large"
            onMouseOver={() => setRaise(true)}
            onMouseOut={() => setRaise(false)}
            style={{
              padding: 10,
              backgroundColor: (!raise) ? "#5396CE" : "#fff",
              color: (!raise) ? "#003A2D" : "#5396CE",
              fontSize: 22,
              fontFamily: "monospace",
              fontWeight: "bold",
              width: 200,
            }}>
            Documentation
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <ReactPlayer url='https://youtu.be/rA8_m0UQ-O0' maxWidth="600px" />
      </Grid>
    </Grid>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Backend made easy">
      <br />
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <br />
        <br />
        <br />
        <br />
      </main>
    </Layout >
  );
}
