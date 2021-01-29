// eslint-disable-next-line no-unused-vars
const modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active');
  },

  close() {
    document.querySelector('.modal-overlay').classList.remove('active');
  },
};
