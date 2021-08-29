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

  const handleRefreshClick = () => {
    setIsLoading(true);
    const tokenInfo = getTokenInfo(token);

    if (tokenInfo === undefined) {
      throw new Error(`Can NOT find ERC20 contract address of ${token}`);
    }

    getERC20WalletBalance(tokenInfo.address);
  };

  return (
    <div className="token-row">
      <div className="image">
        <Image
          src={`/${token.toLowerCase()}-logo.svg`}
          alt={token}
          width={32}
          height={32}
        />
      </div>
      <div className="token">{token}</div>
      <div className="balance">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <p>{tokenBalance}</p>
            <span onClick={handleRefreshClick}>
              <Image
                src="/refresh.png"
                alt="refresh balance"
                width={16}
                height={16}
              />
            </span>
          </div>
        )}
      </div>
      <style jsx>{`
        .token-row {
          display: grid;
          grid-template-columns: 1fr 1fr 3fr;
          width: 80%;
          margin: 0 auto;
          place-items: center;
          min-height: 54px;
        }

        .token-row > .balance {
          place-self: center end;
        }

        .token-row > .balance > div {
          place-self: end;
          display: flex;
          align-items: center;
        }

        .token-row > .balance span {
          margin-left: 2rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TokenRow;
