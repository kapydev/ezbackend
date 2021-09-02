import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'CRUD REST Endpoints and Documentation',
    Svg: require('../../static/img/docs.svg').default,
    description: (
      <>
        Fastify to create the endpoints and <b>Fastify Swagger</b> to generate the documentation
      </>
    ),
  },
  {
    title: 'Database with Nested Functionality',
    Svg: require('../../static/img/db.svg').default,
    description: (
      <>
        Typeorm to connect to <b>Postgres</b>, <b>MySQL</b>, or <b>SQLite</b>, and Material UI Datagrid to view the DB
      </>
    ),
  },
  {
    title: `Secure Authentication (Coming Soon)`,
    Svg: require('../../static/img/security.svg').default,
    description: (
      <>
        Select from several federated authentication providers: <b>Google</b>, <b>Facebook</b>, or <b>Github</b>
      </>
    ),
  }
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h2 style={{ fontFamily: "monospace" }}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
