// eslint-disable-next-line no-unused-vars
const modal = {
  toggleModal() {
    document.querySelector('.modal-overlay').classList.toggle('active');
  },
};

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'Criação website',
    amount: 500000,
    date: '13/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20510,
    date: '25/01/2021',
  },
  {
    id: 4,
    description: 'App',
    amount: 200000,
    date: '25/01/2021',
  },
];

const Transaction = {
  all: transactions,

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach((value) => {
      if (value.amount > 0) income += value.amount;
    });

    return income;
  },
  expenses() {
    let expense = 0;
    Transaction.all.forEach((value) => {
      if (value.amount < 0) expense += value.amount;
    });

    return expense;
  },
  total() {
    return this.incomes() + this.expenses();
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '';

    value = String(value).replace(/\D/g, '');

    value = Number(value) / 100;

    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return signal + value;
  },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  clearTransaction() {
    DOM.transactionsContainer.innerHTML = '';
  },

  addTransaction(transaction) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense';

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class=${cssClass}>${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação" />
      </td>
    `;

    return html;
  },

  updateBalance() {
    document.querySelector('#incomeDisplay').innerHTML = Utils.formatCurrency(
      Transaction.incomes(),
    );
    document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(
      Transaction.expenses(),
    );
    document.querySelector('#totalDisplay').innerHTML = Utils.formatCurrency(
      Transaction.total(),
    );
  },
};

transactions.forEach((transaction) => {
  DOM.addTransaction(transaction);
});

const App = {
  init() {
    transactions.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransaction();
    App.init();
  },
};

App.init();

Transaction.add({
  id: 5,
  description: 'Gás',
  amount: -8000,
  date: '23/01/2021',
});
