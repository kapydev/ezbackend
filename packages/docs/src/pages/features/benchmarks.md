## EzBackend Performance

EzBackend utilises fastify, instead of express.js, under the hood to reduce request latency. Furthermore, for the most common CRUD operations EzBackend is designed to minimise the latency of these operations.

<!-- EzBackend is also designed to [scale horizontally with minimal configuration changes](built-to-scale) -->

## Benchmarks: Express/Postgres vs EzBackend

:::caution
These benchmarks are not an apples-to-apples comparison. There may be minor functionality differences.

When performance is a concern, make sure that benchmarks are performed on the relevant 'expensive' operation, and that benchmarks are conducted on the machine that will be used in production for accurate results

Take note that benchmarks performed are for the most basic reads and writes. Performance will vary depending on the complexity of the actual operation
:::

To compare performance, we developed two backends

1. Express + Postgres
2. EzBackend

With the following criteria:

1. Postgres Database
2. Two DB Tables
   1. Users Table
   2. Posts Table
3. Google Auth
4. CRUD Endpoints

You can view the sample apps [here](https://github.com/kapydev/ezbackend-comparisons)

### Write Operations

|Framework| writes/s | Times Faster
|-|-|-|
|EzBackend| 1960 |14.2x|
|express + node-postgres (Benchmark) | 138 | 1x (Baseline)|

### Read Operations

|Framework| reads/s | Times Faster
|-|-|-|
|EzBackend| 1960 |14.2x|
|express + node-postgres (Benchmark) | 138 | 1x (Baseline)|

:::info
Benchmark Machine:

Processor	Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz   2.59 GHz

Installed RAM	24.0 GB (23.8 GB usable)

:::