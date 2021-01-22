class Interest {
    constructor(amount, rate, years) {
        this.amount = amount;
        this.rate = rate;
        this.years = years;
    }
}
class InterestHandling {
    constructor() {
        this.interest = new Object();
    }
    set_interest(data) {
        for (const d in data) {
            if (data[d] != null && data[d] != '') {
                this.interest[d] = data[d];
            }
        }
        // this.interest = new Interest(amount, rate, years);
    }
    get_interest() {
        return this.interest;
    }
}




document.addEventListener("DOMContentLoaded", function (e) {

    const data_amount = document.querySelector('.sum_range').value;
    const data_rate = document.getElementById('interest').textContent;
    const data_years = document.querySelector('.period_range').value;


    // Calculate

    const amount = Number(data_amount);
    const rate = Number((data_rate / 12) * 0.01);
    const years = Number(data_years * 12);
    let interest = new InterestHandling();
    interest.set_interest(new Interest(amount, rate, years))

    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('sum_range') || e.target.classList.contains('sum_text_range')) {
            let amount = e.target.value;
            interest.set_interest(new Interest(amount, null, null))
            let data = interest.get_interest()

            document.querySelector('.sum_text_range').value = data.amount;
            document.querySelector('.sum_range').value = data.amount;
            total_kost(data.amount, data.rate, data.years)
            calculateLoan(data.amount, data.rate, data.years)
            annuitet(data.amount, data.rate, data.years)
        }

        if (e.target.classList.contains('period_range') || e.target.classList.contains('period_text_range')) {
            let years = e.target.value;
            interest.set_interest(new Interest(null, null, years * 12))
            let data = interest.get_interest();

            document.querySelector('.period_text_range').value = data.years / 12;
            document.querySelector('.period_range').value = data.years / 12;
            total_kost(data.amount, data.rate, data.years)
            calculateLoan(data.amount, data.rate, data.years)
            annuitet(data.amount, data.rate, data.years)
        }

    })


    total_kost(amount, rate, years);
    calculateLoan(amount, rate, years);

    function calculateLoan(amo, rate, year) {
        const amortering = amo / year;
        const interest_expense = (amo * rate); // Räntekostnad
        let payment = (amortering + interest_expense).toFixed(2);

        payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // document.getElementById('per_month').innerHTML = `${payment} kr`
    }

    function total_kost(amount, rate, year) {
        let total_kost = document.getElementById('total_kost')
        total_kost.innerHTML = '';
        let amorter = (amount / (year / 12));
        let ret = (amount * rate);

        let sum = Math.round(amorter + ret + amount).toFixed(2);

        sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // total_kost.innerHTML = `${sum} kr`;
    }
    annuitet(amount, rate, years)
    function annuitet(amount, rate, year) {
        let pow = Math.pow(1 + rate, year);
        let result = amount * (rate * pow) / (pow - 1);
        const total_credit_amount = (result * year).toFixed(2) // Totalt kreditbelopp

        document.getElementById('per_month').innerHTML = `${Math.round((result + Number.EPSILON) * 100) / 100} kr`;
        document.getElementById('total_kost').innerHTML = `${(total_credit_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

        const total_interest_expense = (total_credit_amount - amount).toFixed(2) // Total räntekostnad
        const amortering_percentage = (amount / total_credit_amount * 100);
        const interest_percentage = (total_interest_expense / total_credit_amount * 100);

        let total_month = document.getElementById("total_month");
        total_month.innerHTML = `${year} månader`;

        let total_interest = document.getElementById("total_interest");
        total_interest.innerHTML = total_interest_expense;


        let amortization = document.querySelector(".am_co-progress .amortization");
        amortization.style.width = Math.round(amortering_percentage) + '%';
        amortization.innerHTML = Math.round(amortering_percentage) + '%';

        let interest = document.querySelector(".am_co-progress .interest");
        interest.style.width = Math.round(interest_percentage) + '%';
        interest.innerHTML = Math.round(interest_percentage) + '%';
    }

})

// let resultal = startkapital * (1 + ((ränta i procent / period) * 1/100) period * antal år) 9600027

/**
 * Annuitet och räkneexempel:-
 * L = lånebelopp från början.
* r = ränta i decimalform, antingen årsränta eller månadsränta. Vid beräkning av månadsränta divideras årsräntan med 12.
* n = antalet inbetalningstillfällen.
* L * (r(1+r)pwr(n)/(1+r)pwr(n) -1) = result;
*/