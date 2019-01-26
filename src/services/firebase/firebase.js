import app from 'firebase/app';
import prodConfig from '../../envprod';
import devConfig from '../../envdev'



const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;