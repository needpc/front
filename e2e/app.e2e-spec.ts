import { GPEPage } from './app.po';

describe('gpe App', () => {
  let page: GPEPage;

  beforeEach(() => {
    page = new GPEPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
