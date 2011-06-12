
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

function sanitizePrice(price){
	price = price.replace("$","");
	price = price.replace(",","");	
	return price;
}

function addLocalCurrency(item,exRate,styleName) {
    style  = "pricexch";
    nodeName = "span";
    
    if(styleName) {
        style = styleName;
    }

    if(item != null) {
      
      val = sanitizePrice(item.innerText);
          
      cops = val * exRate;    
      result = cops.toFixed(3);
      result = currency(result);
 
        if(item.nodeName != "TD" && val  > 0) {
            nodeName = item.NodeName;
            
            item.insertAdjacentHTML('afterEnd', ' <'+ nodeName + ' class ="' +style +'">($'+ result + ')</'+nodeName+'>');
        }

       
    }

}


function showLocalCurrency(exchangeRate) {
 
    var item = null;
    var len = null;
    see_price_in_cart =  document.getElementsByClassName("buyAction olpBlueLink")[0];
    
    // only interested in the first one
    // TODO: Price on cart. It only works if you hit twice in the button.
    if (see_price_in_cart) {

        see_price_in_cart.addEventListener("click", function() {   
            
            element = document.getElementsByClassName("pricelarge")[0]; 

            addLocalCurrency(element,exchangeRate,"priceLarge");
                                                                   
           },   false)

    }

    // Multiple product options swatchOuter

   
  /*  item = null;
       
    elements = document.getElementsByClassName("product");
    for(var j = 0; j < elements.length; j++) {
       alert(elements[j]);
       elements[j].addEventListener("DOMSubtreeModified", function() {   
           
           element = document.getElementsByClassName("pricelarge")[0]; 
           addLocalCurrency(element,exchangeRate,"priceLarge");
                                                                   
        },   false);
    }*/

                        
  
     
    
  /*  for(var i=0; i<len; i++) {
        swatchOuter[i].addEventListener("click", function() {   
            

            elements = document.getElementsByClassName("priceLarge");
            for(var j = 0; j < elements.length; j++) {
              //  alert(elements[j]);
                addLocalCurrency(elements[j],exchangeRate,"priceLarge");
            }

                        
        },   false);
        
        swatchOuter[i].addEventListener("mouseout", function() {   
            

            elements = document.getElementsByClassName("priceLarge");
            for(var j = 0; j < elements.length; j++) {
              //  alert(elements[j]);
                addLocalCurrency(elements[j],exchangeRate,"priceLarge");
            }

                        
        },   false);
                                                                        

    /*     swatchOuter[i].addEventListener("mouseout", function() {   
            
            element = document.getElementsByClassName("pricelarge")[0]; 

            addLocalCurrency(element,exchangeRate,"priceLarge");
                                                                   
        },   false);*/
	    
     
 //   }
    


  if(exchangeRate) {  
      var priceLarge  = document.getElementsByClassName("pricelarge");
      var price = document.getElementsByClassName("price");
      var priceRed = document.getElementsByClassName("red t14");

     
      item = null;
      len=price.length;
      for(var i=0; i<len; i++) {
	  itemx  = price[i];
	  addLocalCurrency(itemx,exchangeRate);
      }

      len = priceRed.length;
      for(var i=0; i<len; i++) {
	  itemx  = priceRed[i];
	  addLocalCurrency(itemx,exchangeRate);
      }
 
    if(priceLarge) {
        addLocalCurrency(priceLarge.item(),exchangeRate,"priceLarge");
    }
    
  }
};

chrome.extension.sendRequest({'action' : 'getRate'}, showLocalCurrency);
