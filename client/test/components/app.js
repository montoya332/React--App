import { renderComponent,expect } from '../index';
import App from 'ReactApp/components/app';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('shows Application Container div', () => {
    expect(component.find('.application__content')).to.exist;
  });

});