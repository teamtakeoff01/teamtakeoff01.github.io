(function() {

    var product = $(".grofers-anything");
    var productIndex = -1;
    
    function showNextProduct() {
        ++productIndex;
        product.eq(productIndex % product.length)
            .css({
                opacity: 0,     
                display:'inline-block'
            }).animate({opacity:1},300)
            // .fadeIn(300)
            .delay(3000)
            .css({
                opacity: 1,
                display: 'inline-block'     
            })
            // .animate({opacity:0, display:'none'},1200,showNextProduct);
            .fadeOut(1200, showNextProduct );
    }
    
    showNextProduct();
    
})();

(function(){
    var auth_key;
    var request = $.ajax({
            url: 'activeMerchants.php',
            type : 'POST',
            success : function(data){
                auth_key = data.auth_key;
                $.ajax({
                url: 'https://api.grofers.com/v2/search/merchants/?lat=18.9750&lon=72.8258&start=0&next=1',
                headers: {'auth_key': auth_key, 'dashboard': 'True'},
                type: 'GET',
                dataType: 'json',
                success: function(activeData){
                    var merchants = activeData.merchants;
                    var active_merchants = [];
                    for(var i = 0; i<merchants.length; i++){ 
                        active_merchants[i] = merchants[i].merchant_name; 
                    }
                    for(var j=0; j<active_merchants.length; j++){
                        each_merchant = active_merchants[j];
                        $('#merchantList').append($("<li id="+j+">"+j+".) " + each_merchant + "</li>" ));
                    }
                }
            });
            }
        });

})();
