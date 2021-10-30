const Modal = {
  toggle(action) {
    if(action === 'add') 
      document
        .querySelector('.modal-overlay.add')
        .classList.toggle('active');    
    
    if(action === 'edit') 
      document
        .querySelector('.modal-overlay.edit')
        .classList.toggle('active');  
  },
  overlayToggle(event) {
    if(event.target === document.querySelector('.modal-overlay.add')) 
      Form.cancel('add');
      
    if(event.target === document.querySelector('.modal-overlay.edit')) 
      Form.cancel('edit');
  }
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transaction')) || [];
  },
  set(transaction) {
    localStorage.setItem('dev.finances:transaction', JSON.stringify(transaction));
  }
}

const Transaction = {
  all: Storage.get(),
  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },
  addAll(transactions) {
    Transaction.all.splice(0, Transaction.all.length, ...transactions);
    App.reload();
  },
  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },
  removeAll(){
    Transaction.all.splice(0, Transaction.all.length);
    App.reload();
  },
  edit(id, transaction) {
    Transaction.all.splice(id, 1, transaction);
    App.reload();
  },
  incomes() {
    let income = 0;
    Transaction.all.forEach( transaction => {
      if(transaction.amount > 0) income += transaction.amount;
    })
    return income;
  },
  expenses() {
    let expense = 0;
    Transaction.all.forEach( transaction => {
      if(transaction.amount < 0) expense += transaction.amount;
    })
    return expense;
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
  download(e) {
    e.preventDefault();

    const data = JSON.stringify(Storage.get(), null, 4);
    const blob = new Blob([data], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);

    const date = new Date();
    const today = `${date.getDate()}-${date.getMonth() < 10? '0'+date.getMonth(): date.getMonth()}-${date.getFullYear()}`;
    const link = document.createElement('a');
    link.download = `devfinances-${today}.json`;
    link.href = url;
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  },
  upload(e) {
    const file = e.target.files[0];

    if(file) {
      document.querySelector('.button-wrapper label').innerHTML = file.name;

      const reader = new FileReader();
      reader.onload = () => Transaction.addAll(JSON.parse(reader.result));
      reader.readAsText(file);

    } else {
      document.querySelector('.button-wrapper label').innerHTML = 'Upload JSON';
    };
  },
  uploadListener() {
    const inputFile = document.querySelector('#upload');
    inputFile.addEventListener('change', e => Transaction.upload(e))
  }
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
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
      <td class="${cssClass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
      <img src="./assets/edit.svg" alt="Remover Transação" onclick="DOM.editTransaction(${index})">
        <img src="./assets/remove.svg" alt="Remover Transação" onclick="Transaction.remove(${index})">
      </td>
    `;

    return html;
  },
  updateBalance() {
    const totalDisplay = document.querySelector('#totalDisplay');

    document
      .querySelector('#incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes());

    document
      .querySelector('#expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses());

    totalDisplay.innerHTML = Utils.formatCurrency(Transaction.total());

    Transaction.total() < 0
      ? totalDisplay.parentElement.classList.add('negative')
      : totalDisplay.parentElement.classList.remove('negative');
    
  },
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = '';
  },
  editTransaction(id) {
    const { description, amount, date } = Transaction.all[id];

    const reverseAmount = Utils.reverseAmount(amount);
    const reverseDate = Utils.reverseDate(date);

    const fields = `
      <input type="hidden" id="transactionId" name="transactionId" value="${id}">
      <div class="input-group">
        <label 
          class="sr-only" 
          for="description"
        >
          Descrição
        </label>
        <input 
          type="text" 
          name="description" 
          id="description" 
          placeholder="Descrição"
          maxlength="50"
          minlength="3"
          value="${description}"
          required
        >
        <span class="error"></span>
        </div>
        <div class="input-group">
          <label 
            class="sr-only" 
            for="amount"
          >
            Valor
          </label>
          <input 
            type="number" 
            step="0.01"
            name="amount" 
            id="amount" 
            placeholder="0,00"
            min="-1000000.00"
            max="1000000.00"
            value="${reverseAmount}"
            required
          >
          <span class="error"></span>
          <small class="help">Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais.</small>
        </div>
        <div class="input-group">
          <label 
            class="sr-only" 
            for="date"
          >
            Data
          </label>
          <input 
            type="date" 
            name="date" 
            id="date" 
            placeholder="22/01/2021"
            value="${reverseDate}"
            required
          >
          <span class="error"></span>
        </div>
        <div class="input-group actions">
          <a 
            href="#" 
            class="button cancel"
            onclick="Form.cancel('edit')"  
          >Cancelar</a>
          <button type="submit">
            Salvar
          </button>
        </div>
    `;

    document.querySelector('.edit form').innerHTML = fields;
    Form.fieldsListener();
    Modal.toggle('edit');
  }
}

const Filter = {
  input: document.querySelector('#search'),
  table: document.querySelector('table'),
  transactions() {
    const tBody = Filter.table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    Filter.input.addEventListener('keyup', (e) => {
      const query = e.target.value.toUpperCase();
      
      const filteredRows = rows.filter(row =>
        row.querySelector('.description').textContent.toUpperCase().includes(query));

      while(tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
      }

      tBody.append(...filteredRows);
    })
  }
}

const Sort = {
  table: document.querySelector('table'),
  description(asc = true) {
    const thDescription = document.querySelector('#th-description');
    if(thDescription.classList.contains('th-sort-asc')) asc = false;
    
    const dirOrder = asc ? 1 : -1;
    const tBody = Sort.table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
      const aColContent = a.querySelector(`td:nth-child(${1})`).textContent.trim();
      const bColContent = b.querySelector(`td:nth-child(${1})`).textContent.trim();

      return aColContent > bColContent ? (1 * dirOrder) : (-1 * dirOrder);
    })

    while(tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    Sort.table.querySelectorAll('th')
    .forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    
    Sort.table.querySelector(`th:nth-child(${1})`).classList.toggle('th-sort-asc', asc);
    Sort.table.querySelector(`th:nth-child(${1})`).classList.toggle('th-sort-desc', !asc);
  },
  value(asc = true) {
    const thValue = document.querySelector('#th-value');
    if(thValue.classList.contains('th-sort-asc')) asc = false;
    
    const dirOrder = asc ? 1 : -1;
    const tBody = Sort.table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
      const aColContent = a.querySelector(`td:nth-child(${2})`).textContent.trim();
      const aValue = parseFloat(aColContent.replace('R$','').replace('-','').replace('.','').replace(',','.').trim());
      const bColContent = b.querySelector(`td:nth-child(${2})`).textContent.trim();
      const bValue = parseFloat(bColContent.replace('R$','').replace('-','').replace('.','').replace(',','.').trim());

      return aValue > bValue ? (1 * dirOrder) : (-1 * dirOrder);
    })

    while(tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    Sort.table.querySelectorAll('th')
    .forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    
    Sort.table.querySelector(`th:nth-child(${2})`).classList.toggle('th-sort-asc', asc);
    Sort.table.querySelector(`th:nth-child(${2})`).classList.toggle('th-sort-desc', !asc);
  },
  date(asc = true){
    const thDate = document.querySelector('#th-date');
    if(thDate.classList.contains('th-sort-asc')) asc = false;
    
    const dirOrder = asc ? 1 : -1;
    const tBody = Sort.table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
      const aColContent = a.querySelector(`td:nth-child(${3})`).textContent.trim().split('/').reverse().join('-');
      const aDate = new Date(aColContent);
      const bColContent = b.querySelector(`td:nth-child(${3})`).textContent.trim().split('/').reverse().join('-');
      const bDate = new Date(bColContent);

      return aDate > bDate ? (1 * dirOrder) : (-1 * dirOrder);
    })

    while(tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    Sort.table.querySelectorAll('th')
    .forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    
    Sort.table.querySelector(`th:nth-child(${3})`).classList.toggle('th-sort-asc', asc);
    Sort.table.querySelector(`th:nth-child(${3})`).classList.toggle('th-sort-desc', !asc);
  }
}

const Utils = {
  formatAmount(value) {
    value = value * 100;
    return Math.round(value);
  },
  reverseAmount(value) {
    return value/100;
  },
  formatDate(date) {
    const splittedDate = date.split('-');
    splittedDate.reverse();
    return splittedDate.join('/');
  },
  reverseDate(date) {
    const splittedDate = date.split('/');
    splittedDate.reverse();
    return splittedDate.join('-');
  },
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ' ';
    value = String(value).replace(/\D/g, '');
    value = Number(value) / 100;

    value = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });

    return signal + value;
  },
  createPDF(e) {
    e.preventDefault();
    const doc = new jsPDF();

    const income = Utils.formatCurrency(Transaction.incomes()).trim();
    const expense = Utils.formatCurrency(Transaction.expenses());
    const total = Transaction.total();

    const date = new Date();
    const today = `${date.getDate()}/${date.getMonth() < 10? '0'+date.getMonth(): date.getMonth()}/${date.getFullYear()}`;
    const todayName = `${date.getDate()}-${date.getMonth() < 10? '0'+date.getMonth(): date.getMonth()}-${date.getFullYear()}`;

    doc.setFontSize(12);
    doc.text(20, 20, 'dev.finance$');

    doc.text(168, 20, today);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(73, 170, 38);
    doc.roundedRect(20, 30, 50, 25, 1, 1, "FD");
    doc.setDrawColor(233, 41, 41);
    doc.roundedRect(80, 30, 50, 25, 1, 1, "FD");
    if(total > 0) {
      doc.setDrawColor(73, 170, 38);
      doc.setFillColor(73, 170, 38);
    } else {
      doc.setDrawColor(233, 41, 41);
      doc.setFillColor(233, 41, 41);
    }
    doc.roundedRect(140, 30, 50, 25, 1, 1, "FD");

    doc.setFontSize(12);
    doc.setTextColor(73, 170, 38);
    doc.text("Entradas", 25, 40);
    doc.setTextColor(233, 41, 41);
    doc.text("Saídas", 85, 40);
    doc.setTextColor(255, 255, 255);
    doc.text("Total", 145, 40);

    doc.setFontSize(18);
    doc.setFontType('bold')
    doc.setTextColor(73, 170, 38);
    doc.text(income, 25, 50);
    doc.setTextColor(233, 41, 41);
    doc.text(expense, 85, 50);
    doc.setTextColor(255, 255, 255);
    doc.text(Utils.formatCurrency(total), 145, 50);

    doc.setDrawColor(73, 170, 38);
    doc.line(20, 75, 190, 75);

    doc.setFontSize(12);
    doc.setFontType('bold')
    doc.setTextColor(0, 0, 0);
    doc.text("Descrição", 20, 70);
    doc.text("Valor", 110, 70);
    doc.text("Data", 160, 70);

    doc.setFontSize(12);
    doc.setFontType('normal')

    Transaction.all.forEach((transaction, index) => {
      let row = 85 + (index * 10)

      doc.setTextColor(0, 0, 0);
      doc.text(String(transaction.description), 20, row);
      doc.text(String(transaction.date), 160, row);

      if(transaction.amount > 0) {
        doc.setTextColor(73, 170, 38);
        doc.text(Utils.formatCurrency(transaction.amount), 110, row);
      } else {
        doc.setTextColor(233, 41, 41);
        doc.text(Utils.formatCurrency(transaction.amount), 110, row);
      }
    })

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('https://lucasbecker.github.io/dev-finances/', 105, 285, null, null, "center");

    doc.save(`devfinances-${todayName}.pdf`);
  }
}

const Form = {
  getValuesAdd() {
    return {
      description: document.querySelector('.add input#description').value,
      amount: document.querySelector('.add input#amount').value,
      date: document.querySelector('.add input#date').value,
    }
  },
  getValuesEdit() {
    return {
      transactionId: document.querySelector('.edit input#transactionId').value,
      description: document.querySelector('.edit input#description').value,
      amount: document.querySelector('.edit input#amount').value,
      date: document.querySelector('.edit input#date').value,
    }
  },
  verifyErrors(field) {
    let foundError = false;

    for(error in field.validity)
      if(field.validity[error] && !field.validity.valid)
        foundError = error;

    return foundError;
  },
  customFeedback(field, typeError) {
    const spanError = field.parentNode.querySelector('span.error');
    
    const messages = {
      text: {
        valueMissing: 'Uma descrição é necessária!',
        typeMismatch: 'Por favor, insira uma descrição válida!',
        tooLong: 'Descrição muito longa!',
        tooShort: 'Descrição muito curta!',
        badInput: 'Ops... Descrição incompreensível!',
      },
      number: {
        valueMissing: 'O valor é obrigatório!',
        typeMismatch: 'Por favor, insira um valor válido!',
        rangeUnderflow: 'Valor muito baixo!',
        rangeOverflow: 'Valor muito alto!',
        stepMismatch: 'Frações de centavos não são válidos!',
        badInput: 'Ops... Valor incompreensível!',
      },
      date: {
        valueMissing: 'A data é obrigatória!',
        typeMismatch: 'Por favor, insira uma data válida!',
        rangerUnderflow: 'Data invalida!',
        rangerOverflow: 'Data invalida!',
        badInput: 'Ops... Data incompreensível!',
      }
    }

    if(typeError) {
      spanError.classList.add('active')
      spanError.innerHTML = messages[field.type][typeError]
      field.style.borderColor = 'var(--red)';
    } else {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
      field.style.borderColor = 'var(--green)';
    }

  },
  validateField(event) {
    event.preventDefault();
    const field = event.target;
    const hasError = Form.verifyErrors(field);
    Form.customFeedback(field, hasError);
  },
  fieldsListener() {
    for(field of document.querySelectorAll('[required]')) {
      field.addEventListener('invalid', Form.validateField);
      field.addEventListener('blur', Form.validateField);
    }
  },
  formatValuesAdd() {
    let { description, amount, date } = Form.getValuesAdd();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date
    };
  },
  formatValuesEdit() {
    let { transactionId, description, amount, date } = Form.getValuesEdit();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      transactionId,
      description,
      amount,
      date
    };
  },
  addTransaction(transaction) {
    Transaction.add(transaction)
  },
  editTransaction(id, transaction) {
    Transaction.edit(id, transaction)
  },
  clearFields() {
    for(field of document.querySelectorAll('[required]')){
      field.value = '';
      Form.customFeedback(field, false);
    }

    document.querySelector('#search').value = '';
  },
  cancel(action){
    Form.clearFields();
    Modal.toggle(action);
  },
  submit(event, action) {
    event.preventDefault();
    if(action === 'add') {
      const transaction = Form.formatValuesAdd();
      Form.addTransaction(transaction);
      Form.clearFields();
      Modal.toggle('add');
    }

    if(action === 'edit'){
      const {transactionId, description, amount, date} = Form.formatValuesEdit();
      Form.editTransaction(transactionId, {description, amount, date});
      Form.clearFields();
      Modal.toggle('edit')
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);
    DOM.updateBalance();
    Storage.set(Transaction.all);
    Filter.transactions();
    Form.fieldsListener();
    Transaction.uploadListener();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  }
}

App.init();
