import React from 'react';
import { useState, useEffect } from 'react';
import { CtaButton } from '../helper-components/cta-button';
import toast, { Toaster } from 'react-hot-toast';
import LandingHelper from '../helper-components/landing-helper';
import '../css/landing.css'
import Scrollbars from '../helper-components/colored-scrollbars';
import validator from 'validator'
import FadeIn from 'react-fade-in';
import { Helmet } from "react-helmet";


const axios = require('axios').default;

const LPBKND_BASEURL = 'https://ez-landing-page-backend.herokuapp.com'

function Landing() {

    const [signUpCount, setSignUpCount] = useState(0);
    const [fomoVisible, setFomoVisible] = useState(false)

    let signUpEmail = ""
    const setSignUpEmail = (newEmail) => {signUpEmail = newEmail}

    useEffect(() => {
        axios.get(LPBKND_BASEURL + '/signUps/count')
            .then(function (response) {
                setFomoVisible(true)
                setSignUpCount(response.data)
            })
            .catch(function (error) {
                setFomoVisible(false)
                console.log(error);
            })
    },[]);

    const sendValidatedEmail = () => {
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

    const validateAndSendEmail = () => {
        if (!validator.isEmail(signUpEmail)) {
            toast.error("Please fill in your email")
        } else {
            toast.promise(
                sendValidatedEmail(),
                {
                    loading: 'Waiting for Heroku...',
                    success: <b>Submitted</b>,
                    error: <b>Server Error! We are working on it!</b>,
                }
            )
                .then(() => { window.open("/") })
        }
    }



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
                        placeholder='Email'
                        name="email" />
                </form>
                <div className='w-full flex justify-between'>
                    <div className='w-max'>
                        <CtaButton islink={false} onClick={validateAndSendEmail}>
                            SIGN UP
                        </CtaButton>
                    </div>
                    {fomoVisible ?
                        <FadeIn>
                            <div className='font-monts pl-4 text-gray-200'>
                                Join <span className='font-semibold text-2xl'>{signUpCount}</span> Users in Alpha
                            </div>
                        </FadeIn>
                        :
                        null
                    }
                </div>
            </>
        )
    }


    
    return (
        <div id='tailwind'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>EzBackend | Low-Code Backend Framework</title>
                <meta name="description" content="Simple to Setup. Ready to Scale." />
            </Helmet>
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
                                    <div className='grid gap-6 max-w-lg'>
                                        <div className='font-mono text-4xl font-semibold leading-snug'>
                                            Simple to Setup <br /> Ready to Scale
                                        </div>
                                        <div className='font-monts text-md'>
                                            The Low-Code Backend Framework for Technical Founders
                                        </div>
                                        <SignUpper />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-3 p-16 hidden xl:block'>

                            <Scrollbars
                                universal
                            >

                                <LandingHelper />

                            </Scrollbars>


                        </div>

                        <div className='col-span-full block xl:hidden'>
                            <LandingHelper />
                        </div>

                        <div className='col-span-full flex py-12 pb-32 justify-center xl:hidden'>
                            <div className='grid gap-6 max-w-lg'>
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