import Fade from '@material-ui/core/Fade';
import { getBaseURL } from '../Helpers';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import dotenv from 'dotenv';

dotenv.config();

const URL = getBaseURL();

export default function Docs() {
  return (
    <Fade in={true} timeout={600}>
      <div>
        <SwaggerUI
          url={`${URL}/docs/json`}
          filter={true}
          tryItOutEnabled={true}
        />
      </div>
    </Fade>
  );
}
