import React from 'react';
import { AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PageLayout from './components/PageLayout';
import { Groups } from './modules';

function App() {
  return (
    <AppRoot>
      <PageLayout>
        <Groups />
      </PageLayout>
    </AppRoot>
  );
}

export default App;
