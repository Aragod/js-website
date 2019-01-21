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

        hh: function () {
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



    var addItem = function () {

        var twacha = two.getInfos();
        
        if(twacha.desc !='' && twacha.money !=''){
        var newItem = BudgetController.addItem(twacha.type, twacha.desc, twacha.money);
        two.addlistItems(newItem, twacha.type);
        two.clearThaShit();
        }
       

    }




    return {
        init: function () {

            setupEventListeners();

        }
    }




})(BudgetController, UiController);

controller.init();
