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
  incomes() {},
  expenses() {},
  total() {},
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

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innetHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innetHTMLTransaction(transaction) {
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
};

transactions.forEach((transaction) => {
  DOM.addTransaction(transaction);
});
