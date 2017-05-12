import { GPEPage } from './app.po';

describe('gpe App', () => {
  let page: GPEPage;

  beforeEach(() => {
    page = new GPEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
