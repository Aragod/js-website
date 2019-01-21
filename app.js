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

            id = 0;

            if (type == 'inc')
                newItem = new Income(id, desc, val);
            else if (type == 'exp')
                newItem = new Expense(id, desc, val)

            data.allItems[type].push(newItem);
            return newItem;
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



var UiController = (function () {

    return {

        getInfos: function () {

            return {
                type: document.getElementById('slct').value,
                desc: document.getElementById('desc').value,
                money: document.getElementById('floss').value
            };
        },

        addlistItems: function (obj, type) {

            var html, newHtml, div;

            if (type == 'inc') {

                div = 'iii';
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%descreption%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>'
            } else if (type == 'exp') {

                div = 'eee'
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%descreption%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%descreption%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.getElementById(div).insertAdjacentHTML('beforeend', newHtml);

        },

        clearThaShit: function () {

            document.getElementById('desc').value = '';
            document.getElementById('floss').value = '';

        }

    };




})();



var controller = (function (one, two) {

    var setupEventListeners = function () {
        document.getElementById('valider').addEventListener('click', addItem);



        document.addEventListener('keypress', function (e) {

            if (e.keyCode == 13) {
                addItem();
            }

        });

    };
    
    var updateBudget = function(){
        one.calculateBudget();
        var ThaWholeShit = one.getbudget();
        
        
        
    }



    var addItem = function () {

        var twacha = two.getInfos();
        
        if(twacha.desc !='' && twacha.money !=''){
        var newItem = BudgetController.addItem(twacha.type, twacha.desc, twacha.money);
        two.addlistItems(newItem, twacha.type);
        two.clearThaShit();
        }
       
        updateBudget();

    }




    return {
        init: function () {

            setupEventListeners();

        }
    }




})(BudgetController, UiController);

controller.init();
