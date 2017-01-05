import { DemoAppPage } from './app.po';

describe('demo-app App', function() {
  let page: DemoAppPage;

  beforeEach(() => {
    page = new DemoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
