export class SetupApp {
    public page: any;
    
    constructor(page: any) {
        this.page = page;
    }
    
    public async setup() {
        await this.page.goto('http://www.automationpractice.pl/index.php?');
    }
}