const account = {
  name: 'Lincoln Duarte',
  incomes: [{ description: 'transfer', amount: 100 }],
  expenses: [{ description: 'coffe', amount: 5.99 }],
  addExpense(expense) {
    this.expenses.push(expense)
  },
  addIncome(income) {
    this.incomes.push(income)
  },
  getAccountSummary() {
    const totalExpenses = this.expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    )

    const totalIncome = this.incomes.reduce(
      (acc, income) => acc + income.amount,
      0
    )

    return `${this.name} has a balance of $${
      totalIncome - totalExpenses
    }. $${totalExpenses.toFixed(2)} in expenses. $${totalIncome.toFixed(
      2
    )} in income`
  }
}

account.addExpense({ description: 'cake', amount: 23 })
account.addIncome({ description: 'job', amount: 600 })
console.log(account.getAccountSummary())
console.log(account)
