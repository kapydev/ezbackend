import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
//TODO: Remove ts-ignore after PR for adding types is approved
//@ts-ignore
import Web3Token from 'web3-token'
/*
IMPORTANT NOTICE

This react app is rendered as a single HTML file, because otherwise
we would have to serve multiple routes for multiple assets (css, js, whatever)
and that would get messy in terms of the backend

So please don't go whoopdy doo and add multiple pages
or whatever fancy effects to this page, because all
additional pages will be served in the same react file
and multiple pages will be all loaded at the same time

Also the fancy magic to serve it as a single HTML is in the
webpack config with the addition of inline css and inline
js plugins

Also we probably didn't need to eject just to add the webpack plugin,
so if anyone wants to help us switch to CRA defaults and just add
the plugins there that would be great
*/

interface EthereumWindow extends Window {
  ethereum?: any
}

function App() {

  const web3 = new Web3(Web3.givenProvider)

  const [accounts, setAccounts] = useState<Array<string> | undefined>(undefined)

  async function connectMetamask() {
    if (!(window as EthereumWindow).ethereum) {
      window.alert("You must have Meta Mask installed to login!")
      window.history.back()
    }
    const accounts = await web3.eth.requestAccounts()
    setAccounts(accounts)
  }

  async function registerOnAccountChange() {
    (window as EthereumWindow)?.ethereum?.on("accountsChanged", function (accounts: Array<string>) {
      setAccounts(accounts)
    })
  }

  async function getSignedMsg(address: string) {
    const signedMsg = await Web3Token.sign(
      (msg: string) => web3.eth.personal.sign(msg, address, 'wow a password that literally does nothing (Other than to mess with typescript), if you dont believe me go ahead and change it'),
      '10m')
    return signedMsg
  }

  async function signIn(address: string) {
    const signedMsg = await getSignedMsg(address)
    await sendSignedMsg(signedMsg)
  }

  async function sendSignedMsg(msg: string) {
    //URGENT TODO: Can we send the token outside of the URL so that it doesn't happily print the token server side
    //TODO: Should we make the tokens one time use?
    //TODO: Is there a better way of not getting the callback URL by relative path
    
    if (process.env.NODE_ENV === 'development') {
      const callbackURL = window.prompt("Please enter the callback URL. The callback URL will be programmatically referenced in production","http://localhost:8000/user/auth/web3/callback")
      window.location.href = `${callbackURL}?token=${msg}`
    } else if (process.env.NODE_ENV === 'production') {
      const slashSeperatedURL = window.location.href.split('/')
      slashSeperatedURL.pop()
      const parentURL = slashSeperatedURL
      const callbackURL = parentURL.join('/') + `/callback`
      window.location.href = `${callbackURL}?token=${msg}`
    }
  }

  useEffect(() => {
    connectMetamask()
    registerOnAccountChange()
  }, [])

  const UnconnectedView = <div>Connecting...</div>

  //URGENT TODO: Update based on hook? right now if the browser changes user this is not updating
  const ConnectedView = <div>
    <p>Select login Account</p>
    {accounts?.map(account => {
      return <button onClick={() => { signIn(account) }} key={account}>{account}</button>
    })}
    <br />
    <button onClick={connectMetamask}>Update Accounts List</button>
  </div>



  return (
    <div>
      {accounts ? ConnectedView : UnconnectedView}
    </div>
  );
}


export default function AppWrapper() {
  return <App />
};
