import React, { Fragment, useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Editor from 'react-simple-code-editor';
import Highlight, { Prism } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';
import { useWindupString, useIsFinished, WindupChildren } from 'windups';

const delay = 30

const ezbackendCode = `import { EzBackend, EzModel, Type } from '@ezbackend/common'
import { EzOpenAPI } from "@ezbackend/openapi";
import { EzDbUI } from "@ezbackend/db-ui";
import { EzCors } from "@ezbackend/cors";
import { EzAuth, EzUser } from "@ezbackend/auth";

const app = new EzBackend()
app.addApp(new EzOpenAPI())
app.addApp(new EzDbUI())
app.addApp(new EzCors())
app.addApp(new EzAuth())

const posts = new EzModel('Post', {
  summary: Type.VARCHAR,
  description: Type.VARCHAR
})

const user = new EzUser("User", ["google"])

app.addApp(posts, { prefix: 'posts' })
app.addApp(user, { prefix: 'users' })

app.start({
  server: {logger:false},
  orm: {
    type: "postgres",
    host: process.env.POSTGRES_HOST!,
    port: process.env.POSTGRES_PORT!,
    username: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DATABASE!,
    synchronize: true
  }
})`


const expressCode = `// index.ts

import dotenv from 'dotenv'
import path from 'path'

const envFilePath = path.join(__dirname, "../.env")
dotenv.config({ path: envFilePath })

import app from './server'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

async function main() {
    app.listen(PORT, () => {
        console.log('server started at http://localhost:8000)
    })
}

main()


// server.ts

import { userController, postController } from "./controllers"
import express from "express"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', userController)
app.use('/posts', postController)

export default app


// models/post.ts

import { DataTypes } from "sequelize"
import { sequelize } from "../db"

export const postModel = sequelize.define('Post', {
    summary: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
})

postModel.sync()


// models/user.ts

import { DataTypes } from "sequelize"
import { sequelize } from "../db"

export const userModel = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING
    },
    googleData: {
        type: DataTypes.JSON
    }
})


//db.ts

import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE!,
    process.env.POSTGRES_USER!,
    process.env.POSTGRES_PASSWORD!,
    {
        dialect: "postgres",
        host: process.env.POSTGRES_HOST!,
        port: Number(process.env.POSTGRES_PORT!),
        logging: false
    })
userModel.sync()


// controllers/post.ts

import { Router } from "express";
import { postModel } from "../models";

export const postController = Router()

postController.post('/', async (req,res) => {
    const result = await postModel.create(req.body)
    res.json(result)
})

postController.get('/', async (req, res) => {
    const result = await postModel.findAll()
    res.json(result)
})

postController.get('/:id', async (req,res) => {
    const result = await postModel.findByPk(req.params.id)
    res.json(result)
})

postController.patch('/:id', async (req,res) => {
    const result = await postModel.update(
        req.body,
        {where: {_id: req.params.id}}
    )
    res.json(result)
})

postController.delete('/:id', async (req,res) => {
    const oldPost =  await postModel.findByPk(req.params.id)
    const result = await oldPost?.destroy()
    res.json(result)
})


// controllers/user/auth.ts

import { Router } from 'express'
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2'
import { userModel } from '../../models'
import passport from "passport"

declare global {
    namespace Express {
        interface User {
            id: string
            googleId: string,
            googleData: any
        }
    }
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/users/auth/google/callback",
},
    async function verify(accessToken, refreshToken, profile, done) {
        try {
            let user = await userModel.findOrCreate({
                where: {
                    googleId: profile.id
                },
                defaults: {
                    googleData: profile
                }
            })
            return done(null, user[0])
        } catch (err) {
            return done(err)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    userModel
        .findByPk(id as string)
        .then((user) => {
            //@ts-ignore
            done(null, user)
        })
})


export const authController = Router()

authController.get('/google/login', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

authController.get('/google/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

authController.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
}))

// controllers/user/user.ts

import { Router } from "express";
import { userModel } from "../../models";
import { authController } from "./auth";

export const userController = Router()

userController.use('/auth', authController)

userController.post('/', async (req, res) => {
    const result = await userModel.create(req.body)
    res.json(result)
})

userController.get('/', async (req, res) => {
    const result = await userModel.findAll()
    res.json(result)
})

userController.get('/:id', async (req, res) => {
    const result = await userModel.findByPk(req.params.id)
    res.json(result)
})

userController.patch('/:id', async (req, res) => {
    const result = await userModel.update(
        req.body,
        { where: { _id: req.params.id } }
    )
    res.json(result)
})

userController.delete('/:id', async (req, res) => {
    const oldUser =  await userModel.findByPk(req.params.id)
    const result = await oldUser?.destroy()
    res.json(result)
})`



const highlightCode = (code) => (
    <Highlight Prism={Prism} code={code} theme={theme} language="typescript">
        {({ tokens, getLineProps, getTokenProps }) => (
            <Fragment>
                {tokens.map((line, i) => (
                    /// eslint-disable-next-line react/jsx-key
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                            /// eslint-disable-next-line react/jsx-key
                            <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                ))}
            </Fragment>
        )}
    </Highlight>
);

function CodeWindow(props) {

    const [code] = useWindupString(props.children, {
        pace: () => delay,
        onFinished: () => {
            handlePauseResume()
        }
    });

    const [isActive, setIsActive] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive && isPaused === false) { interval = setInterval(() => { setTime((time) => time + 10); }, 10); }
        else { clearInterval(interval); }
        return () => { clearInterval(interval); };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div>
            <span className='bg-dracula font-monts rounded-t-md w-min text-md p-3 font-semibold'>
                {props.title}
            </span>
            <ScrollToBottom className='bg-dracula rounded-tr-md rounded-b-md p-6 overflow-auto h-750px'>
                <Editor
                    value={code}
                    highlight={highlightCode}
                    padding={10}
                />
            </ScrollToBottom>
            <div className='text-4xl'>
                <div className="flex justify-center pt-6">
                    <span className="digits">
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span className="digits">
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                    </span>
                    <span className="digits mili-sec">
                        {("0" + ((time / 10) % 100)).slice(-2)}
                    </span>
                </div>
            </div>
        </div>
    )
}

// MAIN CODE

function SpeedTest() {

    const [isStarted, setIsStarted] = useState(false)

    return (
        <div id='tailwind'>
            <div className='grid grid-cols-2 gap-8 p-12 font-mono' style={{ fontFamily: 'monospace' }}>
                <CodeWindow title='EzBackend + PostGres' started={isStarted}>
                    {ezbackendCode}
                </CodeWindow>
                <CodeWindow title='Express + PostGres' started={isStarted}>
                    {expressCode}
                </CodeWindow>
            </div>
        </div >
    );
}

export default SpeedTest;

