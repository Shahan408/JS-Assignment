var monthlyBudget = 0;
var expenses = [];

function addbudget() {
  var budgetInput = document.getElementById("budgetinput");
  monthlyBudget = parseFloat(budgetInput.value);
  budgetInput.value = "";

  updateremainingbudget();
}

function addexpense() {
  var descriptionInput = document.getElementById("descriptionInput");
  var amountInput = document.getElementById("amountInput");
  var dateInput = document.getElementById("dateInput");

  var expense = {
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    date: dateInput.value,
  };

  expenses.push(expense);

  descriptionInput.value = "";
  amountInput.value = "";
  dateInput.value = "";

  displayexpenses();
  updateremainingbudget();
}

function displayexpenses() {
  var expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  expenses.forEach(function (expense, index) {
    var card = document.createElement("div");
    card.className = "card";

    var description = document.createElement("h3");
    description.textContent = expense.description;

    var amount = document.createElement("p");
    amount.textContent = "Amount: $" + expense.amount.toFixed(2);

    var date = document.createElement("p");
    date.textContent = "Date: " + expense.date;

    var actions = document.createElement("div");
    actions.className = "actions";

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editExpense(index);
    });

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteExpense(index);
    });

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    card.appendChild(description);
    card.appendChild(amount);
    card.appendChild(date);
    card.appendChild(actions);

    expenseList.appendChild(card);
  });
}

function editExpense(index) {
  var expense = expenses[index];

  var description = prompt("Enter a new description:", expense.description);
  if (description === null) {
    return; // User canceled the prompt
  }

  var amount = prompt("Enter a new amount:", expense.amount);
  if (amount === null) {
    return; // User canceled the prompt
  }

  var date = prompt("Enter a new date:", expense.date);
  if (date === null) {
    return; // User canceled the prompt
  }

  expense.description = description;
  expense.amount = parseFloat(amount);
  expense.date = date;

  displayexpenses();
  updateremainingbudget();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayexpenses();
  updateremainingbudget();
}

function updateremainingbudget() {
  var remainingBudget = document.getElementById("remainingBudget");
  var totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  var difference = monthlyBudget - totalExpense;

  remainingBudget.textContent = difference.toFixed(2);
  remainingBudget.className = difference >= 0 ? "text-green" : "text-red";
}
