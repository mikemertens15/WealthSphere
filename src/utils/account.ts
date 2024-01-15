export default interface Account {
  _id: string;
  accountName: string;
  accountType: string;
  currentBalance: number;
  availableBalance: number | null;
  plaidItem: string | null;
}
