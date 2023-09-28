import { formatMonetaryValue } from "@/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

function getExpenseTypeCodeByName(expenseTypeName, expenseTypes) {
  const targetExpenseType = expenseTypes.find(
    (expenseType) => expenseType.nome === expenseTypeName,
  );

  return targetExpenseType.cod;
}

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

export default function ExpenseCategories({ expenses, expenseTypes }) {
  const expensesTypesPresentOnExpensesSet = new Set(
    expenses.map((expense) => expense.tipoDespesa),
  );
  const expensesTypesPresentOnExpenses = Array.from(
    expensesTypesPresentOnExpensesSet,
  ).sort();

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-bold">Categoria de gastos</h2>
      <ul className="flex flex-row gap-2 overflow-x-scroll">
        {expensesTypesPresentOnExpenses.map((expenseType) => {
          const totalExpenseValueByType = calculateTotalByExpenseType(
            expenses,
            expenseType,
          );
          const expenseTypeCode = getExpenseTypeCodeByName(
            expenseType,
            expenseTypes,
          );

          return (
            <li key={expenseTypeCode}>
              {totalExpenseValueByType > 0 && (
                <Card className="bg-zinc-800 text-white flex flex-col justify-between whitespace-pre-wrap w-80 h-36 p-4">
                  <CardHeader className="font-bold p-0">
                    {expenseType}
                  </CardHeader>
                  <CardBody className="font-semibold p-0 flex flex-row place-content-start place-items-end">
                    R$ {formatMonetaryValue(totalExpenseValueByType)}
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
