import React from 'react';
import { useState } from 'react';
import { features_content } from '../content/features-content';
import { Feature } from '../helper-components/feature'
import { CtaButton } from '../helper-components/cta-button';
import { Scrollbars } from 'react-custom-scrollbars';
import { Delayed } from '../helper-components/delayed';
import { MovingCode } from '../helper-components/moving-code';
import StepFeature from '../helper-components/step-feature';
import toast, { Toaster } from 'react-hot-toast';
import DiagramBuild from '../assets/diagram-scaling-build.png';
import DiagramScale from '../assets/diagram-scaling-scale.png';
import ReactCompareImage from 'react-compare-image';
import '../css/landing.css'

const axios = require('axios').default;

const LPBKND_BASEURL = 'https://ez-landing-page-backend.herokuapp.com'

const codeText1 = "const app = new EzBackend()"
const codeText2 = `const users = new EzModel('Users', {
  name: Type.VARCHAR,
  gender: Type.VARCHAR,
  age: Type.INT
})`
const codeText3 = `app.addApp("users", users, { prefix: "users" })`
const codeText4 = `app.start()`

function Landing() {

    const [signUpEmail, setSignUpEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signUpEmail) {
            return axios.post(LPBKND_BASEURL + '/signUps/', {
                email: signUpEmail,
            })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function (response) {
                    setSignUpEmail('')
                })
        }
    }
    return (
        <div id='tailwind'>
            <Toaster
                toastOptions={{
                    style: {
                        padding: '16px',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#282A36',
                        fontSize: 16
                    },
                }}
            />
            <div className='h-screen'>
                <div className='h-full flex flex-col justify-center'>
                    <div className='grid my-6 p-12 grid-cols-5 h-full overflow-hidden'>


                        <div className='col-span-2'>
                            <div className='h-full flex justify-center items-center'>
                                <div className='col-span-full'>
                                    <div className='p-10 rounded-lg grid gap-6 max-w-md'>
                                        <div className='font-monts text-3xl font-semibold '>
                                            EzBackend
                                        </div>
                                        <div className='font-monts text-md'>
                                            A Node framework focused on speed and ease of use, while keeping the ability to extend and customize
                                        </div>
                                        <div className='font-monts text-lg font-semibold'>
                                            Get 100USD of Hosting Credits when you sign up as an Early Adopter today
                                        </div>
                                        <form>
                                            <input
                                                onChange={e => setSignUpEmail(e.target.value)}
                                                className='border-0 font-monts rounded-lg text-lg p-2 font-semibold w-full'
                                                type="text"
                                                id="submitSignUps"
                                                value={signUpEmail}
                                                placeholder='Email'
                                                name="email" />
                                        </form>
                                        <CtaButton islink={false} onClick={(e) => {
                                            toast.promise(
                                                handleSubmit(e),
                                                {
                                                    loading: 'Submitting...',
                                                    success: <b>Submitted</b>,
                                                    error: <b>Server Error! We are working on it!</b>,
                                                }
                                            );
                                        }}>
                                            Sign Up
                                        </CtaButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-3 w-full p-16'>

                            <Scrollbars autoHide autoHideTimeout={300}>

                                <div className='col-span-full fixed h-24 w-full bg-gradient-to-t from-transparent to-darkness' />

                                <div className='col-span-full h-12 w-full' />

                                <div className='col-span-full py-8 flex justify-center'>
                                    <div className='text-2xl font-mono font-bold'>
                                        Low Code Backend
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 place-items-center self-center col-span-full'>
                                    <div className='bg-dracula rounded-lg w-full lg:h-320px' style={{ maxWidth: '500px' }}>
                                        <div className='rounded-lg text-sm pointer-events-none font-mono' style={{ padding: 32 }}>
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
                                    <div className='grid place-items-start self-start'>
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
                                            <span className='text-purple'>Name</span>, <span className='text-purple'>Species</span>, <span className='text-purple'>Age</span>, Columns Added in Table
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

                                <div className='col-span-full py-12 flex justify-center'>
                                    <div className='text-2xl font-mono font-bold'>
                                        Everything You Need
                                    </div>
                                </div>

                                <div className='grid place-items-start gap-6 grid-cols-4'>
                                    {features_content.map((feature) => {
                                        return (
                                            <div class="flip">
                                                <div class="flip-content">
                                                    <div class="flip-front">
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
                                                    <div class="flip-back">
                                                        <div className='flex h-full pt-4'>
                                                            {feature.flip_card}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

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

                                <div className='col-span-full h-12 w-full' />

                                <div className='col-span-full fixed bottom-32 h-24 w-full bg-gradient-to-b from-transparent to-darkness' />

                            </Scrollbars>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Landing;