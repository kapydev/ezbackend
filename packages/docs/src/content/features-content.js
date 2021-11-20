import React from 'react';
import IconApiDocs from '../assets/icon-api-docs.svg'
import IconDatabase from '../assets/icon-database.svg'
import IconSecurity from '../assets/icon-security.svg'
import IconWorld from '../assets/icon-world.svg'
import IconFileStorage from '../assets/icon-download-file.svg'
import IconScaling from '../assets/icon-increase.svg'
import IconCode from '../assets/icon-code.svg'
import IconTypeScript from '../assets/icon-typescript.svg'
import IconRefresh from '../assets/icon-refresh.svg'
import IconEnv from '../assets/icon-env.svg'
import IconClock from '../assets/icon-clock.svg'

const ICONCLASSNAME = 'w-12 h-12'

export const features_content = [

    {
        title: "Instant API Generation",
        icon: <IconWorld className={ICONCLASSNAME} />,
        info: "Instant API endpoints generation with customization capabilities",
        description: "",
        media: null,
        released: true
    },

    {
        title: "Automated Documentation",
        icon: <IconApiDocs className={ICONCLASSNAME} />,
        info: "EzBackend automatically generates documentation according to the OpenAPI specification.",
        description: "",
        media: null,
        released: true
    },

    {
        title: "Authentication",
        icon: <IconSecurity className={ICONCLASSNAME} />,
        info: "Add authentication to your backend in one line of code. User sign ups and logins and permission layering with Google.",
        description: "",
        media: null,
        released: true
    },

    {
        title: "Supports >10 Databases",
        icon: <IconDatabase className={ICONCLASSNAME} />,
        info: "EzBackend remains database agnostic with industry standard databases: Postgres, MySQL, MongoDB, & more",
        description: "EzBackend uses typeorm under the hood, which supports XXX DBs. It also utilise database hooks to provide row level security",
        media: null,
        released: false
    },

    {
        title: "XX% Less Code",
        icon: <IconCode className={ICONCLASSNAME} />,
        info: "Do more with less. See comparisons to other popular frameworks.",
        description: "EzBackend automatically generates API documentation, a REST API and connections to your database. All of the generation functionality is fully customisable, so that generated endpoints can be generated according to your company's specification",
        media: null,
        released: true
    },

    {
        title: "XX% Faster",
        icon: <IconScaling className={ICONCLASSNAME} />,
        info: "See how EzBackend implements performance as a first class citizen",
        description: "EzBackend uses Fastify under the hood, a NodeJS framework with 5 times the benchmark performance as Express (At the time of writing) (Support with our own benchmarks)",
        media: null,
        released: true
    },

    {
        title: "TypeScript Support",
        icon: <IconTypeScript className={ICONCLASSNAME} />,
        info: "An amazing typescript reflection system where you can get typescript types despite writing plain javascript",
        description: <div>EzBackend supports typescript out of the box. However, the file looks like it is written in plain javascript.<br /><br /> Because EzBackend uses a strong type inference system under the hood, most functions within the framework automatically have rich IDE support out of the box</div>,
        media: null,
        released: true
    },

    {
        title: "Fast Refresh",
        icon: <IconRefresh className={ICONCLASSNAME} />,
        info: "Fast, reliable editing experience, with changes being reflected immediately with ctrl-s",
        description: <div>EzBackend uses ts-node-dev under the hood, which recompiles only necessary files with every refresh, significantly reducing compile times and updated code with every ctrl-s<br /><br />It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to node-dev -r ts-node/register ..., nodemon -x ts-node ... variations because there is no need to instantiate ts-node compilation each time.</div>,
        media: null,
        released: true
    },

    {
        title: <div>Consistent <br /> Dev & Prod Env</div>,
        icon: <IconEnv className={ICONCLASSNAME} />,
        info: "Stop writing extensive environment specific code. EzBackend requires no additional configuration for deployment",
        description: <div>EzBackend automatically detects if it is running in a development environment or production environment, and automatically configures itself to run securely and safely in either one<br /><br />While EzBackend runs with strong defaults, these defaults are still entirely configurable to your custom needs</div>,
        media: null,
        released: true
    },

    {
        title: "Automated Database Interface",
        icon: <IconDatabase className={ICONCLASSNAME} />,
        info: "",
        description: "",
        media: null,
        released: true
    },

    {
        title: "One-Line Realtime Functionality",
        icon: <IconClock className={ICONCLASSNAME} />,
        info: "",
        description: "",
        media: null,
        released: true
    },

    {
        title: "One-Line Storage Functionality",
        icon: <IconFileStorage className={ICONCLASSNAME} />,
        info: "Store and serve files in any format.",
        description: "",
        media: null,
        released: true
    },

]