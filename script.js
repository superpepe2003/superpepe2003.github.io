if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg=>console.log('Registro exitoso de SW',reg))
    .catch(err=>console.warn("Error al tratar de registrar el SW", err))
}

$('.header a').on('click', function(e){
    console.log(this.hash)
    if(this.hash !==''){
        e.preventDefault();
        const hash=this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },
        800
        );
    }
    if(this.hash=='#bienvenido'){
        var ancho=$(window).width();
        var a = (ancho - $('#mensaje').width())/2;
            $('#mensaje').animate({"left": a}, 
            1000, 
            "linear");        
    }      
});