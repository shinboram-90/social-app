import React, { useContext } from 'react';
import {
  EuiEmptyPrompt,
  EuiImage,
  EuiButton,
  EuiButtonEmpty,
} from '@elastic/eui';
// import { ThemeContext } from '../../../components/with_theme';
// import pageNotFoundLight from '../assets/rainy_cloud_dark.png';
// import pageNotFoundLight from '../assets/';
// import pageNotFoundDark from '../../../images/empty-prompt/404_rainy_cloud_dark.png';

const Missing = () => {
  // const themeContext = useContext(ThemeContext);
  // const isDarkTheme = themeContext.theme.includes('dark');

  const iconImg = '../assets/rainy_cloud_dark.png';
  return (
    <EuiEmptyPrompt
      color="subdued"
      icon={<EuiImage size="fullWidth" src={iconImg} alt="" />}
      title={<h2>Page not found</h2>}
      layout="vertical"
      body={
        <p>
          Sorry, we can&apos;t find the page you&apos;re looking for. It might
          have been removed or renamed, or maybe it never existed.
        </p>
      }
      actions={[
        <EuiButton color="primary" fill>
          Go home
        </EuiButton>,
        <EuiButtonEmpty iconType="arrowLeft" flush="both">
          Go back
        </EuiButtonEmpty>,
      ]}
    />
  );
};

export default Missing;
