/* @jsx m */
import m from 'mithril';

// Dynamic information area

export const Info = () => {
  return {
    view: (vnode) => {
      return (
        <div class={vnode.attrs.infoParentClass}>
          <div class={vnode.attrs.infoContentClass}>
            {vnode.attrs.infoContent}
          </div>
        </div>
      );
    },
  };
};
