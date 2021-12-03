import React from 'react';
import { useState } from 'react';
import { features_content } from '../content/features-content';
import { Feature } from '../helper-components/feature'
import { CtaButton } from '../helper-components/cta-button';
import { Delayed } from '../helper-components/delayed';
import { MovingCode } from '../helper-components/moving-code';
import StepFeature from '../helper-components/step-feature';
import toast, { Toaster } from 'react-hot-toast';
import DiagramBuild from '../assets/diagram-scaling-build.png';
import DiagramScale from '../assets/diagram-scaling-scale.png';
import ReactCompareImage from 'react-compare-image';
import '../css/landing.css'
import { Accordion, AccordionItem, AccordionPanel } from './accordion';

const codeText1 = "const app = new EzBackend()"
const codeText2 = `const users = new EzModel('Users', {
  name: Type.VARCHAR,
  gender: Type.VARCHAR,
  age: Type.INT
})`
const codeText3 = `app.addApp("users", users, { prefix: "users" })`
const codeText4 = `app.start()`

function LandingHelper() {

    return (

        <>

            <div className='col-span-full py-8 flex justify-center'>
                <div className='text-2xl font-mono font-bold'>
                    Low Code Backend
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center self-center col-span-full transform md:scale-90'>
                <div className='bg-dracula rounded-lg' style={{ width: '100%' }}>
                    <div className='rounded-lg text-xs md:text-sm pointer-events-none font-mono' style={{ padding: 32, minHeight: 300 }}>
                        <Delayed waitBeforeShow={0}>
                            <MovingCode text={codeText1} />
                        </Delayed>
                        <Delayed waitBeforeShow={3000}>
                            <MovingCode text={codeText2} />
                        </Delayed>
                        <Delayed waitBeforeShow={10000}>
                            <MovingCode text={codeText3} />
                        </Delayed>
                        <Delayed waitBeforeShow={14000}>
                            <MovingCode text={codeText4} />
                        </Delayed>
                    </div>
                </div>
                <div className='sm:grid col-span-full sm:col-span-1 place-items-center w-full self-start hidden '>
                    <div className='w-full'>
                        <StepFeature delay={1700}>
                            Backend Created
                        </StepFeature>
                        <StepFeature delay={4000}>
                            Database Connection Made
                        </StepFeature>
                        <StepFeature delay={4500}>
                            <span className='text-purple'>Pets</span> Table Created in Database
                        </StepFeature>
                        <StepFeature delay={9000}>
                            Table Columns Added
                        </StepFeature>
                        <StepFeature delay={12900}>
                            CRUD Endpoints Generated
                        </StepFeature>
                        <StepFeature delay={15000}>
                            API Documentation Generated
                        </StepFeature>
                        <StepFeature delay={15300}>
                            Running on PORT 8000
                        </StepFeature>
                    </div>
                </div>
            </div>

            <div className='col-span-full py-12 flex justify-center'>
                <div className='text-2xl font-mono font-bold'>
                    Everything You Need
                </div>
            </div>

            <div className='grid place-items-start gap-0 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {features_content.map((feature) => {
                    return (
                        <div className="flip">
                            <div className="flip-content">
                                <div className="flip-front">
                                    <div className='transform scale-95'>
                                        <Feature
                                            icon={feature.icon}
                                            title={feature.title}
                                            info={feature.info}
                                            route={feature.route}
                                            released={feature.released}
                                            hide_cta={true}
                                            landing={true}
                                            noClick={true}
                                        />
                                    </div>
                                </div>
                                <div className="flip-back">
                                    <div className='flex h-full flex-col justify-center text-sm font-monts'>
                                        {feature.flip_card}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <br />

            <div className='col-span-full mt-12 flex justify-center'>
                <div className='max-w-3xl w-full'>
                    <ReactCompareImage leftImage={DiagramScale} rightImage={DiagramBuild} sliderPositionPercentage={0.03} sliderLineWidth={4} />
                </div>
            </div>

            <div className='col-span-full text-left mt-6 font-monts leading-8'>
                <Accordion>
                    <AccordionItem toggle="scale" before_text='One-Click-Deploy' after_text='One-Click-Deploy' />
                    <AccordionPanel id="scale">
                        <p >EzBackend allows you to 'build once, scale indefintely' with EzDeploy. EzDeploys scales using:</p>
                        <ol type="1">
                            <li className='mb-2'>[COMING SOON] Reverse Proxy. All traffic is routed through EzDeploy's reverse proxy for load balancing. The reverse proxy also serves as an additional layer of security by providing SSL encryption and hiding actual servers from the internet</li>
                            <li className='mb-2'>Stateless Servers - EzBackend is designed in principle to be completely stateless, allowing you to scale across regions by creating new EzBackend instances</li>
                            <li className='mb-2'>[COMING SOON] Read Replicas. By creating read-replicas in the same Virtual Private Cloud as your EzBackend instances, the end-user can receive low-latency regardless of region.</li>
                            <li className='mb-2'>[COMING SOON] Adapters. EzBackend comes "batteries included" with adapters to manage realtime updates with socket.io and other operations that require action on all EzBackend instances</li>
                        </ol>
                        <p className='text-xl'>Caveats:</p>
                        <ol type='1'>
                            <li className='mb-2'>Write operations. There are currently no plans for EzBackend to scale for write operations, but research is being done to scale postgres writes with cross-region database sharding and writeback caching wrappers</li>
                            <li className='mb-2'>Replication lag. When reads are performed to a replica at the same time a write to the main postgres instance occurs, the information read out may not be fully accurate. In scenarios where data accuracy is paramount, EzBackend reads can be configured to read from the main postgres instance instead.</li>
                        </ol>
                    </AccordionPanel>
                </Accordion>
            </div>

            <div className='col-span-full py-12 flex justify-center'>
                <div className='text-2xl font-mono font-bold'>
                    <span className='text-purple'>82%</span> Less Code*
                </div>

            </div>
            <div className="text-center">
                <p >Code comparisons done between apps with these features</p>

                <li className='mb-2'>A user model with CRUD routes</li>
                <li className='mb-2'>A post model with CRUD routes</li>
                <li className='mb-2'>User authentication with Google OAuth2</li>
            </div>
            <br />

            <div className='col-span-full flex justify-center'>
                <table>
                    <tr>
                        <th>Framework</th>
                        <th>Number of Files</th>
                        <th>blankLines</th>
                        <th>Comments</th>
                        <th>Code</th>
                    </tr>
                    <tr>
                        <td>lineCount-ezbackend-postgres-sample	</td>
                        <td>1</td>
                        <td>6</td>
                        <td>3</td>
                        <td>31</td>
                    </tr>
                    <tr>
                        <td>lineCount-express-mongo-sample	</td>
                        <td>9</td>
                        <td>46</td>
                        <td>12</td>
                        <td>147</td>
                    </tr>
                    <tr>
                        <td>lineCount-express-postgres-sample	</td>
                        <td>11</td>
                        <td>43</td>
                        <td>13</td>
                        <td>179</td>
                    </tr>
                </table>
            </div>

            <div className='col-span-full py-12 flex justify-center'>
                <div className='text-2xl font-mono font-bold'>
                    <span className='text-purple'>2x</span> Faster Reads
                </div>
            </div>

            <div className='col-span-full flex justify-center'>
                <table>
                    <tr>
                        <th>Framework</th>
                        <th>Requests/s</th>
                        <th>Latency</th>
                        <th>Throughput/Mb</th>
                    </tr>
                    <tr>
                        <td>read-ezbackend-postgres-sample</td>
                        <td>2500.0</td>
                        <td>2.97</td>
                        <td>0.73</td>
                    </tr>
                    <tr>
                        <td>read-express-postgres-sample</td>
                        <td>1428.6</td>
                        <td>6.26</td>
                        <td>0.54</td>
                    </tr>
                    <tr>
                        <td>read-express-mongo-sample	</td>
                        <td>1250.0</td>
                        <td>7.44</td>
                        <td>0.42</td>
                    </tr>
                </table>
            </div>

            <div className='col-span-full py-12 flex justify-center'>
                <div className='text-2xl font-mono font-bold'>
                    <span className='text-purple'>1.8x</span> Faster Writes
                </div>
            </div>

            <div className='col-span-full flex justify-center'>
                <table>
                    <tr>
                        <th>Framework</th>
                        <th>Requests/s</th>
                        <th>Latency</th>
                        <th>Throughput/Mb</th>
                    </tr>
                    <tr>
                        <td>write-ezbackend-postgres-sample</td>
                        <td>1667.2</td>
                        <td>4.52</td>
                        <td>0.55</td>
                    </tr>
                    <tr>
                        <td>write-express-postgres-sample</td>
                        <td>1111.1</td>
                        <td>7.68</td>
                        <td>0.46</td>
                    </tr>
                    <tr>
                        <td>write-express-mongo-sample	</td>
                        <td>909.1</td>
                        <td>10.08</td>
                        <td>0.33</td>
                    </tr>
                </table>
            </div>

        </>

    );
}

export default LandingHelper;