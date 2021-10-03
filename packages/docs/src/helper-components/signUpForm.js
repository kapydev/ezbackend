import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const backendURL = "https://kapydev.com"

function SignUpForm() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const history = useHistory()
  const onSubmit = data => {
    toast.promise(
      axios.post(`${backendURL}/AlphaUser`, data),
      {
        loading: "Signing up for alpha",
        success: <b>Alpha Signup Success</b>,
        error: <b>Alpha Signup Failed</b>
      }
    )
    history.push('/')

  };
  return (
    //TODO MAKE THE SUBMIT BUTTON
    //WRAP IN CARD
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input 
          className='border-4 border-gray-400 rounded-xl p-4 text-2xl dark:text font-mono w-auto bg-gray-800' 
          type="text" 
          name="name" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} 
          placeholder='johndoe@gmail.com'
          />
        </label>
      </form>
    </div>
  );
}

export default SignUpForm;