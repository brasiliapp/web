export interface Cabinet {
  id: number;
  deputado: string;
  salary: `R$ ${number},${number}`;
  montly_expenses: MonthlyExpense[];
  active_secretaries: Secretary[];
  inactive_secretaries: Secretary[];
}

export interface MonthlyExpense {
  month: number;
  available_amount: string;
  expense_amount: string;
}

export interface CabinetResponse extends Cabinet {
  last_update: string;
  built_by: string;
}

export interface Secretary {
  name: string;
  group: string;
  role: string;
  period: string;
}
