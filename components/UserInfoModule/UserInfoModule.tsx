import { useState } from 'react';
import { providers, utils } from 'ethers';

const initWeb3Provider = (): providers.Web3Provider =>
  new providers.Web3Provider((window as any).ethereum);

// TODO: get keys for infura and alchemy

const UserInfoModule = () => {
  const [displayInfo, setDisplayInfo] = useState('');

  const getAccount = async (): Promise<string> => {
    if ((window as any).ethereum === undefined) {
      setDisplayInfo('Please install MetaMask to view your account details');
      return '';
    }

    try {
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });

      const [account] = accounts;
      return account;
    } catch (error) {
      console.error('error', error);
      return '';
    }
  };

  const getWalletBalance = async (): Promise<string> => {
    if ((window as any).ethereum === undefined) {
      setDisplayInfo('Please install MetaMask to view your account details');
      return '';
    }

    try {
      const address = await getAccount();
      const provider = initWeb3Provider();
      const balance = await provider.getBalance(address);
      const formattedBalance = utils.formatEther(balance);

      return formattedBalance;
    } catch (error) {
      console.error('error !', error);
      setDisplayInfo('Please install MetaMask to view your account details');
      return '';
    }
  };

  const showWalletAddress = async () => {
    const address = await getAccount();

    if (address) setDisplayInfo(address);
  };

  const showETHBalance = async () => {
    const balance = await getWalletBalance();

    if (balance) setDisplayInfo(balance);
  };

  return (
    <>
      <div className="result">
        <span>
          <p>{displayInfo}</p>
        </span>
      </div>
      <div className="button-container">
        <button onClick={showWalletAddress}>your wallet address</button>
        <button onClick={showETHBalance}>your ETH balance</button>
      </div>
      <style jsx>{`
        .result {
          color: white;
          min-height: 54px;
          font-size: 19px;
          min-height: 64px;
        }

        .button-container {
          display: flex;
          justify-content: space-around;
          margin-bottom: 1.5rem;
          width: 80%;
        }

        .button-container button {
          background: rgb(163, 141, 203);
          color: white;
          border: 1px solid rgb(163, 141, 203);
          border-radius: 0.55rem;
          padding: 0.5rem 1rem;
          transition: 0.2s all ease-in-out;
          text-transform: capitalize;
          flex: 0.4;
          font-family: 'Open Sans', sans-serif;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
        }

        .button-container button:hover {
          background: white;
          color: rgb(145, 152, 229);
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default UserInfoModule;
