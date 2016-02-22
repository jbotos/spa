(function()
{
    var App = function()
    {
        this.renderProduct = null;
        this.init();
    };
    App.prototype = {
        init : function()
        {
            this.fetchTemplates();
        },
        fetchTemplates : function()
        {
            var _this = this;
            $.ajax({
                url: '/templates/product.hbs',
                dataType: 'text',
                method: 'GET',
                success: function(text)
                {
                    _this.renderProduct = Handlebars.compile(text);
                    _this.fetchData();
                }
            });
        },
        fetchData : function()
        {
            var _this = this;
            $.get('/data.json', {}, function(data)
            {
                _this.renderProducts.apply(_this, [data]);
            }, 'json');
        },
        renderProducts : function(data)
        {
            $('#products').empty();
            for (var i = 0; i < data.length; i++) {
                var product = data[i];
                $('#products').append(this.renderProduct(product));
            }
        },
        renderOverlay : function(product)
        {
            //
        }
    };

    new App();
})();
