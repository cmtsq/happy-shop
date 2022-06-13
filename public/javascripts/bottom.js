$(function(){
[...document.querySelectorAll(".bottom-nav")].find((x, y) => {
    x['onclick'] = () => {
        var href = ['index.html', 'cart.html', 'my.html'];
        window.location.href = href[y];
        [...document.querySelectorAll(".bottom-nav")].find(d => {
            d.style.color = "black";
        });    
    }
});
})