import { By, until } from 'selenium-webdriver';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import Base from '../pageObjects/base.mjs';
import { testData01, testData02, testData03, testData04, testData05, testData06, testData07 } from '../testData/testData.mjs';
import {Limit, Meal, Workout} from '../pageObjects/components.mjs';



describe('End to End Test for TrackAppApp, Positive testcases',  async function () {

  //initialization of driver and base instance 
  const base =  new Base();
  

    before(async function() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await base.showPage('https://trackmycals.netlify.app');
    }) 

    after(async function() {
        await base.closePage();
    })


it('Test for Calorie Valid Limit Input', async function () {
   const limit = new Limit(base.driver);
    //Open input modal
    for (const item of testData01) {
        await limit.openLimitModal();

    // Fill limit input and click set button
        await limit.fillLimitInput(item)

    // Assertion - Calorie Limit Input assertion after each loop
        let limitCheck = await limit.driver.findElement(By.id('calorie-limit-show'));
        let limitText = await limitCheck.getText();
        expect(limitText).to.equal(item);

     // Reset limit input
        await limit.resetLimitInput();
        }
    });
    

    it('Test for add the meal in valid format', async function () {
        const meal = new Meal(base.driver);

    for (let item = 0; item < testData02.length; item++) {

            //Open meal modal
            await meal.openMealModal();
        
            //Add meal to input window
            await meal.addMealToInput(testData02[item].meal);
       
            //Add calories to input window
            await meal.addCaloriesToInput(testData02[item].calories);
              
            //Click on add button to add meal card to the DOM
            await meal.clickOnAddButton ();
    }  
     
             // Assertion - Added meal
            const wrapper = await base.driver.findElement(By.id('meal-wrapper'));
            const mealCards = await wrapper.findElements(By.css('div.box.border'));
            const mealCaloriesDomArr = [];


    for (let i = 0; i < testData02.length; i++) {
            const mealCard = mealCards[i];

            let mealCalsLocator = By.xpath(`/html/body/div[2]/div/div[1]/div[2]/div[${1+i}]/div`);

            await base.driver.wait(until.elementLocated(mealCalsLocator), 2000);
            let mealCalsElement = await mealCard.findElement(mealCalsLocator);
            let mealCals = await mealCalsElement.getText();
            mealCaloriesDomArr.push(parseInt(mealCals));
            expect(mealCals).to.equal(`${Math.round(testData02[i].calories)}`);


            let mealNameLocator = By.xpath(`/html/body/div[2]/div/div[1]/div[2]/div[${1+i}]/p`);
            await base.driver.wait(until.elementLocated(mealNameLocator), 2000);
            let mealNameElement = await mealCard.findElement(mealNameLocator);
            let mealName = await mealNameElement.getText();
            expect(mealName).to.equal(testData02[i].meal.trim());
    }


            //Assertion - Verify the change in consumed calories count
            let consumedCount = await base.driver.findElement(By.id('consumed-cals')).getText();
           const totalCalCount =  mealCaloriesDomArr.reduce((acc, cur) => { return acc+ cur }, 0);
            expect(totalCalCount).to.equal(parseInt(consumedCount));

           //Assertion - Verify the change in remaining calories count
            let remainingCount = await base.driver.findElement(By.id('rem')).getText();
            let inputLimit = await base.driver.findElement(By.id('limit')).getText();
            expect(Number(inputLimit)- totalCalCount).to.equal(Number(remainingCount));

            //Assertion - Verify the change in gain/loss calories count
            let totalCount = await base.driver.findElement(By.id('gain-loss')).getText();
            expect(totalCalCount - Number(inputLimit)).to.equal(Number(totalCount));

            //Assertion for progress bar
           // let progressDiv = await base.driver.wait(until.elementLocated(By.id('progress-bar')));
            let progressBar = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('style');
           let progressBarClass = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('class');
            if(inputLimit >= consumedCount) {
            //    let progressBarClass = await progressDiv.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('class');
                let total =  (consumedCount/inputLimit)*100;
                expect(progressBar).to.include(`width: ${total}%`);
                expect(progressBarClass).to.contain('bg-success');

            } else if (inputLimit < consumedCount) { 
          //  let progressBarClass = await progressDiv.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('class');
                expect(progressBar).to.include('width: 100%');
                expect(progressBarClass).to.contain('bg-danger');
             }
          
    });
    

        
    it('Test removing the meal', async function () {
        const meal = new Meal(base.driver);

        // to remove all mealCards
        const removed = await meal.removeAllMealCards();

        // Assertion -  for deleting meal cards from the DOM 
        expect(removed).to.be.true;
    
        // Assertion - Meal cards were removed from the wrapper in the DOM
        const wrapper = await meal.driver.wait(until.elementLocated(By.id('meal-wrapper')), 5000);
        const childElements = await wrapper.findElements(By.css('*')); // Find all child elements
        expect(childElements.length).equal(0);

        // Assertion for progress bar
        let progressBar = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('style');
        expect(progressBar).to.include('width: 0%');
     })

    it('Test for add valid the workout input', async function () {
        const workout = new Workout(base.driver);

for (let item = 0; item < testData03.length; item++) {
           
            //open workout modal
            workout.openWorkoutModal();

            //add workout into workout input window
            await workout.addWorkoutToInput(testData03[item].workout);

            //add calories into input window
            await workout.addCaloriesToInput (testData03[item].calories);

            //click add button for adding the workout card to the DOM
            await workout.clickOnAddButton ();
}  

            // Assertion - Added workout
            const wrapper = await base.driver.findElement(By.id('workout-wrapper'));
            const workoutCards = await wrapper.findElements(By.css('div.box.border'));
            const workoutCaloriesDomArr = [];

            for (let i = 0; i < testData03.length; i++) {
            const workoutCard = workoutCards[i];
            let workoutCalsLocator = By.xpath(`/html/body/div[2]/div/div[2]/div[2]/div[${1+i}]/div`);
            await base.driver.wait(until.elementLocated(workoutCalsLocator), 2000);
            let workoutCalsElement = await workoutCard.findElement(workoutCalsLocator);
            let workoutCals = await workoutCalsElement.getText();
            workoutCaloriesDomArr.push(parseInt(workoutCals));
            expect(workoutCals).to.equal(`${testData03[i].calories}`);

            let workoutNameLocator = By.xpath(`/html/body/div[2]/div/div[2]/div[2]/div[${1+i}]/p`);
            await base.driver.wait(until.elementLocated(workoutNameLocator), 2000);
            let workoutNameElement = await workoutCard.findElement(workoutNameLocator);
            let workoutName = await workoutNameElement.getText();
            expect(workoutName).to.equal(testData03[i].workout.trim());
}
            //Assertion - Verify the change in consumed calories count
            let burnedCount = await base.driver.findElement(By.id('burned-cals')).getText();
            const totalCalCount =  workoutCaloriesDomArr.reduce((acc, cur) => { return acc+ cur }, 0);
            expect(totalCalCount).to.equal(parseInt(burnedCount));

            //Assertion - Verify the change in remaining calories count
            let remainingCount = await base.driver.findElement(By.id('rem')).getText();
            let inputLimit = await base.driver.findElement(By.id('limit')).getText();
            expect(Number(inputLimit)+ totalCalCount).to.equal(Number(remainingCount));

            //Assertion - Verify the change in gain/loss calories count
            let totalCount = await base.driver.findElement(By.id('gain-loss')).getText();
            expect(totalCalCount + Number(inputLimit)).to.equal(Number(-totalCount));

            //Assertion for progress bar
           // let progressDiv = await base.driver.wait(until.elementLocated(By.id('progress-bar')));
           let progressBar = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('style');
           let progressBarClass = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('class');
           
            //    let progressBarClass = await progressDiv.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('class');
              //  let total =  (consumedCount/inputLimit)*100;
                expect(progressBar).to.include('width: 0%');
                expect(progressBarClass).to.contain('bg-success');

});
 
   it('Test removing the workout', async function () {
            const workout = new Workout(base.driver);
            //remove all workout cards from DOM
            let removed = await workout.removeAllWorkoutCard ();

            //Assertion function for deleting workouts runs
            expect(removed).to.be.true;

            // Assertion - Workout cards were removed from wrapper in the DOM
            const wrapper = await workout.driver.wait(until.elementLocated(By.id('workout-wrapper')),5000);    
           const childElements = await wrapper.findElements(By.css('*')); // Find all child elements
            expect(childElements.length).equal(0);

            //Assertion for progress bar
            let progressBar = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('style');
            expect(progressBar).to.include('width: 0%');
     })

     it('Test filter functionality for meals', async function  () {
        const meal = new Meal(base.driver);
        //Add meals to the DOM
       for (let item = 0; item < testData02.length; item++) {

            //Open meal modal
           await meal.openMealModal();
        
            //Add meal to input window
            await meal.addMealToInput(testData02[item].meal);
       
            //Add calories to input window
            await meal.addCaloriesToInput(testData02[item].calories);
              
            //Click on add button to add meal card to the DOM
           await meal.clickOnAddButton ();
    }  

    let wrapper = await base.driver.wait(until.elementLocated(By.id('meal-wrapper')));
    const allFiltredCards = await wrapper.findElements(By.css('div.box.border'));
    const allPElements = [];

    for (let card of allFiltredCards) {
        let pElement = await card.findElement(By.css('p'));
        let pElementText = await pElement.getText();
        let lowercaseTrimmedText =  pElementText.toLowerCase().trim();   
        allPElements.push(lowercaseTrimmedText);
    }


   await new Promise(resolve => setTimeout(resolve, 500)); 


        for (let item = 0; item < testData04.length; item++) {

            await meal.filterMeals (testData04[item]);

           let check = await meal.findFilteredCards(allPElements, testData04[item] );   
                
            //Assertion - only filtered cards are in meal wrapper
            if (typeof check === 'boolean')
           {  expect(check).to.be.true;  }
           else {console.log(`Assertion error: ${check}`)}
    

         // reset filter input
         await meal.resetFilterInput();
        }
     });

     it('Test filter functionality for workouts', async function () {
        const workout = new Workout(base.driver);
        //Add meals to the DOM
       for (let item = 0; item < testData05.length; item++) {

            //Open meal modal
           await workout.openWorkoutModal();
        
            //Add meal to input window
            await workout.addWorkoutToInput(testData03[item].workout);
       
            //Add calories to input window
            await workout.addCaloriesToInput(testData03[item].calories);
              
            //Click on add button to add meal card to the DOM
           await workout.clickOnAddButton();
    }  

    let wrapper = await base.driver.wait(until.elementLocated(By.id('workout-wrapper')));
    const allFiltredCards = await wrapper.findElements(By.css('div.box.border'));
    const allPElements = [];

    for (let card of allFiltredCards) {
        let pElement = await card.findElement(By.css('p'));
        let pElementText = await pElement.getText();
        let lowercaseTrimmedText = pElementText.toLowerCase().trim();   
        allPElements.push(lowercaseTrimmedText);
    }


   //await new Promise(resolve => setTimeout(resolve, 500)); 


        for (let item = 0; item < testData04.length; item++) {

            await workout.filterWorkouts (testData05[item]);

           let check = await workout.findFilteredCardsWorkouts(allPElements, testData05[item] );   
                
            //Assertion - only filtered cards are in meal wrapper
            if (typeof check === 'boolean')
           {  expect(check).to.be.true;  }
           else {console.log(`Assertion error: ${check}`)}

         // reset filter input
         await workout.resetFilterInputWorkout ();
        }
     
   
     })

     it('Reset all data in app', async () => {
        const limit = new Limit(base.driver);
        await limit.resetLimitInput();

        // Assertion - Workout cards were removed from wrapper in the DOM
        const mealWrapper = await base.driver.wait(until.elementLocated(By.id('workout-wrapper')),5000);    
        const mealChildElements = await mealWrapper.findElements(By.css('*')); // Find all child elements
        expect(mealChildElements.length).equal(0);

        // Assertion - Meal cards were removed from the wrapper in the DOM
        const workoutWrapper = await base.driver.wait(until.elementLocated(By.id('meal-wrapper')), 5000);
        const workoutChildElements = await workoutWrapper.findElements(By.css('*')); // Find all child elements
        expect(workoutChildElements.length).equal(0);

        // Assertion - Reset of limit, burned calories, consumed calories, gain/loss, remaining calories, progress bar
        let limitBlock = await base.driver.wait(until.elementLocated(By.id('calorie-limit-show'))).getText();
        expect(limitBlock).equal('2000');

        let burnedCaloriesBlock = await base.driver.wait(until.elementLocated(By.id('burned-cals'))).getText();
        expect(burnedCaloriesBlock).equal('0');

        let consumedCaloriesBlock = await base.driver.wait(until.elementLocated(By.id('consumed-cals'))).getText();
        expect(consumedCaloriesBlock).equal('0');

        let gainLossBlock = await base.driver.wait(until.elementLocated(By.id('gain-loss'))).getText();
        expect(gainLossBlock).equal('-2000');

        let remainingCaloriesBlock = await base.driver.wait(until.elementLocated(By.id('rem'))).getText();
        expect(remainingCaloriesBlock).equal('2000');
     })
        let progressDiv = await base.driver.wait(until.elementLocated(By.id('progress-bar')));
        let progressBar = await progressDiv.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('style');
        expect(progressBar).to.include('width: 0%');
            
});



