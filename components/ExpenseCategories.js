import { Card, CardBody, CardHeader } from "@nextui-org/react";

import {
  formatMonetaryValue,
  getCapitalizedPhrase,
  removeDotsFromPhrase,
} from "@/utils";

export function calculateTotalByExpenseType(expenses, expenseType) {
  const totalCost = expenses?.reduce((accumulator, expense) => {
    if (expense.tipoDespesa !== expenseType) {
      return accumulator + 0;
    }

    const cost = expense.valorLiquido;

    if (typeof cost === "number" && !isNaN(cost)) {
      return accumulator + cost;
    }

    return accumulator;
  }, 0);

  return totalCost;
}

export default function ExpenseCategories({ expenses }) {
  const expensesTypesPresentOnExpensesSet = new Set(
    expenses.map((expense) => expense.tipoDespesa),
  );
  const expensesTypesPresentOnExpenses = Array.from(
    expensesTypesPresentOnExpensesSet,
  ).sort();

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-bold">Categoria de gastos</h2>
      <ul className="flex flex-row gap-2 py-4 overflow-x-scroll">
        {expensesTypesPresentOnExpenses.map((expenseType) => {
          const treatedExpenseType = removeDotsFromPhrase(
            getCapitalizedPhrase(expenseType),
          );
          const totalExpenseValueByType = calculateTotalByExpenseType(
            expenses,
            expenseType,
          );

          return (
            <li key={expenseType}>
              {totalExpenseValueByType > 0 && (
                <Card className="bg-zinc-800 text-white flex flex-col justify-between whitespace-pre-wrap w-80 h-32 p-4">
                  <CardHeader className="font-bold p-0">
                    {treatedExpenseType}
                  </CardHeader>
                  <CardBody className="font-semibold p-0 flex flex-row place-content-start place-items-end">
                    {formatMonetaryValue(totalExpenseValueByType)}
                  </CardBody>
                </Card>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
