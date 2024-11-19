import { ITransactions } from "@/api/ITransactions";

function calculateBalance(entries : any) {
    let runningTotal : number = 0;
    
    entries.forEach((entry : ITransactions) => {
        runningTotal += (entry.amount * (entry.isPayment ? -1 : 1));
    });

    return runningTotal;
}

export default calculateBalance;