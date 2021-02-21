// eslint-disable-next-line no-unused-vars
const Modal = {
  newTransaction: document.querySelector('.newTransaction'),
  editTransaction: document.querySelector('.editTransaction'),

  toggleNewTransaction() {
    Modal.newTransaction.classList.toggle('active');
    Form.clearFields();
  },

  closeEditTransaction() {
    Modal.editTransaction.classList.remove('active');
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
  },
  set() {
    localStorage.setItem(
      'dev.finances:transactions',
      JSON.stringify(Transaction.all),
    );
  },
};

const Transaction = {
  all: Storage.get(),

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
    const totalDisplay = document.querySelector('.total');
    const total = this.incomes() + this.expenses();
    if (total >= 0) {
      totalDisplay.classList.remove('negative');
    } else {
      totalDisplay.classList.add('negative');
    }

    return total;
  },
};

const EditTransaction = {
  TransactionIndex: '',
  description: document.querySelector('input#editDescription'),
  amount: document.querySelector('input#editAmount'),
  date: document.querySelector('input#editDate'),

  getValues() {
    return {
      description: EditTransaction.description.value,
      amount: EditTransaction.amount.value,
      date: EditTransaction.date.value,
    };
  },

  edit(index) {
    Modal.editTransaction.classList.add('active');

    EditTransaction.insertOnFormValues(index);

    EditTransaction.TransactionIndex = index;
  },

  insertOnFormValues(index) {
    document.querySelector('input#editDescription').value =
      Transaction.all[index].description;

    const formattedAmount = Transaction.all[index].amount / 100;
    document.querySelector('input#editAmount').value = formattedAmount.toFixed(
      2,
    );

    const formattedDate = Transaction.all[index].date
      .split('/')
      .reverse()
      .join('-');

    document.querySelector('input#editDate').value = formattedDate;
  },

  submit(event) {
    event.preventDefault();

    try {
      Utils.validateFields(EditTransaction.getValues());
      EditTransaction.formatValues();
      EditTransaction.addTransaction();
    } catch (error) {
      alert(error.message);
    }
  },

  addTransaction() {
    let { description, amount, date } = EditTransaction.formatValues();

    Transaction.all[EditTransaction.TransactionIndex].description = description;
    Transaction.all[EditTransaction.TransactionIndex].amount = amount;
    Transaction.all[EditTransaction.TransactionIndex].date = date;

    App.reload();

    Modal.closeEditTransaction();
  },

  formatValues() {
    let { description, amount, date } = EditTransaction.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return { description, amount, date };
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
    value *= 100;
    return Math.round(value);
  },

  formatDate(date) {
    const splittedDate = date.split('-').reverse().join('/');

    return splittedDate;
  },

  validateFields(data) {
    const { description, amount, date } = data;
    console.log(data);
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor, preencha todos os campos');
    }
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
      <td class="icons">
        <img onclick="EditTransaction.edit(${index})" src="./assets/edit.svg" alt="Editar transação" />
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
      Utils.validateFields(Form.getValues());
      const transaction = Form.formatValues();
      Transaction.add(transaction);
      Form.clearFields();
      Modal.toggleNewTransaction();
    } catch (error) {
      alert(error.message);
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

    Storage.set();
  },

  reload() {
    DOM.clearTransaction();
    App.init();
  },
};

App.init();
