var BudgetController = (function () {

    var Expense = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;
    };
    
      var calculateTotal = function(type) {
        var sum = 0 ;
        data.allItems[type].forEach(function(cur){
           sum = sum +parseFloat(cur.value);
            
        });
        
        data.totals[type] = sum;
    };
    
  

    var data = {

        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },
        
        budget : 0 ,
        percentege:0
        
        
        

    };

    return {

        addItem: function (type, desc, val) {

            var newItem, id;
            
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type == 'inc')
                newItem = new Income(id, desc, val);
            else if (type == 'exp')
                newItem = new Expense(id, desc, val)

            data.allItems[type].push(newItem);
            return newItem;
        },
        
        deleteItem: function(type,id) {
            
            for(var i = 0 ; i<data.allItems[type].length;i++){
                
                if (data.allItems[type][i].id === id){
                    
                    data.allItems[type].splice(i,1);
                    
                }
                
            }
        },
        
      
          calculateBudget : function(){
            
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget = data.totals.inc - data.totals.exp;
              
              if(data.totals.inc>0)
            data.percentege = Math.floor((data.totals.exp/data.totals.inc)*100);
            
        },
        
        getbudget : function(){
        
                return {
                    budget:data.budget,
                    totalInc:data.totals.inc,
                    totalExp:data.totals.exp,
                    pourcentage:data.percentege
                    
                }
        
        
        },
        
        hh : function () {
            console.log(data);

        }
    };



})();



//-------------------------------------------------------------------------


var UiController = (function () {

    return {

        getInfos: function () {

            return {
                type: document.getElementById('slct').value,
                desc: document.getElementById('desc').value,
                money:document.getElementById('floss').value
            };
        },

        addlistItems: function (obj, type) {

            var html, newHtml, div;

            if (type == 'inc') {

                div = 'iii';
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%descreption%</div><div class="right clearfix"><div class="item__value">+%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>'
            } else if (type == 'exp') {

                div = 'eee'
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%descreption%</div><div class="right clearfix"><div class="item__value">-%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%descreption%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.getElementById(div).insertAdjacentHTML('beforeend', newHtml);

        },
        
        removeThaShitFromUi : function(idUi){
             var twichiyia = document.getElementById(idUi);
             twichiyia.parentNode.removeChild(twichiyia);
            
            
        },

        clearThaShit: function () {

            document.getElementById('desc').value = '';
            document.getElementById('floss').value = '';

        },
        
        changeColor:function(){
            
            var dct = document.getElementById('slct');
            dct.addEventListener('change',function(){
              
            
                document.getElementById('desc').classList.toggle('red-focus');
                document.getElementById('floss').classList.toggle('red-focus');
                dct.classList.toggle('red-focus');
                document.getElementById('valider').classList.toggle('red');
                
               
              
          });
            
        },
        
        displayTime: function(){
            
            var dd = new Date();
            var mm = dd.getMonth() + 1;
            var mt;
            
            
            
            switch(mm){
                case 1 : mt = 'January'; break;  
                case 2 : mt = 'February';break; 
                case 3 : mt = 'March';break; 
                case 4 : mt = 'April';break; 
                case 5 : mt = 'May';break; 
                case 6 : mt = 'june';break; 
                case 7 : mt = 'july';break; 
                case 8 : mt = 'August';break; 
                case 9 : mt = 'September';break; 
                case 10: mt = 'october';break; 
                case 11: mt = 'November';break; 
                case 12: mt = 'December';break; 
                default:mt='error';
                    
            }
            
            
            document.getElementById('time').textContent =' (' +  mt + ' / ' + dd.getFullYear() + ')';
            
            
        },
        
        displayThaShit : function(obj){
            if(obj.budget>0)
            document.getElementById('wholeBudget').textContent ='+' + obj.budget;
            else
             document.getElementById('wholeBudget').textContent =obj.budget;   
            if(obj.totalInc>0)
            document.getElementById('income').textContent ='+' + obj.totalInc;
            else
             document.getElementById('income').textContent =obj.totalInc;   
            if(obj.totalExp>0)
            document.getElementById('expenses').textContent = '-' + obj.totalExp;
            else
             document.getElementById('expenses').textContent =obj.totalExp;  
            
            if(obj.totalExp>0 && obj.totalInc>0)
            document.getElementById('per').textContent = obj.pourcentage + '%';
            else
            document.getElementById('per').textContent = 0;
            
            
        }
        
    
        
        

    };

    
    
    


})();


//-------------------------------------------------------------------------


var controller = (function (one, two) {

    var setupEventListeners = function () {
        document.getElementById('valider').addEventListener('click', addItem);



        document.addEventListener('keypress', function (e) {

            if (e.keyCode == 13) {
                addItem();
            }

        });
        
        document.getElementById('bigOne').addEventListener('click',deleteThaShit);

    };
    
    var updateBudget = function(){
        one.calculateBudget();
        var ThaWholeShit = one.getbudget();
        two.displayThaShit(ThaWholeShit);
        
        
        
    }



    var addItem = function () {

        var twacha = two.getInfos();
        
        if(twacha.desc !='' && twacha.money !=''){
        var newItem = one.addItem(twacha.type, twacha.desc, twacha.money);
        two.addlistItems(newItem, twacha.type);
        two.clearThaShit();
        document.getElementById('desc').focus(); 
        }
       
        updateBudget();
        

    }

    var deleteThaShit = function(event) {
      var itemId , splitId , type , id ;
        
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        splitId = itemId.split('-');
        type = splitId[0];
        id = parseInt(splitId[1]);
       
        
        one.deleteItem(type,id);
        two.removeThaShitFromUi(itemId);
        updateBudget();
        
        
    };


    return {
        init: function () {

            setupEventListeners();

        }
    };




})(BudgetController, UiController);

controller.init();
UiController.displayTime();
UiController.changeColor();
