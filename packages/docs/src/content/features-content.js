import React from 'react';
import IconApiDocs from '../assets/icon-api-docs.svg';
import IconDatabase from '../assets/icon-database.svg';
import IconSecurity from '../assets/icon-security.svg';
import IconWorld from '../assets/icon-world.svg';
import IconFileStorage from '../assets/icon-download-file.svg';
import IconScaling from '../assets/icon-increase.svg';
import IconCode from '../assets/icon-code.svg';
import IconTypeScript from '../assets/icon-typescript.svg';
import IconRefresh from '../assets/icon-refresh.svg';
import IconEnv from '../assets/icon-env.svg';
import IconClock from '../assets/icon-clock.svg';

const ICONCLASSNAME = 'w-12 h-12';

export const featuresContent = [
  {
    title: (
      <span>
        <span className="text-purple">82%</span> Less Code
      </span>
    ),
    route: '/features/less-code',
    icon: <IconCode className={ICONCLASSNAME} />,
    info: 'Stop writing repeated boilerplate code. Focus on your business logic',
    description:
      'EzBackend is designed to reduce the amount of boilerplate you have to write',
    media: null,
    released: true,
    flip_card: (
      <div>
        Common functionality is replaced with minimal code in EzBackend. In{' '}
        <span className="text-purple">5 lines of code</span> you can add a DB
        table with CRUD Endpoints
      </div>
    ),
  },
  {
    title: (
      <span>
        <span className="text-purple">2x</span> Faster
      </span>
    ),
    route: '/features/benchmarks',
    icon: <IconScaling className={ICONCLASSNAME} />,
    info: 'Learn how EzBackend is designed for speed',
    description:
      'EzBackend uses Fastify under the hood, a NodeJS framework with 5 times the benchmark performance as Express (At the time of writing) (Support with our own benchmarks)',
    media: null,
    released: true,
    flip_card: (
      <div>
        Ezbackend un-apologetically{' '}
        <span className="text-purple">uses fastify</span> under the hood, to
        ensure your users experience minimal latency
      </div>
    ),
  },
  {
    title: 'Authentication',
    route: '/docs/auth/user-auth',
    icon: <IconSecurity className={ICONCLASSNAME} />,
    info: 'Add authentication to your backend in one line of code.',
    description: '',
    media: null,
    released: true,
    flip_card: (
      <div>
        Authentication comes in a plug and play modular provider, allowing you
        to add{' '}
        <span className="text-purple">any passport.js supported strategy</span>
      </div>
    ),
  },
  {
    title: 'Instant API Generation',
    route: '/docs/basics/auto-generated-routes',
    icon: <IconWorld className={ICONCLASSNAME} />,
    info: 'Instant API endpoints generation with customization capabilities',
    description: '',
    media: null,
    released: true,
    flip_card: (
      <div>
        Stop reinventing the wheel with CRUD boilerplates. EzBackend{' '}
        <span className="text-purple">
          generates the read/write functionality
        </span>{' '}
        you need, while remaining secure with security rules
      </div>
    ),
  },
  {
    title: 'Database Agnostic',
    route: '/docs/configuration',
    icon: <IconDatabase className={ICONCLASSNAME} />,
    info: 'Supports enterprise Databases: Postgres, MySQL, MongoDB, & more',
    description:
      'EzBackend uses typeorm under the hood, which supports XXX DBs. It also utilise database hooks to provide row level security',
    media: null,
    released: true,
    flip_card: (
      <div>
        EzBackend wraps typeorm with{' '}
        <span className="text-purple">scaling functionality</span> in order to
        manage large workloads
      </div>
    ),
  },
  {
    title: 'Automated Documentation',
    route: '/docs/basics/basic-routing#viewing-available-routes',
    icon: <IconApiDocs className={ICONCLASSNAME} />,
    info: 'API Documentation automatically generated to OpenAPI Specification',
    description: '',
    media: null,
    released: true,
    flip_card: (
      <div>
        Use EzBackend as a{' '}
        <span className="text-purple">single source of truth</span>. Goodbye to
        updating your swagger documentation and backend seperately{' '}
      </div>
    ),
  },

  {
    title: 'TypeScript Support',
    // route: "/",
    icon: <IconTypeScript className={ICONCLASSNAME} />,
    info: 'Typescript reflection system with typescript types despite writing plain javascript',
    description: (
      <div>
        EzBackend supports typescript out of the box. However, the file looks
        like it is written in plain javascript.
        <br />
        <br /> Because EzBackend uses a strong type inference system under the
        hood, most functions within the framework automatically have rich IDE
        support out of the box
      </div>
    ),
    media: null,
    released: true,
    flip_card: (
      <div>
        EzBackend automatically{' '}
        <span className="text-purple">infers types</span> as much as possible,
        meaning{' '}
        <span className="text-purple">
          less time spent defining typescript types
        </span>{' '}
        and more time writing business logic
      </div>
    ),
  },

  {
    title: 'Fast Refresh',
    // route: "/",
    icon: <IconRefresh className={ICONCLASSNAME} />,
    info: 'Fast, reliable editing experience, with changes being reflected immediately with ctrl-s',
    description: '',
    media: null,
    released: true,
    flip_card: (
      <div>
        Uses ts-node-dev to restart the dev env on file changes{' '}
        <span className="text-purple">increasing refresh speed</span> as
        compared to node-dev because ts-node is not instantiated multiple times
      </div>
    ),
  },

  {
    title: 'Automated Database Interface',
    route: "/docs/db-ui/testing-endpoints",
    icon: <IconDatabase className={ICONCLASSNAME} />,
    info: 'View, edit and update database entries with an excel-like interface',
    description: '',
    media: null,
    released: true,
    flip_card: (
      <div>
        The in-built database-agnoistic DB editor allows you to{' '}
        <span className="text-purple">quickly populate and edit</span> test
        data. No need for external tools such DBeaver to insert test data.
      </div>
    ),
  },
  {
    title: 'One-Line Realtime Functionality',
    route: "/docs/realtime/socket-io",
    icon: <IconClock className={ICONCLASSNAME} />,
    info: 'Subscribe to database updates with socket.io',
    description: '',
    media: null,
    released: true,
    flip_card: (
      <div>
        {' '}
        Listen to database updates in realtime. Comes with{' '}
        <span className="text-purple">packet level security</span> where
        read/write permissions for each recepient is verified before socket.io
        packets are sent.
      </div>
    ),
  },

  {
    title: 'One-Line Storage Functionality',
    route: "/docs/file-storage/file-storage",
    icon: <IconFileStorage className={ICONCLASSNAME} />,
    info: 'Transition seamlessly between local storage and cloud providers',
    description: '',
    media: null,
    released: true,
    flip_card: (
      <div>
        Store files in blob-storage
      </div>
    ),
  },

  {
    title: (
      <div>
        Consistent <br /> Dev & Prod Env
      </div>
    ),
    // route: "/",
    icon: <IconEnv className={ICONCLASSNAME} />,
    info: 'Minimal additional configuration for deployment',
    description: (
      <div>
        EzBackend automatically detects if it is running in a development
        environment or production environment, and automatically configures
        itself to run securely and safely in either one
        <br />
        <br />
        While EzBackend runs with strong defaults, these defaults are still
        entirely configurable to your custom needs
      </div>
    ),
    media: null,
    released: false,
    flip_card: (
      <div>
        EzBackend requires{' '}
        <span className="text-purple">minimal configuration changes</span>{' '}
        between a simple app for casual use and a{' '}
        <span className="text-purple">Leviathan-scale</span> app that scales
        horizontally to serve millions
      </div>
    ),
  },
];
