import { MultipliPage } from './app.po';

describe('Multipli App', function () {
  let page: MultipliPage;

  beforeEach((done) => {
    page = new MultipliPage();
    done();
  });

  it('should display message saying app works', (done) => {
    page.navigateTo().then(function () {
      expect(page.getParagraphText()).toEqual('app works!');
      done();
    });
  });
});
