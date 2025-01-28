    document.addEventListener("DOMContentLoaded", () => {
        const expenseForm = document.getElementById("expense-form")
        const expenseNameInput = document.getElementById("expense-name")
        const expenseAmountInput = document.getElementById("expense-amount")
        const expenseList = document.getElementById("expense-list")
        const totalAmountDisplay = document.getElementById("total-amount")

        let expenses = JSON.parse(localStorage.getItem("expenses")) || []
        let totalAmount = calculateTotal()
        renderExpenses()

        expenseForm.addEventListener("submit", (e) => {
            e.preventDefault()
            const name = expenseNameInput.value.trim("")
            const amount = parseFloat(expenseAmountInput.value)

            if(name !== "" && !isNaN(amount) && amount > 0) {

                let newExpense = {
                    id: Date.now(), 
                    name,
                    amount,
                }
                
                expenses.push(newExpense)
                renderExpenses()
                saveExpnesesToLocal()

                //? clear input
                expenseNameInput.value = ""
                expenseAmountInput.value = ""
            }
        })

        //. Render expenses 
        function renderExpenses() {
            expenseList.innerHTML = ""
            expenses.forEach(expense => {
            const li = document.createElement("li")
            li.innerHTML = `
            <span>${expense.name} - $${expense.amount}</span>
            <button data-id="${expense.id}">Delete</button>
            `
            expenseList.appendChild(li)
            })

            



            //# total amount
            totalAmount = calculateTotal()
            totalAmountDisplay.textContent = totalAmount
        }

        //. total amount 
        function calculateTotal() {
            return expenses.reduce((sum, expense) => sum + expense.amount, 0)
        }

        //. delete 
        // function deleteExpense(deleteExp) {
        //     const index = expenses.findIndex(exp => exp.id == deleteExp.id)
        //     console.log(index);

        //     if(index != -1) {
        //         expenses.splice(index, 1)
        //         renderExpenses()
        //     }
        // }

        expenseList.addEventListener("click", (e) => {
            if(e.target.tagName == 'BUTTON') {
                const expenseId = parseInt(e.target.getAttribute("data-id"))
                expenses = expenses.filter(expense => expense.id != expenseId)
                renderExpenses()
                saveExpnesesToLocal()
            }
            
        })

        //.local storage 
        function saveExpnesesToLocal() {
            localStorage.setItem("expenses", JSON.stringify(expenses))
        }
    })