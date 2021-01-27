/* @jsx m */
import m from 'mithril';

// "Sidebar" style panel for housing buttons and other components

export const Panel = () => {
  return {
    view: (vnode) => {
      return (
        <div class={vnode.attrs.parentClass} id={vnode.attrs.parentID}>
          <div class={vnode.attrs.class} id={vnode.attrs.id}>
            {vnode.attrs.content}
          </div>
        </div>
      );
    },
  };
};
