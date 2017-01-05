import { Ng2MaterializePage } from './app.po';

describe('ng2-materialize App', function() {
  let page: Ng2MaterializePage;

  beforeEach(() => {
    page = new Ng2MaterializePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
