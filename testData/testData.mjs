//test data for positice test cases

export  const testData01 = ['1', '10', '100', '1000', '2000', '10000'];

export const testData02 = [{meal:'Ranajky', calories: 1500},
{meal:'Obed', calories: 5.5},
{meal:'  Vecera', calories: 200},
{meal:'olovrant123', calories: 400},
{meal:'dezert???', calories: 900},
{meal:'Ranajky@', calories: 1500},
{meal:'Obed     ', calories: '50.5'},
{meal:'Vecera   ', calories: '+200'},
{meal:'...olovrant', calories: 400},
{meal:'856', calories: 900},
{meal:'Obed', calories: 0},
];

export const testData03 = [{workout:'Beh', calories: 500},
{workout:'Gym', calories: 300},
{workout:'Futbal!!', calories: 400},
{workout:'Gym  ', calories: 400},
{workout:'  Tenis', calories: 500},
{workout:'Beh985', calories: 550},
{workout:'@Yoga', calories: 150},
{workout:'566', calories: 150},
];

export const testData04 =  ['obed', '123', '   Obed', 'Obed    ', 'bed', 'hjgdfugfkudsagkfdugku'];

export const testData05 =  ['Gym', 'gym', '       Gym', 'gym    ', '    ', '', 'ym'];

//test data for negative test cases
export const testData06 =  ['-1', '0', '', '   ', 'ab ', 'ab12', '@', '0,5'];

export const testData07 = [
{meal:'Ranajky', calories: 'hiuhu'},
{meal:' jsd', calories: 'psl'},
//{meal:'  Vecera', calories: '0'},  //bug! 
{meal:'olovrant123', calories: '       '},
{meal:'dezert???', calories: '/////////////'},
{meal:'Ranajky@', calories: 'žýááý'},
{meal:'Obed     ', calories: '55aa'},
{meal:'Vecera   ', calories: '$'},
{meal:'...olovrant', calories: '55@'},
{meal:'856', calories: -50},
{meal:'      ', calories: '-50'},
];
