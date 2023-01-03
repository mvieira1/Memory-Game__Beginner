
document.addEventListener('DOMContentLoaded', () => {

    //Vou fazer um array de objects {name: name, img: imagePath}

    const cards = [
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ];

    //Shuffle the cards para que, sempre que se faça um novo load da página, a ordem das cards seja aleatória

    //array.sort(comparisonFunction) <=>
    //array.sort((a,b) => operação). A função sort recebe sempre 2 argumentos/elementos, entre os quais faz a comparação, e espera que a operação retorne um valor positivo ou negativo, de forma a decidir se deve mover o elemento para cima ou para baixo no array.

    cards.sort((obj1, obj2) => 0.5 - Math.random());
    //Math.random() gera um número aleatório no intervalo [0,1], portanto, quando faço 0.5 - Math.random(), o resultado também é aleatório e a posição de cada card no array cards também.

    console.log(cards);

    //Para cada card no array de cards, vou adicionar à grid, uma card virada ao contrário (isto é, a imagem da path ../images/blank.png), ou seja, vou adicionar 12 cards viradas ao contrário à grid

    const grid = document.getElementById('grid');

    for(let i=0; i<cards.length; i++){
        const img = document.createElement('img');
        img.setAttribute('src', 'images/blank.png');
        img.style.cursor = 'pointer';
        img.setAttribute('id', i); //necessário para que depois possa 'virar' a card e mostrar a card.img correspondente
        img.addEventListener('click', flipCard);
        grid.appendChild(img);
    };

    //Para cada card, no array cards, quando o event='click' é disparado, a função flipCard é notificada e um eventObject, com propriedade relevantes para a caracterização do event, é produzido. A card é, então, flipped, i.e., a imagem do array cards correspondente àquela posição substitui a imagem do verso da card (blank.png), originalmente lá

    let flippedCardsNames = [];
    let flippedCardsIds = [];

    function flipCard(eventObject){
        //console.log(eventObject);
        //console.log(eventObject.target);
        //console.log(eventObject.target.id);
        eventObject.target.setAttribute('src', cards[eventObject.target.id].img);
        flippedCardsNames.push(cards[eventObject.target.id].name);
        flippedCardsIds.push(eventObject.target.id);
        if(flippedCardsNames.length === 2){
            setTimeout(evaluateMatch, 600); //passado 800ms, avaliar se é um match
            //este compasso de espera é importante pq, caso contrário, não teríamos tempo de ver a segunda card
        }
    };

    let score = document.getElementById('score');
    let imgs = document.querySelectorAll('img'); //como não vou adicionar mais <img> tags à grid, não há problema em usar o método .querySelectorAll, que retorna uma NodeList estática, pq não vamos adicionar mais nós, de qualquer das formas...

    function evaluateMatch(){
        //se os ids forem iguais, clicamos na mesma card!
        if(flippedCardsNames[0] === flippedCardsNames[1] && flippedCardsIds[0] === flippedCardsIds[1]){
            alert('you selected the same card!');
            //e ela volta a virar
            imgs[flippedCardsIds[0]].setAttribute('src', 'images/blank.png');
            
        }else if(flippedCardsNames[0] === flippedCardsNames[1] && flippedCardsIds[0] !== flippedCardsIds[1]){
            alert('you found a match!');
            //as cards desaparecem (well, not really... a imagem da card é que é substituída por uma imagem de background branco)
            imgs[flippedCardsIds[0]].setAttribute('src', 'images/white.png');
            imgs[flippedCardsIds[1]].setAttribute('src', 'images/white.png');
            //o event='click' é removido, de forma a não original resultados errôneos
            imgs[flippedCardsIds[0]].removeEventListener('click', flipCard);
            imgs[flippedCardsIds[1]].removeEventListener('click', flipCard);
            //e o cursor retorna ao estilo original (não faz sentido continuar pointer)
            imgs[flippedCardsIds[0]].style.cursor = 'auto';
            imgs[flippedCardsIds[1]].style.cursor = 'auto';
            
            //atualizar o score, somando + 1
            score.innerHTML = Number(score.innerHTML) + 1;
            
            if(Number(score.innerHTML) === 6){
                alert('You won the game!');
            }

        }else{
            //virar as cards outra vez ao contrário
            imgs[flippedCardsIds[0]].setAttribute('src', 'images/blank.png');
            imgs[flippedCardsIds[1]].setAttribute('src', 'images/blank.png');
        };

        flippedCardsNames = [];
        flippedCardsIds = [];
    };

});
