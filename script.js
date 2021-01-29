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
    id: 1,
    description: 'Criação website',
    amount: 500000,
    date: '13/01/2021',
  },
  {
    id: 1,
    description: 'Internet',
    amount: 20000,
    date: '25/01/2021',
  },
];

const Transaction = {
  incomes() {},
  expenses() {},
  total() {},
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innetHTMLTransaction(transaction[index]);
  },

  innetHTMLTransaction(transaction) {
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="expense">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação" />
      </td>
    `;

    return html;
  },
};

DOM.addTransaction(transactions, 0);
