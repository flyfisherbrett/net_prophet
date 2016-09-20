import { NetProphetPage } from './app.po';

describe('net-prophet App', function() {
  let page: NetProphetPage;

  beforeEach(() => {
    page = new NetProphetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
