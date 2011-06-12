const MAX_CURRENCIES = 15;
const MIN_CURRENCIES = 2;
var count_currencies = 0;

function init()
{
  
    var selected_currency = localStorage.getItem('currency');
    

    var select_currency = document.createElement('select');
    select_currency.id = 'currency' ;
    select_currency.name = 0;
    select_currency.addEventListener('keypress', onCurrencyChange, false);
    select_currency.addEventListener('change', onCurrencyChange, false);
    
    for (var currency in currenciesJSON)
    {
        var option = document.createElement('option');
        option.value = currency;
        option.text = currenciesJSON[currency].name;
        select_currency.appendChild(option);
    }

    var td_right = document.createElement('td');
    td_right.setAttribute('class', 'paddingtd');
    td_right.appendChild(select_currency);
    
    var tr = document.createElement('tr');
    tr.id = 'trCurrency' ;
    tr.appendChild(td_right);

    var container = document.getElementById('currency_table');
    container.appendChild(tr); 
    //alert(currency);
    setSelectedIndex(select_currency.id,currency);
   
}

function setSelectedIndex(s, value)
{
  //  alert(s);
    var select = document.getElementById(s);
    //alert(select.length);

    for (i = 0; i< select.options.length; i++)
    { 
        if (select.options[i].value == value)
        {
            select.options[i].selected = true;
            break;
        }
    }
   /// alert(value);
   // alert(select.options[i].value);
}
function onCurrencyChange(event)
{
    var option = event.target.options[event.target.selectedIndex];
    localStorage.setItem(event.target.id, option.value);
    update(event.target.name);
}