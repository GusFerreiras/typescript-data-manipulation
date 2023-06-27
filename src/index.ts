import {Transaction} from './interfaces/Transaction';

const tBodyElement = document.getElementById("payments-tbody");

async function getTransactions(): Promise<unknown[]>{
    const fetchResponse = await fetch('https://api.origamid.dev/json/transacoes.json');
    const responseJson = await fetchResponse.json();
    return responseJson;
}

function normalizeTransactions(transactions: unknown[]):Transaction[]{
    
    const transactionsNormalized:Transaction[] = transactions.map((transaction)=>{
        
        return transaction as Transaction;
    });

    return transactionsNormalized;
}

function fillPaymentsTable(){
    // if(tBodyElement){
    //     const 
    // }
}