describe('Negative test cases for TrackMyCals app', async function () {

    //initialization of driver and base instance 
  const base =  new Base();
  

  before(async function() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await base.showPage('https://trackmycals.netlify.app');
  }) 

  after(async function() {
      await base.closePage();
  })

  
it('Test for Calorie Invalid Limit Input', async function () {
    const limit = new Limit(base.driver);
     //Open input modal
     for (const item of testData06) {
         await limit.openLimitModal();
 
     // Fill limit input and click set button
         await limit.fillLimitInput(item);

    //Accept the alert 
        let alertPresent = false;
        let alertMessage = null;
    try  {
        alertPresent = true;
        let alert = await base.driver.switchTo().alert();
        alertPresent = true;
        alertMessage = await alert.getText(); // Get the text from the alert
        await alert.accept(); // Accept the alert
          }
    catch(error) {
        console.log(`Assertion error: No alert window!`)
        }

    
    //Assertion - Alert message assertion after each loop

      try { if (item === '' && alertMessage !== null) {
            expect(alertMessage).to.equal('Add number of calories!')
        }
        else if (isNaN(item) && alertMessage !== null)  {
            expect(alertMessage).to.equal('Input must be a number!')
        } else if (parseInt(item) <= 0 && alertMessage !== null) {
            expect(alertMessage).to.equal('Input must be a positive number!')
        }  }
        catch(error) { 
            if(alertMessage === null)
            {console.log(`Assertion error: valid limit input!`)}
            else{ 
            console.log(`${error}`)  }
        }

     // Assertion - Calorie Limit Input assertion after each loop
 
         let limitCheck = await limit.driver.wait(until.elementLocated(By.id('calorie-limit-show')), 5000);
         let limitText = await limitCheck.getText();
        expect(parseInt(limitText)).to.equal(2000);
 
      // Reset limit input
         await limit.resetLimitInput();
         }
        });
         
    it('Test for add the meal in invalid format', async function () {
                 const meal = new Meal(base.driver);
         
             for (let item = 0; item < testData07.length; item++) {
         
                     //Open meal modal
                     await meal.openMealModal();
                 
                     //Add meal to input window
                     await meal.addMealToInput(testData07[item].meal);
                
                     //Add calories to input window
                     await meal.addCaloriesToInput(testData07[item].calories);
                       
                     //Click on add button to add meal card to the DOM
                     await meal.clickOnAddButton();

                     //wait for alert
                     await new Promise(resolve => setTimeout(resolve, 1000)); 

                           //Accept the alert 
                          
                           let alertMessage = null;
                           
                           try {
                               let alert = await base.driver.switchTo().alert();
                               alertMessage = await alert.getText();
                           
                               if (alert && alertMessage !== null) {
                                   // Get the text from the confirmation alert
                                   await new Promise(resolve => setTimeout(resolve, 1000)); 
                                   alertMessage = await alert.getText();
                                   await alert.accept();
                                   console.log('It is a confirmation alert');
                               }
                           } catch (error) {
                               console.log(`No alert window or no confirmation alert: ${error}`);
                           }
                           
                           // If there's no alert, try interacting with other elements
                           if (!alertMessage) {
                               try {
                                   //  interact with the element if there is just prompt alert
                                   
                                   let outOfScopeMeal = await base.driver.findElement(By.id('meal-name'));
                                   let outOfScopeCals = await base.driver.findElement(By.id('calorie-number'));
                                
                                await new Promise(resolve => setTimeout(resolve, 1000));    
                                await outOfScopeMeal.click();
                                await meal.addCaloriesToInput('input');
                                await outOfScopeCals.click();
                                await meal.addMealToInput('meal');
                                   await meal.clickOnAddButton ();
                                   let alert = await base.driver.switchTo().alert();
                                   await alert.accept();
                           
                                   // continue with other steps after interacting with the element
                               } catch (error) {
                                   console.log(`Failed to interact with element: ${error} `);
                               }
                           }
                           
          
                  //Assertion - Alert message assertion after each loop
      
             try { 
                    if (testData07[item].calories === '' && testData07[item].meal !== '' && alertMessage !== null) {
                          expect(alertMessage).to.equal('Please fill in this field!')
                          }
                    else if (!isNaN(parseInt(item)) < 0 && testData07[item].meal !== '' &&  alertMessage !== null) {
                            expect(alertMessage).to.equal('Input must be a positive number!')
                      } 
                    else if (isNaN(item) && testData07[item].meal !== '' && alertMessage !== null)  {
                          expect(alertMessage).to.equal('Calorie input should be a number')
                    } 
                    }
              catch(error) {  
                           console.log(`No alert: ${error}`)  
                        }
             }  
              
    
                    // Assertion - Added meal
                     const wrapper = await base.driver.findElement(By.id('meal-wrapper'));
                     const mealCards = await wrapper.findElements(By.css('div.box.border'));
                    expect(mealCards.length).to.equal(0);
         
                     //Assertion - Verify the change in consumed calories count
                     const mealCaloriesDomArr = [];
                     let consumedCount = await base.driver.findElement(By.id('consumed-cals')).getText();
                    const totalCalCount =  mealCaloriesDomArr.reduce((acc, cur) => { return acc+ cur }, 0);
                     expect(totalCalCount).to.equal(parseInt(consumedCount));
         
                    //Assertion - Verify the change in remaining calories count
                     let remainingCount = await base.driver.findElement(By.id('rem')).getText();
                     let inputLimit = await base.driver.findElement(By.id('limit')).getText();
                     expect(Number(inputLimit)- totalCalCount).to.equal(Number(remainingCount));
         
                     //Assertion - Verify the change in gain/loss calories count
                     let totalCount = await base.driver.findElement(By.id('gain-loss')).getText();
                     expect(totalCalCount - Number(inputLimit)).to.equal(Number(totalCount));
         
                     //Assertion for progress bar
                     let progressBar = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('style');
                     let progressBarClass = await base.driver.wait(until.elementLocated(By.css('div.progress-bar'))).getAttribute('class')
                     expect(progressBar).to.include(`width: 0%`);
                     expect(progressBarClass).to.contain('bg-success');
             });
})



 

