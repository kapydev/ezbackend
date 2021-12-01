import React from 'react';
import { useState } from 'react';
import { CtaButton } from '../helper-components/cta-button';
import toast, { Toaster } from 'react-hot-toast';
import LandingHelper from '../helper-components/landing-helper';
import '../css/landing.css'
import { Scrollbars } from 'react-custom-scrollbars';
import validator from 'validator'


const axios = require('axios').default;

const LPBKND_BASEURL = 'https://ez-landing-page-backend.herokuapp.com'

function Landing() {

    function SignUpper() {
        return (
            <>
                <div className='font-monts text-lg font-semibold'>
                    Claim <span className='font-bold'>100USD</span> Hosting Credits when you sign up for our <span className='text-purple'>Alpha</span> programme today!
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
                <CtaButton className='w-full' islink={false} onClick={(e) => {
                    if (!validator.isEmail(signUpEmail)) {
                        toast.error("Please fill in your email")
                    } else {
                        toast.promise(
                            handleSubmit(e),
                            {
                                loading: 'Waiting for Heroku...',
                                success: <b>Submitted</b>,
                                error: <b>Server Error! We are working on it!</b>,
                            }
                        )
                            .then(() => { window.open("/") })
                    }
                }}>
                    Sign Up
                </CtaButton>
            </>
        )
    }

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
                    <div className='grid my-6 p-12 grid-cols-3 xl:grid-cols-5 h-full'>

                        <div className='col-span-full xl:col-span-2'>
                            <div className='h-full flex text-center xl:text-left justify-center xl:items-center'>
                                <div className='col-span-full'>
                                    <div className='p-10 grid gap-6 max-w-lg'>
                                        <div className='font-mono text-4xl font-semibold leading-snug'>
                                            Simple to Setup <br /> Ready to Scale
                                        </div>
                                        <div className='font-monts text-md'>
                                            EzBackend - The Low-Code Backend Framework for Technical Founders
                                        </div>
                                        <SignUpper />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-3 p-16 hidden xl:block'>

                            <Scrollbars>

                                <LandingHelper />

                            </Scrollbars>


                        </div>

                        <div className='col-span-full block xl:hidden'>
                            <LandingHelper />
                        </div>

                        <div className='col-span-full flex justify-center p-12 xl:hidden'>
                            <div className='p-10 grid gap-6 max-w-lg'>
                                <SignUpper />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Landing;