import React from 'react';

const ERC20TokenList = [
  'BAT',
  'BNB',
  'BUSD',
  'CHZ',
  'COMP',
  'LINK',
  'NEXO',
  'GRT',
  'USDC',
  'UNI',
  'VEN',
  'WBTC',
];

type Props = {
  handleDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropdownToken = ({ handleDropdownChange }: Props) => {
  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown-select">Choose an ERC-20 Token</label>
      <select
        name="tokens"
        id="dropdown-select"
        onChange={handleDropdownChange}
      >
        {ERC20TokenList.map(token => {
          return (
            <option key={token} value={token}>
              {token}
            </option>
          );
        })}
      </select>
      <style jsx>{`
        .dropdown-container {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default DropdownToken;
