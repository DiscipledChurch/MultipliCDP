import { MultipliPage } from './app.po';

describe('multipli App', function() {
  let page: MultipliPage;

  beforeEach((done) => {
    page = new MultipliPage();
    done();
  });

  it('should display message saying app works', (done) => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
    done();
  });
});
