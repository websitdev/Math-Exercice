//function for display the number in the input

function PrintNumber(e){

    document.querySelector('input').value += e;

}

//function to deleted a number

function Sub(){

    var input = document.querySelector('input');

    if(input.value.length === 0){

        //do nothing

    }else{

        input.value = input.value.substring(0, input.value.length-1);

    }

}

//function to create aleatory operation

var progress = document.querySelector('progress');

var lives = 3;

var level = 0;

var op;

var calculations;

function CreateCalc(){

    //define operation aleatory

    var op = ['+', '-', '*', '/'];

    operation = op[Math.trunc(Math.random()*4)];

    //define two numbers aleatory

    var first;

    var twice;

    //define the level of the op

    switch (operation) {

        case '*':

            first = Math.trunc(Math.random()*10);

            twice = Math.trunc(Math.random()*(10+(2*level)));

            break;

        case '/':

            first = Math.trunc(Math.random()*4+level);

            twice = Math.trunc(Math.random()*(4));

            //check if calculations are 0

            if(first === 0){

                first = 2;

            }

            if(twice === 0){

                twice = 2;

            }

            //check if the calclulations are even or odd

            if(first % 2 === 1){

                first++;

            }

            if(twice % 2 === 1){

                twice++;

            }

            //check if twice is bigger than first

            if(twice > first){

                let a = twice;

                twice = first;

                first = a;

            }

            //check for the result can't be with decimal

            if(eval(first/twice).toString().includes('.')){

                first += 2;

            }

            break;

        case '-':

            first = Math.trunc(Math.random()*(20*(level === 0 ? 1 : level)));

            do{

                twice = Math.trunc(Math.random()*(20*(level === 0 ? 1 : level)));

            }while((first - twice) < 0);

            break;

        default:

            first = Math.trunc(Math.random()*(40*(level === 0 ? 1 : level)));

            twice = Math.trunc(Math.random()*(40*(level === 0 ? 1 : level)));

            break;

    }

    //create the calculations

    calculations = `${first} ${operation} ${twice}`;

    //display the result to span

    document.getElementById('calcul').textContent = calculations;

}

//call the function for the first calclution

CreateCalc();

//function to send the calcul

document.getElementById('send-calc').addEventListener('click', ()=>{

    //function to take of a live

    function LessLives(){

        //set the animation

        document.getElementById('lives').style.animation = 'oof 3s 1';

        document.getElementById('less-lives').style.animation = 'opAnimation 3s 1';

        lives--;

        //display lives of the player

        document.getElementById('lives').textContent = lives;

        //reset the

        setTimeout(()=>{

            document.getElementById('lives').style.animation = '';

            document.getElementById('less-lives').style.animation = '';

        }, 3001);

    }

    //function if the user loose

    function Loose(){

        var random_msg = ['Sorry :[', 'Not today', 'Miss !', 'Oops, its the wrong way', 'Not yet', 'Later, maybe...', 'Almost ;)'];

        document.querySelector('.loose-msg').textContent = random_msg[Math.trunc(Math.random()*random_msg.length)];

        document.querySelector('.loose-msg').style.display = 'block';

        for (let i = 0; i < 12; i++) {

            document.querySelectorAll('.num')[i].disabled = true;

            document.getElementById('send-calc').disabled = true;

        }

    }

    //function to win and pass level

    function Win(){

        progress.value += 1;

        if(progress.value === progress.max){

            //met un message

            document.querySelector('.head').children[0].textContent = `Wow, you are level : ${level+1}`;

            //reset le msg au bout de 4s;

            setTimeout(()=>{

                document.querySelector('.head').children[0].textContent = 'Math Exercice';

            }, 4000);

            //set the progress bar at himself*2

            progress.max*=2;

            level++;

            //display the level of the player

            document.getElementById('level').innerText = level;

            //set the animation

            document.getElementById('level').style.animation = 'win 3s 1';

            document.getElementById('next-level').style.animation = 'opAnimation 3s 1';

            //reset l'animation au bout de 3s

            setTimeout(()=>{

                document.getElementById('level').style.animation = '';

                document.getElementById('next-level').style.animation = '';

            }, 3001);

        }else{

            //do nothing

        }

        //display result progress bar

        document.getElementById('value-pro').textContent = progress.value;

        document.getElementById('max-pro').textContent = progress.max;

    }

    //rest of the function

    var input = document.querySelector('input');

    if(input.value.length === 0){

        //check the value

        alert('You did not enter a value');

    }else{

        //check the calcul

        if(eval(input.value) === eval(calculations)){

            Win();

        }else{

            LessLives();

            if(lives < 0){

                Loose();

            }

        }

    }

    //pass calc

    CreateCalc();

    input.value = '';

});

//create the number pad

(function(){

    //create the tr elements

    for(let i = 0; i < 4; i++){

        document.getElementById('pad').append(document.createElement('tr'));

    }

    //create the td elements

    let lign = -1;

    for(let i = 1; i < 10; i++){

        let number = document.createElement('button'); number.setAttribute('class', 'num'); number.setAttribute('onclick', `PrintNumber(${i})`); number.textContent = i;

        if((i-1) % 3 === 0){

            lign += 1;

        }

        document.getElementById('pad').children[lign].append(number);

    }

    //create the zero and the > pad

    var choice = ['Sub()', '>', `PrintNumber(${0})`, 0];

    for(let i = 0; i < 3 ;i++){

        if(i === 1){

            i++;

        }

        let number = document.createElement('button'); number.setAttribute('class', 'sub'); number.setAttribute('onclick', choice[i]); number.textContent = choice[i+1];

        document.getElementById('pad').children[3].append(number);

    }

})();
