import React from 'react';
import { AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PageLayout from './components/PageLayout';

function App() {
  return (
    <AppRoot>
      <PageLayout>
        Something here
      </PageLayout>
    </AppRoot>
  );
}

export default App;
