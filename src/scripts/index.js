import '../styles/index.scss';
import Animation from './Animation';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

class App {
  constructor() {
    new Animation();
  }
}

new App();
