import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Contract, getDefaultProvider, utils } from 'ethers';
import { getTokenInfo } from 'erc20-token-list';
import Loader from '../Loader/Loader';

type Props = {
  token: string;
};

const TokenRow = ({ token }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState('');

  const getERC20WalletBalance = async (address: string) => {
    const abi = ['function balanceOf(address owner) view returns (uint256)'];
    const provider = getDefaultProvider();

    const erc20Contract = new Contract(address, abi, provider);

    const balance = await erc20Contract.balanceOf(address);

    setTokenBalance(parseFloat(utils.formatEther(balance)).toFixed(2));
    setIsLoading(false);
  };

  useEffect(() => {
    const tokenInfo = getTokenInfo(token);

    if (tokenInfo === undefined) {
      throw new Error(`Can NOT find ERC20 contract address of ${token}`);
    }

    getERC20WalletBalance(tokenInfo.address);
  }, [token]);

  return (
    <div className="token-row">
      <div className="image">
        <Image
          src={`${token.toLowerCase()}-logo.svg`}
          alt={token}
          width={32}
          height={32}
        />
      </div>
      <div className="token">{token}</div>
      <div className="balance">
        {isLoading ? <Loader /> : <p>{tokenBalance}</p>}
      </div>
      <style jsx>{`
        .token-row {
          display: grid;
          grid-template-columns: 1fr 1fr 3fr;
          width: 80%;
          margin: 0 auto;
          place-items: center;
        }

        .token-row > .balance {
          place-self: end;
        }
      `}</style>
    </div>
  );
};

export default TokenRow;
