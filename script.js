/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er');
  play();
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
  //Telja rétt svör og telja spurningar sem lagðar hafa verið fyrir
  let correct = 0;
  let question_count = 0;
  const start = new Date();

  do {
    question_count+=1;
    correct += ask();

  } while(question_count < GAMES_TO_PLAY);

  //Reikna tíma og meðalfjölda.
  const end = new Date();
  const time = (end - start)/1000;
  const avg = (correct/time).toFixed(2);

  alert('Þú svaraðir '  + correct + ' af 10 dæmum rétt á ' + time + ' sekúndum  \n Meðalrétt svör á sekúndu eru ' + avg);
  quit();
}
/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {

  //Fáum fjögurra staka fylkið quest með öllu til að smíða spurninguna.
  const quest = getQuestion();
  rettSvar = quest.pop();
  const svar = prompt('Hvað er ' + quest.pop() + quest.pop() + quest.pop());
  // Ef ýtt var á cancel
  if(svar===null){
    alert('Hætt í leik');
    quit();
  }

  const psvar = parseInt(svar);

  if (psvar === rettSvar){
    return 1;
  }else{
    return 0;
  };
}

// Fall sem skilar fylki með tveimur tölum, tvíundarvirkja og rétta svarinu.
function getQuestion(){
    const teg = randomNumber(0,3);
    //const teg = 3;
    const numbers = [];

//* - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
    if (teg===0) {
      numbers.push(randomNumber(1,100));
      numbers.push('+');
      numbers.push(randomNumber(1,100));
      numbers.push(numbers[0] + numbers[2]);
      return numbers;
    }

//* `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
    if (teg===1) {
      numbers.push(randomNumber(1,100));
      numbers.push('-');
      numbers.push(randomNumber(1,100));
      numbers.push(numbers[2] - numbers[0]);
      return numbers;
    }

// `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
  if (teg===2) {
    numbers.push(randomNumber(1,10));
    numbers.push('*');
    numbers.push(randomNumber(1,10));
    numbers.push(numbers[0] * numbers[2]);
    return numbers;
}
//* - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
//*   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala

  if (teg===3) {
    numbers.push(randomNumber(2,10));
    numbers.push('/');
    numbers.push(numbers[0]*randomNumber(1,10));
    numbers.push(numbers[2] / numbers[0]);
    return numbers;
  }

}

//Hjálparfall til að byrja leikinn aftur ef hann klárast eða ýtt er á cancel.
function quit(){
  const answ =  confirm('Spila annan leik?');
    if(answ == true){
      play();
    }
    else {
    //exit ekki til svo ég gef villu til að hætta keyrslu 
     exit();
    }
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
