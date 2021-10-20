import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
//TODO: Remove ts-ignore after PR for adding types is approved
//@ts-ignore
import Web3Token from 'web3-token'

interface EthereumWindow extends Window {
  ethereum?: any
}

function App() {

  const web3 = new Web3(Web3.givenProvider)

  const [accounts, setAccounts] = useState<Array<string> | undefined>(undefined)

  async function connectMetamask() {
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
    window.location.href = `http://localhost:8000/user/auth/web3/callback?token=${msg}`
  }

  useEffect(() => {
    registerOnAccountChange()
  }, [])

  const UnconnectedView = <button onClick={connectMetamask}>Connect</button>

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
