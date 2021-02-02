// eslint-disable-next-line no-unused-vars
const Modal = {
  toggleModal() {
    document.querySelector('.modal-overlay').classList.toggle('active');
  },
};

const Transaction = {
  all: [
    {
      description: 'Luz',
      amount: -50000,
      date: '23/01/2021',
    },
    {
      description: 'Criação website',
      amount: 500000,
      date: '13/01/2021',
    },
    {
      description: 'Internet',
      amount: -20510,
      date: '25/01/2021',
    },
    {
      description: 'App',
      amount: 200000,
      date: '25/01/2021',
    },
  ],

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);

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

  formatAmount(value) {
    value = Number(value.replace(/\[.,]/g), '') * 100;

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split('-').reverse().join('/');

    return splittedDate;
  },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  clearTransaction() {
    DOM.transactionsContainer.innerHTML = '';
  },

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense';

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class=${cssClass}>${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" />
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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction);
      Form.clearFields();
      Modal.toggleModal();
    } catch (error) {
      alert(error.message);
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor, preencha todos os campos');
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return { description, amount, date };
  },

  clearFields() {
    Form.description.value = '';
    Form.amount.value = '';
    Form.date.value = '';
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransaction();
    App.init();
  },
};

App.init();
