/* @jsx m */
import m from 'mithril';
import { Test } from '../components/test';
import { Screen } from '../components/objects/screen';
import { Panel } from '../components/objects/panel';

export const Main = () => {
  let testString = 'Hello World!';
  let screenInfo = 'TEST';
  let panel1Content = 'PANEL1TEST';
  let panel2Content = 'PANEL2TEST';

  return {
    view: (vnode) => {
      return (
        <div class="container">
          {m(Test, { info: testString })}
          {m(Screen, {
            class: 'screen-parent',
            id: 'screen-parent',
            contentClass: 'screen-content',
            contentID: 'screen-content',
            content: screenInfo,
          })}
          <div class="panel-container">
            {m(Panel, {
              class: 'panel1-parent',
              id: 'panel1-parent',
              parentClass: 'panel1-content',
              parentID: 'panel1-content',
              content: panel1Content,
            })}
            {m(Panel, {
              class: 'panel2-parent',
              id: 'panel2-parent',
              parentClass: 'panel2-content',
              parentID: 'panel2-content',
              content: panel2Content,
            })}
          </div>
        </div>
      );
    },
  };
};
