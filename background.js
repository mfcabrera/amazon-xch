

/*      
        fetch the currency from the server if it is not in the local storage
*/

function fetchCurrency(callback) {
    
    var invocation = new XMLHttpRequest();
    var url = 'http://download.finance.yahoo.com/d/quotes.csv?e=.csv&f=l1&s=USDCOP=X';
    
    
    invocation.onreadystatechange = function(data) {
        if (invocation.readyState == 4) {
            if (invocation.status == 200 ) {
                var data = invocation.responseText;
              localStorage.setItem(createDateString(),data);
                callback(data);                
            } else {               
                callback(null);
            }
        }
    }       
    invocation.open('GET', url, true);
    invocation.send();
};
      
function createDateString(){
    var d = new Date();
    return d.getFullYear() + "" + d.getMonth() + "" + d.getDate() ;      
};