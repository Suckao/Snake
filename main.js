/* Window.Onload est une fonction qui s'applique à l'ouverture de la page. On décrit la fonction
dans function() { 'ICI MON CODE ' }  */
window.onload = function () {
    /*Canvas est un élément HTML 5 qui permet de dessiner à l'intérieur.
    ici on le créé avec la fonction document.createElement('NOM DE L'ELEMENT HTML') 
    le "document" fait référence à l'objet html. */

    /* On définit une variable qui sera le 'context' de notre élément. Un context, c'est ce dans quoi
    on va 'dessiner', en somme là on dit que dans le canvas, il y a un élément en 2d qui va être
    créé */

    /*On définit une variable de délais qui s'exprime en milliseconde. Cette dernière sera utilisée
    pour "rafraichir" le canvas et donner un mouvement à notre élément */
    let delay = 100;

    let snakee;

    const canvasWidth = 900;
    const canvasHeight = 600;

    const blockSize = 30;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let mouveSpeed = 100

    init();
    //Fonction d'initialisation du projet. Elle se lance au début
    function init() {

        /* Ici on définit la taille de l'élement */

        /* Via .style on a accès aux propriétés CSS. Ici on lui ajoute une bordure, on écrit donc
        .style.border = "ON DEFINIT LA BORDURE". On aurait pu voir .style.background ou
        .style.borderRadius */

        /* Ici on accroche l'élément HTML créé a un autre élément HTML écrit en dure dans notre index.html
        via la fonction .appenChild('ELEMENT A ACCROCHER'). Pour cet exemple, on l'accroche au Body, mais
        on aurait pu l'accrocher à un autre élément. Sans ça, notre canvas ne serait relié à aucun élément
        du document HTML, et donc, ne s'afficherait pas ! */
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid black";
        document.body.appendChild(canvas);

        snakee = new snake([[6,4], [5,4], [4,4]], mouveSpeed)

        refreshCanvas();
    }

    //Fonction qui va permettre de faire bouger l'élément en rafraichissant le canvas sur un délais
    function refreshCanvas() {
        /* dans le .fillStyle = 'COULEUR DE NOTRE CONTEXT' */

        /* Le fillRect contient les propriété de placement et de taille de notre context. On insére dans
        la fonction les 4 élément dans cet ordre : 
    
        positionnement axe X - positionnement axe Y - Largeur en px - hauteur en px 
    
        */
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        snakee.draw();
        snakee.move();

        
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position) 
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, 30, 30)
    }

    function advanced(ctx, position, mouveSpeed)
    {
        let x = position[0] * blockSize + mouveSpeed;
        let y = position[1] * blockSize;
        console.log(x);
        ctx.fillRect(x,y,blockSize,blockSize);
    }

    function snake(body, mouveSPeed)
    {
        this.body = body;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = 'red';
            for (let i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            };
            ctx.restore();
        }
        this.move = function()
        {
            ctx.save();
            for(let i = 0; i < this.body.length; i++) {
                advanced(ctx, this.body[i], mouveSPeed);
            };
            ctx.restore();
        }
    }
}