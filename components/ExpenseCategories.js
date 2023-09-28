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
    if(expense.tipoDespesa !== expenseType) {
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
  const expensesTypesPresentOnExpensesSet = new Set(expenses.map(expense => expense.tipoDespesa));
  const expensesTypesPresentOnExpenses = Array.from(expensesTypesPresentOnExpensesSet);

  return (
    <section>
      <h2>Categoria de gastos</h2>
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
                <Card>
                  <CardHeader>{expenseType}</CardHeader>
                  <CardBody>
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
