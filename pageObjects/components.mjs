
import { By, until } from 'selenium-webdriver';
import Base from './base.mjs';
import { testData04 } from '../testData/testData.mjs';




class Limit extends Base {
     constructor (driver) {                     //to initialize driver from subclass !!!
        super();                                        // Calls the constructor of the Base class      
        this.driver = driver;                     //use meal = new Meal(base.driver)  !!!
     }

async openLimitModal () {
        await  this.driver.wait(until.elementLocated(By.xpath('/html/body/nav/div/div/ul/li[1]')), 5000);
        let navMenuItem = await  this.driver.findElement(By.xpath('/html/body/nav/div/div/ul/li[1]'));
        await  this.driver.executeScript("arguments[0].click();", navMenuItem);
}

async fillLimitInput (item) {
      //  await new Promise(resolve => setTimeout(resolve, 1000)); 
        let limitInput = await this.driver.wait(until.elementLocated(By.id('limit-input')), 5000);
        await limitInput.click();
    //   await new Promise(resolve => setTimeout(resolve, 1000)); 
        await limitInput.sendKeys(item);
        let setButton = await this.driver.wait(until.elementLocated(By.id('set-button')), 5000);
        await setButton.click(); 
}

async resetLimitInput () {
      //  await new Promise(resolve => setTimeout(resolve, 500)); 
        let reset = await this.driver.wait(until.elementLocated(By.xpath('//nav//li[2]/a')), 1000);
        await this.driver.executeScript("arguments[0].scrollIntoView()", reset);
        await this.driver.wait(until.elementIsVisible(reset), 1000);
        await this.driver.wait(until.elementIsEnabled(reset), 1000);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        await reset.click();

         // Click on okreset button 
    //    await new Promise(resolve => setTimeout(resolve, 1000)); 
        let okreset = await this.driver.wait(until.elementLocated(By.id('reset-button')), 5000);
        await this.driver.wait(until.elementIsVisible(okreset), 5000);
        await this.driver.wait(until.elementIsEnabled(okreset), 5000);
        await this.driver.wait(until.elementIsVisible(okreset), 5000);
        await new Promise(resolve => setTimeout(resolve, 500));    // Wait for 500ms  !!!!!!!!!!! it will not termite the loop
        await okreset.click();   
}
}

export default Limit;

class Meal extends Base {
    
