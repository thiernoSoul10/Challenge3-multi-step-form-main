// Model

let currentTab = 1;
let totalPrice = 0;
let servicePrice = 0;
let planPrice = 0;
let selectedPlanName = '';
let selectedPlanPrice = '';
let diffPlans = [{
  planName: 'Arcade',
  planPriceM: 9,
  planPriceY: 90
},
{
  planName: 'Advanced',
  planPriceM: 12,
  planPriceY: 120
},
{
  planName: 'Pro',
  planPriceM: 15,
  planPriceY: 150
}];
let prices = [{
  service: 'online service',
  priceM: 1,
  priceY: 10
},
{
  service: 'Larger service',
  priceM: 2,
  priceY: 20
},
{
  service: 'Customizable profile',
  priceM: 2,
  priceY: 20
}
];

// let create a function that add a p element in an html element
function createP (pText, parent) {
  const text = document.createElement('p');
  text.innerText = pText;
  const parentValue = document.querySelector(parent);

  parentValue.appendChild(text);
}

function getValues () {
  const getName = document.getElementById('name');
  const name = getName.value;

  const getMail = document.getElementById('mail');
  const mail = getMail.value;

  const getPhone = document.getElementById('phone');
  const phone = getPhone.value;

  const info = {
    Name: name,
    Email: mail,
    PhoneNumber: phone
  };
}

// View
const onlineS = document.querySelector('#online-service');
const onlineC = document.querySelector('#inService1');

const storageS = document.querySelector('#larger-storage');
const storageC = document.querySelector('#inService2');

const customS = document.querySelector('#custom');
const customC = document.querySelector('#inService3');



style(onlineC, onlineS);
style(storageC, storageS);
style(customC, customS);

show (1);
// isCheked();
// isPlanSelected ();


// Controler

// syling the divs borders

function style (checkId, divId) {
  const id1 = checkId;
  const id2 = divId;

  id1.addEventListener('change', () => {
    if (id1.checked == true) {
      id2.style.border = '1px solid blue';
    }
    else {
      id2.style.border = '1px solid #d6d9e6';
    }
  });
}

// showing the current tab
function show (tab){

  if (currentTab <= 1)
  currentTab = 1;
  else
  currentTab = currentTab;

  let x = document.querySelector('.tab' + currentTab);
  
  const tabToDisplay = document.querySelector('.tab' + tab);

  // hidding the current tab from the screen

  x.style.display = 'none';

  // displaying the new tab and setting it as the current tab

  tabToDisplay.style.display = 'block';
  currentTab = tab;
}



// next and prev buttons

function nextPrev (n) {
  const prevBtn = document.querySelector('#prevBtn');
  const nextBtn = document.querySelector('#nextBtn');
  if (n+currentTab <= 1) {
    prevBtn.style.display = 'none';
    // show(1);
  } else if (n+currentTab <= 4) {
    nextBtn.innerHTML = 'Next';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  }
   else if (n+currentTab > 4 )
  {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  };
  if (n+currentTab == 4 ) {
    nextBtn.innerHTML = 'Confirm';
  };

  show(n+currentTab);
  if (currentTab <=4)
  styleCurrentStep('#step' +(currentTab));
  else
  styleCurrentStep('#step4');
}

// verifie if an element is selected or not and react accordingly!

function elementSelected (input, detailsN, h4CopyTo,  detailsH4 = "",  pCopyTo = "") {
  input.addEventListener('change', ()=> {
    let getH5;
    const getP = document.querySelector(detailsN + ' p').textContent;
    let btnElement = document.createElement('button');
        
    btnElement.innerText = 'change';
    
    if (detailsH4 == "") {
      getH5 = document.querySelector(detailsN + ' h4').textContent;
    } else {
      getH5 = document.querySelector(detailsH4 + ' h4').textContent;
    };

    if(input.checked) {
      document.querySelector(h4CopyTo).innerHTML = '';
      createP(getH5, h4CopyTo);
      if (pCopyTo == '') {
        createP(getP, h4CopyTo);
      }
      else {
        document.querySelector(pCopyTo).innerHTML = '';
        document.querySelector(h4CopyTo).appendChild(btnElement);
        btnElement.onclick = show(2);
        createP(getP, pCopyTo);
      }
    }
     else {
      document.querySelector(h4CopyTo).innerHTML = '';
      if (pCopyTo != ''){
        document.querySelector(pCopyTo).innerHTML = '';
      };
     };
  });
};

