
var BudgetController = (function(){
    
    
})();



var UiController = (function(){
    
    return {
        
        getInfos:function(){
            
            return{
            type : document.getElementById('slct').value,
            desc : document.getElementById('desc').value,
            money: document.getElementById('floss').value
                };
        }
        
    };
    
    
})();



var controller = (function(one,two){
    
    var addItem = function(){
        
        var twacha = two.getInfos();
        console.log(twacha);
      
        
        
        
        
        
    }
    
    
    document.getElementById('valider').addEventListener('click',addItem);
    
    
    
    document.addEventListener('keypress',function(e){
        
        if (e.keyCode == 13){
            
            
            
        }
        
        
        
    });
    
    
    
    
    
    
})(BudgetController,UiController);