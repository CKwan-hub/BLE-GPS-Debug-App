/* @jsx m */
import m from 'mithril';

// Standard input component

export const Input = () => {
  return {
    view: (vnode) => {
      return (
        <div class={vnode.attrs.class}>
          <label
            class=""
            aria-label={vnode.attrs.labelContent}
            for={vnode.attrs.id}
          >
            {vnode.attrs.labelContent}
          </label>
          <input
            id={vnode.attrs.inputID}
            default={vnode.attrs.inputDefault ? vnode.attrs.inputDefault : ''}
          ></input>
        </div>
      );
    },
  };
};
