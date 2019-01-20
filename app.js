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

    var data = {

        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        }

    };
    
    return {
        
        addItem : function(type,desc,val){
            
            var newItem , id;
            
            id = 0;
            
            if(type == 'inc')
                newItem = new Income(id,desc,val);
            else if(type=='exp')
                newItem = new Expense(id,desc,val)
            
            data.allItems[type].push(newItem);
            return newItem;
        },
        
         hh : function(){
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
        }

    };


})();



var controller = (function (one, two) {

    var setupEventListeners = function () {
        document.getElementById('valider').addEventListener('click', addItem);



        document.addEventListener('keypress', function (e) {

            if (e.keyCode == 13) {

            }

        });

    };



    var addItem = function () {

        var twacha = two.getInfos();
        var newItem = BudgetController.addItem(twacha.type,twacha.desc,twacha.money);


    }




    return {
        init: function () {

            setupEventListeners();

        }
    }




})(BudgetController, UiController);

controller.init();