        constructor (driver) {                                           //to initialize driver from subclass !!!
                super();                                                        //use meal = new Meal(base.driver)  !!!
                this.driver = driver;                                                   //use meal = new Meal(base.driver)  !!!
             }

async openMealModal() {

    const addMealButton = await this.driver.wait(until.elementLocated(By.id('open-meal-button')), 15000);
    await this.driver.executeScript("arguments[0].scrollIntoView();", addMealButton);
    await this.driver.wait(until.elementIsEnabled(addMealButton), 7000);
    await this.driver.wait(until.elementIsVisible(addMealButton), 7000);
    await new Promise(resolve => setTimeout(resolve, 500));                    // Wait for 1 second !!!!!!!!!!! it will not termite the loop
    await addMealButton.click();
    await new Promise(resolve => setTimeout(resolve, 500));     
}

async addMealToInput (item) {
        const mealInput = await this.driver.wait(until.elementLocated(By.id('meal-name')), 5000);
        await this.driver.wait(until.elementIsEnabled(mealInput), 5000);
        await this.driver.wait(until.elementIsVisible(mealInput), 5000);
        await mealInput.click();
        await mealInput.sendKeys(`${item}`);
}

async addCaloriesToInput (item) {
        let calorieInput = await this.driver.wait(until.elementLocated(By.id('calorie-number')), 5000);
        await this.driver.wait(until.elementIsEnabled(calorieInput), 5000);
        await this.driver.wait(until.elementIsVisible(calorieInput), 5000);
        await calorieInput.click();
        await calorieInput.sendKeys(item);
} 

async clickOnAddButton () {
        const openButton = await this.driver.wait(until.elementLocated(By.id('add-meal-button')), 5000);
        await this.driver.wait(until.elementIsVisible(openButton), 8000);
        await this.driver.wait(until.elementIsEnabled(openButton), 8000);
        await openButton.click();  
}


async removeAllMealCards () {

        const wrapper = await this.driver.findElement(By.id('meal-wrapper'));
        const mealCards = await wrapper.findElements(By.css('div.box.border'));
        let removed = false;
    for (let i =0; i < mealCards.length; i++) { 
          if (mealCards.length > 0) { 
            let mealCloseButtonLocation = By.id(`item-close-button`);
            const removeMealButton = await this.driver.wait(until.elementLocated(mealCloseButtonLocation), 5000);
            await this.driver.executeScript("arguments[0].scrollIntoView();", removeMealButton);
             await this.driver.wait(until.elementIsEnabled(removeMealButton), 5000);
             await this.driver.wait(until.elementIsVisible(removeMealButton), 5000);
             await new Promise(resolve => setTimeout(resolve, 1000));  
             await removeMealButton.click();
             removed = true;
        }}
        return removed;
}

async filterMeals (item) {
        let filterInput = await this.driver.wait(until.elementLocated(By.id('filter-input')), 5000);
        await this.driver.executeScript("arguments[0].scrollIntoView();", filterInput);
        await this.driver.wait(until.elementIsVisible(filterInput), 2000);
        await this.driver.wait(until.elementIsEnabled(filterInput), 2000);
        await new Promise(resolve => setTimeout(resolve, 100));
        await filterInput.click();
        await filterInput.sendKeys(item);
        await new Promise(resolve => setTimeout(resolve, 100));
        
}

async findFilteredCards (total, itemInput) {
           //return filtered items
         //  await new Promise(resolve => setTimeout(resolve, 500));
           let wrapper = await this.driver.wait(until.elementLocated(By.id('meal-wrapper')), 2000);
           await this.driver.wait(until.elementIsVisible(wrapper),2000);
           await this.driver.wait(until.elementIsEnabled(wrapper),2000);
           await new Promise(resolve => setTimeout(resolve, 500));
           const allFiltredCards = await wrapper.findElements(By.css('div.box.border'));
           const filteredCardsWithBlockStyle =  [];

                for (let card of allFiltredCards) {
                        const style = await card.getAttribute('style');
                        if (style && style.includes('display: block;')) {
                         const pElement = await card.findElement(By.css('p')).getText();
                    let pElementChange = pElement.trim().toLowerCase();
                          filteredCardsWithBlockStyle.push(pElementChange);
                        }  }

      
          let filterInput = await itemInput
          filterInput = await filterInput.trim().toLowerCase();               
           let check = false;
           
        if ( filteredCardsWithBlockStyle.length !==0  && total.length !== 0) {

                for (let i = 0; i < filteredCardsWithBlockStyle.length; i++) {
                        let card = await filteredCardsWithBlockStyle[i];
                        
                if (card.trim().toLowerCase().includes(filterInput)) {
                        check = true;
                        return check
                }
         }}  

       else if ( filteredCardsWithBlockStyle.length === 0 && total.length !== 0 ) {
                check = true;
                return check
        }
        else if (total.length === 0) {
                check = 'No added meal cards';
          }
          return check
        }
        
      async resetFilterInput () {
       // let filterReset = await this.driver.wait(until.elementLocated(By.id('filter-input')),2000);
        const filterReset = await this.driver.findElement(By.id('filter-input'));
        await this.driver.executeScript("arguments[0].scrollIntoView();", filterReset);
        await this.driver.wait(until.elementIsVisible(filterReset), 2000);
        await this.driver.wait(until.elementIsEnabled(filterReset), 2000);
        await filterReset.clear();
      }  
        }

     
