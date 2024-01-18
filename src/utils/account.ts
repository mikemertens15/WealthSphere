export default interface Account {
  _id: string;
  accountName: string;
  accountType: string;
  balances: {
    available: number;
    current: number;
  };
  availableBalance: number | null;
  plaidItem: string | null;
}
