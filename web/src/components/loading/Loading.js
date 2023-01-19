import { MagnifyingGlass } from 'react-loader-spinner';
import * as styles from './styles.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <MagnifyingGlass
        visible={true}
        height="40"
        width="40"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loading;
