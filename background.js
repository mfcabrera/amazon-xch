
function getRate(from, to, sendResponse)
{

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://finance.yahoo.com/d/quotes.csv?e=.csv&f=l1&s=" + from + to + "=X", true);
    xmlhttp.onload = 
    //function()   { sendResponse({currency_rate: xmlhttp.responseText}); }
    xmlhttp.send();
  

    //return google_finance_result;

}



