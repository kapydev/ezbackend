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
                <div className='bg-dracula rounded-lg' style={{ maxWidth: '500px' }}>
                    <div className='rounded-lg text-xs md:text-sm pointer-events-none font-mono' style={{ padding: 32 }}>
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
                <div className='grid place-items-center w-full self-start'>
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

            <div className='grid place-items-start gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
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

            <div className='col-span-full flex justify-center mt-12'>
                <ReactCompareImage leftImage={DiagramScale} rightImage={DiagramBuild} sliderPositionPercentage={0.03} sliderLineWidth={4} />
            </div>

            <div className='col-span-full py-12 flex justify-center'>
                <div className='text-2xl font-mono font-bold'>
                    Framework Comparison
                </div>
            </div>

            <div className='col-span-full flex justify-center'>
                <table>
                    <tr>
                        <th>Framework</th>
                        <th>Lines of Code</th>
                        <th>Difference (%)</th>
                    </tr>
                    <tr>
                        <td>EzBackend</td>
                        <td>32</td>
                        <td>-97 %</td>
                    </tr>
                    <tr>
                        <td>express + node-postgres (Benchmark)</td>
                        <td>1257</td>
                        <td>0 % (Baseline)</td>
                    </tr>
                </table>
            </div>

            <div className='col-span-full py-12 flex justify-center'>
                <div className='text-lg font-mono font-bold'>
                    Read Operations
                </div>
            </div>

            <div className='col-span-full flex justify-center'>
                <table>
                    <tr>
                        <th>Framework</th>
                        <th>reads/s</th>
                        <th>Times Faster</th>
                    </tr>
                    <tr>
                        <td>EzBackend</td>
                        <td>1960</td>
                        <td>14.2×</td>
                    </tr>
                    <tr>
                        <td>express + node-postgres (Benchmark)</td>
                        <td>138</td>
                        <td>1× (Baseline)</td>
                    </tr>
                </table>
            </div>

            <div className='col-span-full py-12 flex justify-center'>
                <div className='text-lg font-mono font-bold'>
                    Write Operations
                </div>
            </div>

            <div className='col-span-full flex justify-center'>
                <table>
                    <tr>
                        <th>Framework</th>
                        <th>writes/s</th>
                        <th>Times Faster</th>
                    </tr>
                    <tr>
                        <td>EzBackend</td>
                        <td>1960</td>
                        <td>14.2×</td>
                    </tr>
                    <tr>
                        <td>express + node-postgres (Benchmark)</td>
                        <td>138</td>
                        <td>1× (Baseline)</td>
                    </tr>
                </table>
            </div>

        </>

    );
}

export default LandingHelper;