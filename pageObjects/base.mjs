import { Builder } from 'selenium-webdriver';
import { ServiceBuilder } from 'selenium-webdriver/edge.js';
let browser = 'chrome';                                 // add 'chrome' 'firefox' or 'MicrosoftEdge'


class Base {
constructor () {
        this.driver = null;
 };

async showPage(url) {
        if (browser === 'chrome' || browser === 'firefox') { 
        this.driver = await new Builder()
                                .forBrowser(browser)
                                .build();
        await this.driver.manage().window().maximize();
        await this.driver.get(`${url}`); 
 }
        else if (browser === 'MicrosoftEdge') {
                const edgeDriverPath = 'C://Users//lubic//Desktop//Drivers//msedgedriver.exe';
                
                this.driver = new Builder()
                                .forBrowser('MicrosoftEdge')
                                .setEdgeService(new ServiceBuilder(edgeDriverPath))
                                .build();
                await   this.driver.manage().window().maximize();
                await   this.driver.get(`${url}`); 
        }
};

async closePage() {
       await this.driver.quit()
}
};

export default Base;

