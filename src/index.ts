import { TransactionFromApi } from './interfaces/TransactionFromApi';
import { TransactionNormalized } from './interfaces/TransactionNormalized';

const tBodyElement = document.getElementById("payments-tbody");

async function getTransactionsFromApi(): Promise<unknown[]> {
    try{
        const fetchResponse = await fetch('https://api.origamid.dev/json/transacoes.json');
        console.log(fetchResponse);
        const responseJson = await fetchResponse.json();
        console.log(responseJson);
        return responseJson;
    }catch(err){
        console.log(err);
        throw new Error();
    }
}

function isTransactionFromApi(value: unknown, key: keyof TransactionFromApi): value is TransactionFromApi {
    return value && typeof value === 'object' && key in value ? (true) : (false);
}


function isValidTransactionNormalized<T>(value: unknown, keyNormalized: keyof TransactionNormalized): value is T {
    return value && typeof value === typeof keyNormalized ? (true) : (false);
}


function getNormalizedTransactions(unknownTransactions: unknown[]): TransactionNormalized[] {
    const transactionsNormalized: TransactionNormalized[] = [];
    unknownTransactions.forEach((unknownTransaction) => {

        if (isTransactionFromApi(unknownTransaction, 'Cliente Novo')) {
            const transactionFromApi = unknownTransaction;

            if (isValidTransactionNormalized<number>(transactionFromApi['Cliente Novo'], 'newClient') &&
                isValidTransactionNormalized<string>(transactionFromApi['Nome'], 'clientName') &&
                isValidTransactionNormalized<Date>(transactionFromApi['Data'], 'paymentDate') &&
                isValidTransactionNormalized<string>(transactionFromApi['Email'], 'email') &&
                isValidTransactionNormalized<string>(transactionFromApi['Forma de Pagamento'], 'paymentOption') &&
                isValidTransactionNormalized<number>(transactionFromApi['ID'], 'id') &&
                isValidTransactionNormalized<string>(transactionFromApi['Status'], 'status') &&
                isValidTransactionNormalized<number>(transactionFromApi['Valor (R$)'], 'price')
            ) {
                transactionsNormalized.push({
                    clientName: transactionFromApi['Nome'],
                    email: transactionFromApi['Email'],
                    id:  transactionFromApi['ID'],
                    newClient: transactionFromApi['Cliente Novo'],
                    paymentDate: transactionFromApi['Data'],
                    paymentOption: transactionFromApi['Forma de Pagamento'],
                    price: Number(transactionFromApi['Valor (R$)']),
                    status: transactionFromApi['Status'],
                });
            }
        }

    })
    return transactionsNormalized;
}

async function showNormalizeTransactions(){
    const unknownTransactions = await getTransactionsFromApi();
    console.log('unknown: ', unknownTransactions);
    const transactionsNormalized =  getNormalizedTransactions(unknownTransactions);
    console.log('transactionsNormalized: ', transactionsNormalized);
}

showNormalizeTransactions();

function fillPaymentsTable() {
    // if(tBodyElement){
    //     const 
    // }
}
