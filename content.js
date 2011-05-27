
// source http://jcesar.artelogico.com/2010/08/formato-de-moneda-en-javascript/ (MIT Licence)
function currency(value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
}


function addLocalCurrency(item,exRate) {
    
    if(item != null) {
      
      val = item.innerText;
     // alert(val);
      val = val.replace("$","");
      cops = val * exRate;    
      result = cops.toFixed(3);
      result = currency(result);
 
        if(item.nodeName != "TD" && val  > 0) {
            item.insertAdjacentHTML('afterEnd', ' <b class ="pricexch">($'+ result + ')</b>');
        }

       
    }

}


function showLocalCurrency(exchangeRate) {
    //alert('showLocalCurrency');

  if(exchangeRate) {  
    var priceLarge  = document.getElementsByClassName("pricelarge");
    var price = document.getElementsByClassName("price");
     
      item = null;
      var len=price.length;
      for(var i=0; i<len; i++) {
	  itemx  = price[i];
	  addLocalCurrency(itemx,exchangeRate);
      }  
 
          
          /* if(price != null) { 
    
      var item = price.item();   
      value = item.innerText;        
      value = value.replace("$","");
      cops = value * exchangeRate;    
      result = cops.toFixed(3);
      result = currency(result);      
      item.insertAdjacentHTML('afterEnd', ' <b class ="price">(COP $ '+ result + ')</b>');
    
    } */
    
    if(priceLarge != null) {
      var itemLarge = priceLarge.item();   
      valueLarge = itemLarge.innerText;
      valueLarge = valueLarge.replace("$","");
      copsLarge = valueLarge * exchangeRate;
      resultLarge = copsLarge.toFixed(3);
      resultLarge = currency(resultLarge);
      itemLarge.insertAdjacentHTML('afterEnd', ' <b class="price">(COP $ '+ resultLarge + ')</b>');
    }
    
  }
};

chrome.extension.sendRequest({'action' : 'getRate'}, showLocalCurrency);
