const addExpenses = (account, expenses = 0) => (account.expenses += expenses)

const addIncome = (account, income = 0) => (account.income += income)

const resetAccount = (account) => {
  account.expenses = 0
  account.income = 0
}

const accountSummary = (account) =>
  `Account for ${account.name} has $${account.income - account.expenses}. $${
    account.income
  } in income. $${account.expenses} in expenses.`

const userAccount = {
  name: 'Lincoln',
  expenses: 0,
  income: 0
}

addExpenses(userAccount, 100)
addIncome(userAccount, 1000)
console.log(accountSummary(userAccount))
resetAccount(userAccount)
console.log(accountSummary(userAccount))