class Workout extends Base {
        constructor(driver) {
                super();
                this.driver = driver;
        }
async openWorkoutModal () {
        
        await new Promise(resolve => setTimeout(resolve, 500));  
        const addWorkoutButton = await this.driver.wait(until.elementLocated(By.id('workout-name')), 15000);
        await this.driver.executeScript("arguments[0].scrollIntoView();", addWorkoutButton);
        await this.driver.wait(until.elementIsEnabled(addWorkoutButton), 7000);
        await this.driver.wait(until.elementIsVisible(addWorkoutButton), 7000);
        await new Promise(resolve => setTimeout(resolve, 500));                    // Wait for 1 second !!!!!!!!!!! it will not termite the loop
        await addWorkoutButton.click(addWorkoutButton);
}

async addWorkoutToInput (item) {
        const workoutInput = await this.driver.wait(until.elementLocated(By.id('workout-input')), 5000);
        await this.driver.wait(until.elementIsEnabled(workoutInput), 5000);
        await this.driver.wait(until.elementIsVisible(workoutInput), 5000);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        await workoutInput.click();
        await workoutInput.sendKeys(item);
}

async addCaloriesToInput (item) {
        const calsInput = await this.driver.wait(until.elementLocated(By.id('burned-cals-input')), 5000);
        await this.driver.wait(until.elementIsVisible(calsInput), 5000);
        await this.driver.wait(until.elementIsEnabled(calsInput), 5000);
        await new Promise(resolve => setTimeout(resolve, 500)); 
        await calsInput.click();
        await calsInput.sendKeys(item);
}

async clickOnAddButton () {
        const addButton = await this.driver.wait(until.elementLocated(By.id('add-workout-button')), 3000);
        await this.driver.wait(until.elementIsVisible(addButton), 8000);
        await this.driver.wait(until.elementIsEnabled(addButton), 8000);
        await addButton.click();
}

async removeAllWorkoutCard () {
        const wrapper = await this.driver.findElement(By.id('workout-wrapper'));
        const workoutCards = await wrapper.findElements(By.css('div.box.border'));
        let removed = false;
  
        for (let i =0; i < workoutCards.length; i++) { 
        if (workoutCards.length > 0) { 
        let workoutCloseButtonLocation = By.id(`item-close-button`);
        const removeWorkoutButton =  await this.driver.wait(until.elementLocated(workoutCloseButtonLocation), 5000);
        await this.driver.executeScript("arguments[0].scrollIntoView();", removeWorkoutButton);
        await this.driver.wait(until.elementIsEnabled(removeWorkoutButton),5000);
        await this.driver.wait(until.elementIsVisible(removeWorkoutButton), 5000);
        await this.driver.wait(until.elementIsEnabled(removeWorkoutButton), 5000);
        await new Promise(resolve => setTimeout(resolve, 1000));  
        await removeWorkoutButton.click();
        removed = true;
      }
    }
        return removed;

}


async filterWorkouts (item) {
        let filterInput = await this.driver.wait(until.elementLocated(By.id('filter-workout-input')), 5000);
        await this.driver.executeScript("arguments[0].scrollIntoView();", filterInput);
        await this.driver.wait(until.elementIsVisible(filterInput), 2000);
        await this.driver.wait(until.elementIsEnabled(filterInput), 2000);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await filterInput.click();
        await filterInput.sendKeys(item);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
}

async findFilteredCardsWorkouts (total, itemInput) {
           //return filtered items
           await new Promise(resolve => setTimeout(resolve, 500));
           let wrapper = await this.driver.wait(until.elementLocated(By.id('workout-wrapper')), 2000);
           await this.driver.wait(until.elementIsVisible(wrapper),2000);
           await this.driver.wait(until.elementIsEnabled(wrapper),2000);
           await new Promise(resolve => setTimeout(resolve, 1000));
           const allFiltredCards = await wrapper.findElements(By.css('div.box.border'));
           const filteredCardsWithBlockStyle =  [];

                for (let card of allFiltredCards) {
                        const style = await card.getAttribute('style');
                        if (style && style.includes('display: block;')) {
                         const pElement = await card.findElement(By.css('p')).getText();
                    let pElementChange = pElement.trim().toLowerCase();
                          filteredCardsWithBlockStyle.push(pElementChange);
                        }  }

      
          let filterInput = await itemInput
          filterInput = await filterInput.trim().toLowerCase();               
           let check = false;
           
        if ( filteredCardsWithBlockStyle.length !==0  && total.length !== 0) {

                for (let i = 0; i < filteredCardsWithBlockStyle.length; i++) {
                        let card = await filteredCardsWithBlockStyle[i];
                        
                if (card.trim().toLowerCase().includes(filterInput)) {
                        check = true;
                        return check; }
         }}  

        else if ( filteredCardsWithBlockStyle.length === 0 && total.length !== 0 ) {
                check = true;
                return check;  }
        else if (total.length === 0) {
                check = 'No added workout cards'; }
        return check
        }
        
      async resetFilterInputWorkout () {
       // let filterReset = await this.driver.wait(until.elementLocated(By.id('filter-input')),2000);
        const filterReset = await this.driver.findElement(By.id('filter-workout-input'));
        await this.driver.executeScript("arguments[0].scrollIntoView();", filterReset);
        await this.driver.wait(until.elementIsVisible(filterReset), 2000);
        await this.driver.wait(until.elementIsEnabled(filterReset), 2000);
        await filterReset.clear();
      }  
        


}

export  {Limit, Meal, Workout};



