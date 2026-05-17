const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
    const amounts = transactions.map(
        transaction => transaction.amount
    );

    const total = amounts
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    const expenseTotal = (
        amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    income.innerText = `+$${incomeTotal}`;
    expense.innerText = `-$${expenseTotal}`;
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "minus" : "";

    const item = document.createElement("li");
    item.classList.add(sign);

    item.innerHTML = `
        ${transaction.text}
        <span>$${transaction.amount}</span>
        <button class="delete-btn"
                onclick="removeTransaction(${transaction.id})">
            X
        </button>
    `;

    list.appendChild(item);
}

function addTransaction() {
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter description and amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
}

function removeTransaction(id) {
    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    updateLocalStorage();
    init();
}

function updateLocalStorage() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);

    updateValues();
}

addBtn.addEventListener("click", addTransaction);

init();