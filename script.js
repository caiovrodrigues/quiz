const perguntaEl = document.querySelector('.quiz-area h3');
const alternativasEl = document.querySelector('.answers-area');

document.querySelector('.results').style.display = 'none';

let i = 0;
let acertos = 0;

function nextQuestion(){
    alternativasEl.innerHTML = '';
    perguntaEl.innerHTML = questions[i].pergunta;
    for(let p in questions[i].alternativas){
        const div = document.createElement('div');
        div.setAttribute('class', 'answer');
        div.setAttribute('data-key', +p+1);
        
        div.addEventListener('click', (e) => {
            const key = e.target.closest('.answer').getAttribute('data-key');
            if(key == questions[i].correta){
                acertos++;
            }
            i++;
            document.querySelector('.bar').style.width = `${i / questions.length * 100}%`;
            if(i < questions.length){
                nextQuestion();
            }else{
                showResults();
            }
        });

        div.innerHTML = `<span>${+p + 1}</span> ${questions[i].alternativas[p]}`;
        alternativasEl.append(div);
    }
}

function showResults(){
    document.querySelector('.quiz-area').style.display = 'none';
    const resultEl = document.querySelector('.results');
    resultEl.style.display = 'flex';

    resultEl.querySelector('.text').innerHTML = `${acertos < 6 ? 'Treine mais' : acertos > 8 ? 'VOCÊ É UM GÊNIO!' : 'Excelente'}`;

    resultEl.querySelector('.resultado').innerHTML = `Acertou ${((acertos / questions.length) * 100).toFixed(2).replace('.', ',')}%`;
    acertos < 6 ? resultEl.querySelector('.resultado').style.color = 'red' : acertos > 8 ? resultEl.querySelector('.resultado').style.color = 'rgb(49, 179, 37)' : resultEl.querySelector('.resultado').style.color = 'orangered';
    resultEl.querySelector('.description').innerHTML = `Você respondeu ${questions.length} questões e acertou ${acertos}`;
}

function reset(){
    acertos = 0;
    i = 0;
    document.querySelector('.quiz-area').style.display = 'block';
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.bar').style.width = `0%`;
    nextQuestion();
}

document.querySelector('button').addEventListener('click', reset);

nextQuestion();