// styling the step in the side-bar

function styleCurrentStep (stepId) {
  for(i=1; i<=4; i++) {
    const x = document.querySelector('#step' + i);
    x.style.background = 'transparent';
    x.style.color = '#fff'
  };
  const pStep = document.querySelector(stepId);
  pStep.style.background = '#fafbff';
  pStep.style.color = '#02295a';
};


// verifie if the switch toggle is checked and react accordingly!

function switchBtnCheked () {
  const switchBtn = document.querySelector('#switch');
  
switchBtn.addEventListener('change', () => {
  for (let i = 0; i<prices.length; i++) {
   let n = i +1 ;
   let pInDet = document.querySelector('.details' + i + ' p');
   let pinService = document.querySelector('.inService' + n + ' p');

   let h5 = document.createElement('h5');

   h5.innerText = '2 months free';
   
   const parentValue = document.querySelector('.details' + i);

    pInDet.remove();
    pinService.remove();
    
    document.querySelector('#selItStyle3-1').innerHTML = '';
    document.querySelector('#selItStyle3-2').innerHTML = '';

   if (switchBtn.checked == false) {
     document.querySelector('.details' + i + ' h5').remove();

     createP('$' + diffPlans[i].planPriceM + '/mo', '.details' + i);
     createP('$' + prices[i].priceM + '/mo', '.inService' + n);

     createP ('Total (per month)', '#selItStyle3-1');
   } else {
     createP('$' + diffPlans[i].planPriceY + '/yr', '.details' + i);
     createP('$' + prices[i].priceY + '/yr', '.inService' + n);
     parentValue.appendChild(h5); 
    
     createP ('Total (per year)', '#selItStyle3-1');
   }
 };
 
});
};

switchBtnCheked ();
plan ();

// plans clicked

function plan () {
  for (let i=1; i<=3; i++) {
    let n = i - 1;
    const detail = '.details' + n;
    const inputPlan = document.querySelector('#inputPlan' +i);
    const plan = document.querySelector('#plan' +i);
    inputPlan.addEventListener('change', ()=> {
      if (inputPlan.checked == true) {
        uncheckPlan();
        inputPlan.checked = true ;
      }
      else {
        inputPlan.checked = false ;
      }
    });
    style(inputPlan, plan);
    elementSelected (inputPlan, detail, '#selItStyle1-1', '', '#selItStyle1-2');
  };
  // const k = document.querySelector('#selItStyle1-2 p').textContent;
  
  // const j = k.slice(1, k.length-3);
  noSelectedPlan ();
};

// no Plan selected 
function noSelectedPlan () {
  const nextBtn = document.querySelector('#nextBtn');
  nextBtn.addEventListener('click', ()=> {
    if (currentTab == 3) {
      const inputPlan1 = document.querySelector('#inputPlan1');
      const inputPlan2 = document.querySelector('#inputPlan2');
      const inputPlan3 = document.querySelector('#inputPlan3');
      
      if (inputPlan1.checked == false && inputPlan2.checked == false && inputPlan3.checked == false) {
      alert('Select a plan first');
      show(2);
      } else {
        nextPrev(0);
      };
    };
  });
};

function uncheckPlan () {
  for (j=1; j<=3; j++) {
    const stepsToUncheck = document.querySelector('#inputPlan' +j);
    const plan = document.querySelector('#plan' +j);
    stepsToUncheck.checked = false;
    plan.style.border = '1px solid #d6d9e6';
  };
}

// Service selected

function serviceIsSelected () {
  let l = 0;
  for (let i=1; i<=3; i++) {
    const detail = '.inService' +i;
    const serviceDet = '#serviceDet' +i;
    
    copyTo = '#selItStyle2-' +i;
    const inService = document.querySelector('#inService' +i);
    
    elementSelected (inService, detail, copyTo, serviceDet);

    // let x = document.querySelector('#selItStyle2-' + i).lastChild.textContent;
    // const j = x.slice(2, x.length-3);
    // l=l + j;
  };
  // servicePrice = l;
}

serviceIsSelected ();
function getPrice () {
  totalPrice = planPrice + servicePrice;

  createP ('$' + totalPrice, '#selItStyle3-2');
}
getPrice ();