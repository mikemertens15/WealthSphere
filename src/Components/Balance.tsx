type BalanceProp = {
  balanceData: {
    account: {
      account_id: string;
    };
  };
};

const Balance: React.FC<BalanceProp> = ({ balanceData }) => {
  return (
    <div className="balance-widget">
      <h1>{balanceData.account.account_id}</h1>
    </div>
  );
};

export default Balance;
