export default interface Transaction {
  _id: string;
  amount: number;
  accountName: string;
  category: string;
  date: string;
  merchant_name: string;
  plaidItem: string;
}
