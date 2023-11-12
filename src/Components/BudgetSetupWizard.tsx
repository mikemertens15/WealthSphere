import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import axios from "axios";

interface BudgetSetupWizardProps {
  userEmail: string | undefined;
  open: boolean;
  onClose: () => void;
}

const steps = [
  "Income",
  "Rent",
  "Utilities",
  "Groceries",
  "Entertainment",
  "Restaurants / Bars",
  "Loan payments",
  "Personal Care",
  "Shopping",
];

// Early implementation of a budget setup wizard, currently only worried about getting input from the user
const BudgetSetupWizard: React.FC<BudgetSetupWizardProps> = ({
  userEmail,
  open,
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState({
    housing: 0,
    utilities: 0,
    groceries: 0,
    entertainment: 0,
    restaurantsBars: 0,
    loanPayments: 0,
    personalCare: 0,
    shopping: 0,
  });

  const updateExpense = (category: string, amount: number) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: amount,
    }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <TextField
            label="Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            fullWidth
            margin="normal"
          />
        );
      case 1:
        return (
          <TextField
            label="Rent / Mortgage"
            value={expenses.housing}
            onChange={(e) => updateExpense("housing", Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        );
      case 2:
        return (
          <TextField
            label="Utilities"
            value={expenses.utilities}
            onChange={(e) => updateExpense("utilities", Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        );
      case 3:
        return (
          <TextField
            label="Groceries"
            value={expenses.groceries}
            onChange={(e) => updateExpense("groceries", Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        );
      case 4:
        return (
          <TextField
            label="Entertainment"
            value={expenses.entertainment}
            onChange={(e) =>
              updateExpense("entertainment", Number(e.target.value))
            }
            fullWidth
            margin="normal"
          />
        );
      case 5:
        return (
          <TextField
            label="Restaurants / Bars"
            value={expenses.restaurantsBars}
            onChange={(e) =>
              updateExpense("restaurantsBars", Number(e.target.value))
            }
            fullWidth
            margin="normal"
          />
        );
      case 6:
        return (
          <TextField
            label="Loan Payments"
            value={expenses.loanPayments}
            onChange={(e) =>
              updateExpense("loanPayments", Number(e.target.value))
            }
            fullWidth
            margin="normal"
          />
        );
      case 7:
        return (
          <TextField
            label="Personal Care"
            value={expenses.personalCare}
            onChange={(e) =>
              updateExpense("personalCare", Number(e.target.value))
            }
            fullWidth
            margin="normal"
          />
        );
      case 8:
        return (
          <TextField
            label="Shopping"
            value={expenses.shopping}
            onChange={(e) => updateExpense("shopping", Number(e.target.value))}
            fullWidth
            margin="normal"
          />
        );
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Sends the user's budget to the backend
  const handleFinish = () => {
    axios
      .post("http://localhost:3001/api/create_budget", {
        email: userEmail,
        income: income,
        expenses: expenses,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("error posting budget: " + err);
      });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Set up Your Budget</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={
              activeStep === steps.length - 1 ? handleFinish : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetSetupWizard;
